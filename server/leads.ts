import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import type { Request, Response } from 'express';

type Lead = {
  submissionId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  pageUrl: string;
  submittedAt: string;
  utm: Record<string, string>;
};

type SubmissionState = {
  lead: Lead;
  sheetWritten: boolean;
  telegramSent: boolean;
  updatedAt: number;
};

type RateWindow = {
  count: number;
  resetAt: number;
};

const submissions = new Map<string, SubmissionState>();
const rateWindows = new Map<string, RateWindow>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const STATE_TTL_MS = 24 * 60 * 60 * 1000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
    : '';
}

function normalizePhone(value: unknown) {
  const raw = cleanText(value, 40);
  const digits = raw.replace(/\D/g, '');
  return `${raw.startsWith('+') ? '+' : ''}${digits}`.slice(0, 20);
}

function safeSheetValue(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] || character);
}

function encodeBase64Url(value: string | Buffer) {
  return Buffer.from(value).toString('base64url');
}

async function fetchJson(url: string, init: RequestInit, timeoutMs = 10_000) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const payload = await response.json().catch(() => null) as Record<string, unknown> | null;

  if (!response.ok) {
    const details = typeof payload?.error === 'object'
      ? JSON.stringify(payload.error)
      : typeof payload?.description === 'string'
        ? payload.description
        : `HTTP ${response.status}`;
    throw new Error(details);
  }

  return payload;
}

function getRequiredEnvironment() {
  let fileCredentials: { client_email?: string; private_key?: string } = {};
  const credentialsFile = process.env.GOOGLE_SERVICE_ACCOUNT_FILE?.trim();
  if (credentialsFile) {
    try {
      fileCredentials = JSON.parse(readFileSync(credentialsFile, 'utf8')) as typeof fileCredentials;
    } catch {
      throw new Error('Cannot read GOOGLE_SERVICE_ACCOUNT_FILE');
    }
  }

  const values = {
    sheetId: process.env.GOOGLE_SHEET_ID?.trim(),
    sheetName: process.env.GOOGLE_SHEET_NAME?.trim() || 'Заявки',
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || fileCredentials.client_email?.trim(),
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || fileCredentials.private_key,
    telegramToken: process.env.TELEGRAM_BOT_TOKEN?.trim(),
    telegramChatId: process.env.TELEGRAM_CHAT_ID?.trim(),
  };

  if (!values.sheetId || !values.serviceAccountEmail || !values.privateKey
    || !values.telegramToken || !values.telegramChatId) {
    throw new Error('Lead integrations are not configured');
  }

  return values as { [Key in keyof typeof values]: string };
}

async function getGoogleAccessToken(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = encodeBase64Url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsignedToken = `${header}.${claim}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const assertion = `${unsignedToken}.${encodeBase64Url(signer.sign(privateKey))}`;

  const payload = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (typeof payload?.access_token !== 'string') {
    throw new Error('Google OAuth did not return an access token');
  }
  return payload.access_token;
}

async function appendLeadToSheet(lead: Lead, config: ReturnType<typeof getRequiredEnvironment>) {
  const accessToken = await getGoogleAccessToken(config.serviceAccountEmail, config.privateKey);
  const escapedSheetName = config.sheetName.replace(/'/g, "''");
  const idRange = encodeURIComponent(`'${escapedSheetName}'!L:L`);
  const existingRows = await fetchJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.sheetId)}/values/${idRange}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const existingValues = Array.isArray(existingRows?.values) ? existingRows.values : [];
  const alreadyWritten = existingValues.some((row) =>
    Array.isArray(row) && row.some((value) => value === lead.submissionId));
  if (alreadyWritten) return;

  const range = encodeURIComponent(`'${escapedSheetName}'!A:L`);
  const utm = UTM_KEYS.map((key) => lead.utm[key] || '');
  const values = [
    lead.submittedAt,
    lead.name,
    lead.phone,
    lead.email,
    lead.message,
    lead.pageUrl,
    ...utm,
    lead.submissionId,
  ].map((value) => safeSheetValue(value));

  await fetchJson(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.sheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [values] }),
    },
  );
}

async function sendTelegramLead(lead: Lead, config: ReturnType<typeof getRequiredEnvironment>) {
  const utmLines = UTM_KEYS
    .filter((key) => lead.utm[key])
    .map((key) => `<b>${escapeHtml(key)}:</b> ${escapeHtml(lead.utm[key])}`);
  const optionalLines = [
    lead.email ? `<b>Email:</b> ${escapeHtml(lead.email)}` : '',
    lead.message ? `<b>Сообщение:</b> ${escapeHtml(lead.message)}` : '',
  ].filter(Boolean);
  const text = [
    '📩 <b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    ...optionalLines,
    `<b>Дата:</b> ${escapeHtml(lead.submittedAt)}`,
    `<b>Страница:</b> ${escapeHtml(lead.pageUrl)}`,
    ...(utmLines.length ? ['', '<b>UTM-метки:</b>', ...utmLines] : []),
  ].join('\n');

  const payload = await fetchJson(
    `https://api.telegram.org/bot${config.telegramToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.telegramChatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  );

  if (payload?.ok !== true) throw new Error('Telegram did not confirm the message');
}

function validateLead(body: unknown): { lead?: Lead; message?: string; isBot?: boolean } {
  if (!body || typeof body !== 'object') return { message: 'Переданы некорректные данные.' };
  const input = body as Record<string, unknown>;
  if (cleanText(input.website, 200)) return { isBot: true };

  const submissionId = cleanText(input.submissionId, 80);
  const name = cleanText(input.name, 100);
  const phone = normalizePhone(input.phone);
  const email = cleanText(input.email, 254).toLowerCase();
  const message = cleanText(input.message, 2000);
  const rawPageUrl = cleanText(input.pageUrl, 2048);

  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(submissionId)) return { message: 'Некорректный идентификатор заявки.' };
  if (name.length < 2) return { message: 'Имя должно содержать не менее 2 символов.' };
  if (!/^\+?\d{9,15}$/.test(phone)) return { message: 'Укажите корректный номер телефона.' };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: 'Укажите корректный email.' };

  let pageUrl = '';
  try {
    const parsed = new URL(rawPageUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
    pageUrl = parsed.toString().slice(0, 2048);
  } catch {
    return { message: 'Некорректный URL страницы.' };
  }

  const rawUtm = input.utm && typeof input.utm === 'object' ? input.utm as Record<string, unknown> : {};
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, cleanText(rawUtm[key], 200)]));

  return {
    lead: {
      submissionId,
      name,
      phone,
      email,
      message,
      pageUrl,
      utm,
      submittedAt: new Date().toISOString(),
    },
  };
}

function cleanExpiredState() {
  const now = Date.now();
  for (const [key, state] of submissions) {
    if (now - state.updatedAt > STATE_TTL_MS) submissions.delete(key);
  }
  for (const [key, window] of rateWindows) {
    if (window.resetAt <= now) rateWindows.delete(key);
  }
}

export async function createLead(request: Request, response: Response) {
  cleanExpiredState();
  const validation = validateLead(request.body);

  // A honeypot hit gets a generic success so bots cannot tune around it.
  if (validation.isBot) {
    response.status(200).json({ ok: true });
    return;
  }
  if (!validation.lead) {
    response.status(400).json({ message: validation.message });
    return;
  }

  const lead = validation.lead;
  let state = submissions.get(lead.submissionId);
  if (state && (state.lead.name !== lead.name || state.lead.phone !== lead.phone)) {
    response.status(409).json({ message: 'Идентификатор заявки уже использован.' });
    return;
  }
  if (state?.sheetWritten && state.telegramSent) {
    response.status(200).json({ ok: true });
    return;
  }

  const clientKey = request.ip || request.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const rateWindow = rateWindows.get(clientKey);
  if (!state && rateWindow && rateWindow.resetAt > now && rateWindow.count >= RATE_LIMIT_MAX) {
    response.setHeader('Retry-After', Math.ceil((rateWindow.resetAt - now) / 1000));
    response.status(429).json({ message: 'Слишком много попыток. Повторите немного позже.' });
    return;
  }
  if (!state) {
    rateWindows.set(clientKey, rateWindow && rateWindow.resetAt > now
      ? { ...rateWindow, count: rateWindow.count + 1 }
      : { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    state = { lead, sheetWritten: false, telegramSent: false, updatedAt: now };
    submissions.set(lead.submissionId, state);
  }

  try {
    const config = getRequiredEnvironment();
    if (!state.sheetWritten) {
      await appendLeadToSheet(state.lead, config);
      state.sheetWritten = true;
      state.updatedAt = Date.now();
    }
    if (!state.telegramSent) {
      await sendTelegramLead(state.lead, config);
      state.telegramSent = true;
      state.updatedAt = Date.now();
    }
    response.status(201).json({ ok: true });
  } catch (error) {
    console.error('Lead delivery failed:', error);
    response.status(502).json({
      message: state.sheetWritten
        ? 'Заявка сохранена, но уведомление не отправлено. Повторите отправку.'
        : 'Не удалось отправить заявку. Попробуйте ещё раз.',
    });
  }
}
