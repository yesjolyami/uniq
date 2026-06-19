import { randomBytes, timingSafeEqual } from 'node:crypto';
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

if (!adminPassword) {
  throw new Error('ADMIN_PASSWORD is required in production');
}

if (!process.env.ADMIN_PASSWORD) {
  console.warn('ADMIN_PASSWORD is not set. Development password: change-me');
}

app.use(express.json({ limit: '1mb' }));

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
