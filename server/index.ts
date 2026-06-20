import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import { newsCategories, type NewsInput } from '../src/types/news';
import { createNews, deleteNews, getAllNews, getPublishedNews, updateNews } from './newsStore';
import { getSiteContent, normalizeSiteContent, updateSiteContent } from './siteContentStore';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const adminPassword = process.env.ADMIN_PASSWORD || (isProduction ? '' : 'change-me');
const sessions = new Map<string, number>();
const sessionLifetime = 1000 * 60 * 60 * 12;
const uploadsDirectory = path.resolve(process.env.UPLOADS_DIR || path.join(process.cwd(), 'public/uploads'));
const uploadLimitMegabytes = 500;
const uploadLimitBytes = uploadLimitMegabytes * 1024 * 1024;
const allowedUploadTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['video/mp4', 'mp4'],
  ['video/x-m4v', 'm4v'],
  ['video/webm', 'webm'],
  ['video/quicktime', 'mov'],
  ['video/x-msvideo', 'avi'],
  ['video/mpeg', 'mpeg'],
  ['video/ogg', 'ogv'],
  ['application/pdf', 'pdf'],
]);

if (!adminPassword) {
  throw new Error('ADMIN_PASSWORD is required in production');
}

if (!process.env.ADMIN_PASSWORD) {
  console.warn('ADMIN_PASSWORD is not set. Development password: change-me');
}

app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDirectory, {
  immutable: true,
  maxAge: '30d',
}));

function passwordsMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  const expiresAt = token ? sessions.get(token) : undefined;

  if (!token || !expiresAt || expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    response.status(401).json({ message: 'Сессия истекла. Войдите снова.' });
    return;
  }

  sessions.set(token, Date.now() + sessionLifetime);
  next();
}

function parseContentDisposition(value = '') {
  return Object.fromEntries(
    value
      .split(';')
      .map((part) => part.trim())
      .map((part) => {
        const [key, ...rest] = part.split('=');
        return [key, rest.join('=').replace(/^"|"$/g, '')];
      }),
  );
}

async function readMultipartFile(request: Request) {
  const contentType = request.headers['content-type'] || '';
  const boundaryMatch = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType);
  const boundary = boundaryMatch?.[1] || boundaryMatch?.[2];

  if (!boundary) {
    throw new Error('Файл не найден в запросе');
  }

  const chunks: Buffer[] = [];
  let totalSize = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalSize += buffer.length;

    if (totalSize > uploadLimitBytes + 1024 * 1024) {
      throw new Error(`Файл слишком большой. Максимум ${uploadLimitMegabytes} МБ`);
    }

    chunks.push(buffer);
  }

  const body = Buffer.concat(chunks);
  const separator = Buffer.from(`--${boundary}`);
  let offset = body.indexOf(separator);

  while (offset !== -1) {
    const headerStart = offset + separator.length + 2;
    const headerEnd = body.indexOf(Buffer.from('\r\n\r\n'), headerStart);

    if (headerEnd === -1) break;

    const headers = body.subarray(headerStart, headerEnd).toString('utf8');
    const disposition = parseContentDisposition(/content-disposition:\s*([^\r\n]+)/i.exec(headers)?.[1]);
    const filename = disposition.filename;

    if (disposition.name === 'file' && filename) {
      const mimeType = /content-type:\s*([^\r\n]+)/i.exec(headers)?.[1]?.trim().toLowerCase() || 'application/octet-stream';
      const nextSeparator = body.indexOf(separator, headerEnd + 4);
      const contentEnd = nextSeparator === -1 ? body.length : nextSeparator - 2;
      const content = body.subarray(headerEnd + 4, contentEnd);

      return { filename, mimeType, content };
    }

    offset = body.indexOf(separator, headerEnd + 4);
  }

  throw new Error('Файл не найден в запросе');
}

function sanitizeBaseName(filename: string) {
  const parsed = path.parse(filename);
  return parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё_-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'file';
}

function validateNewsInput(value: unknown): { data?: NewsInput; message?: string } {
  if (!value || typeof value !== 'object') {
    return { message: 'Переданы некорректные данные' };
  }

  const input = value as Record<string, unknown>;
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const excerpt = typeof input.excerpt === 'string' ? input.excerpt.trim() : '';
  const category = input.category;
  const date = typeof input.date === 'string' ? input.date : '';
  const image = typeof input.image === 'string' ? input.image.trim() : '';
  const order = Number(input.order);

  if (title.length < 3 || title.length > 180) {
    return { message: 'Заголовок должен содержать от 3 до 180 символов' };
  }
  if (excerpt.length < 10 || excerpt.length > 600) {
    return { message: 'Описание должно содержать от 10 до 600 символов' };
  }
  if (!newsCategories.includes(category as NewsInput['category'])) {
    return { message: 'Выберите корректную категорию' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T00:00:00`).getTime())) {
    return { message: 'Укажите корректную дату' };
  }
  if (!image || (!image.startsWith('/') && !/^https?:\/\//i.test(image))) {
    return { message: 'Изображение должно быть локальным путём или HTTP(S)-ссылкой' };
  }
  if (!Number.isInteger(order) || order < 0 || order > 9999) {
    return { message: 'Порядок должен быть целым числом от 0 до 9999' };
  }

  return {
    data: {
      title,
      excerpt,
      category: category as NewsInput['category'],
      date,
      image,
      published: input.published === true,
      order,
    },
  };
}

app.get('/api/news', async (_request, response, next) => {
  try {
    response.json(await getPublishedNews());
  } catch (error) {
    next(error);
  }
});

app.get('/api/site-content', async (_request, response, next) => {
  try {
    response.json(await getSiteContent());
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/login', (request, response) => {
  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  if (!passwordsMatch(password, adminPassword)) {
    response.status(401).json({ message: 'Неверный пароль' });
    return;
  }

  const token = randomBytes(32).toString('hex');
  sessions.set(token, Date.now() + sessionLifetime);
  response.json({ token });
});

app.get('/api/admin/news', requireAdmin, async (_request, response, next) => {
  try {
    response.json(await getAllNews());
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/site-content', requireAdmin, async (_request, response, next) => {
  try {
    response.json(await getSiteContent());
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/uploads', requireAdmin, async (request, response) => {
  try {
    const file = await readMultipartFile(request);
    const extension = allowedUploadTypes.get(file.mimeType);

    if (!extension) {
      response.status(400).json({ message: 'Поддерживаются JPG, PNG, WebP, GIF, MP4, M4V, WebM, MOV, AVI, MPEG, OGV и PDF' });
      return;
    }

    if (file.content.length === 0) {
      response.status(400).json({ message: 'Файл пустой' });
      return;
    }

    if (file.content.length > uploadLimitBytes) {
      response.status(400).json({ message: `Файл слишком большой. Максимум ${uploadLimitMegabytes} МБ` });
      return;
    }

    await mkdir(uploadsDirectory, { recursive: true });

    const safeName = `${Date.now()}-${sanitizeBaseName(file.filename)}-${randomUUID().slice(0, 8)}.${extension}`;
    await writeFile(path.join(uploadsDirectory, safeName), file.content);

    response.status(201).json({
      url: `/uploads/${safeName}`,
      filename: safeName,
      size: file.content.length,
      mimeType: file.mimeType,
    });
  } catch (error) {
    response.status(400).json({ message: (error as Error).message || 'Не удалось загрузить файл' });
  }
});

app.put('/api/admin/site-content', requireAdmin, async (request, response, next) => {
  try {
    response.json(await updateSiteContent(normalizeSiteContent(request.body)));
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/news', requireAdmin, async (request, response, next) => {
  const result = validateNewsInput(request.body);
  if (!result.data) {
    response.status(400).json({ message: result.message });
    return;
  }

  try {
    response.status(201).json(await createNews(result.data));
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/news/:id', requireAdmin, async (request, response, next) => {
  const result = validateNewsInput(request.body);
  if (!result.data) {
    response.status(400).json({ message: result.message });
    return;
  }

  try {
    const item = await updateNews(request.params.id, result.data);
    if (!item) {
      response.status(404).json({ message: 'Новость не найдена' });
      return;
    }
    response.json(item);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/news/:id', requireAdmin, async (request, response, next) => {
  try {
    if (!(await deleteNews(request.params.id))) {
      response.status(404).json({ message: 'Новость не найдена' });
      return;
    }
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

if (isProduction) {
  const distDirectory = path.resolve(process.env.STATIC_DIR || path.join(process.cwd(), 'dist'));
  app.use(express.static(distDirectory));
  app.get('*', (_request, response) => response.sendFile(path.join(distDirectory, 'index.html')));
}

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
