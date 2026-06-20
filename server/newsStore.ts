import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { NewsInput, NewsItem } from '../src/types/news';
import { createLocalizedText, normalizeLocalizedText } from '../src/types/localized';

const dataFile = path.resolve(process.env.NEWS_DATA_FILE || path.join(process.cwd(), 'data/news.json'));
const dataDirectory = path.dirname(dataFile);

const seedItems: NewsInput[] = [
  {
    title: createLocalizedText('Открыта запись на летние туры по Кыргызстану'),
    excerpt: createLocalizedText('Собрали короткие маршруты для семей, компаний и индивидуальных путешественников.'),
    category: 'Туризм',
    date: '2026-06-08',
    image: '/tourism.jpg',
    published: true,
    order: 1,
  },
  {
    title: createLocalizedText('Новый набор на языковые курсы в Германии'),
    excerpt: createLocalizedText('Программы от двух недель до учебного года с подбором школы и визовым сопровождением.'),
    category: 'Обучение',
    date: '2026-05-27',
    image: '/learn_germany.jpg',
    published: true,
    order: 2,
  },
  {
    title: createLocalizedText('Групповая поездка в Японию: осенний сезон'),
    excerpt: createLocalizedText('Маршрут Токио — Киото — Осака, небольшая группа и русскоязычный координатор.'),
    category: 'Туризм',
    date: '2026-05-14',
    image: '/tourism_germany.jpg',
    published: true,
    order: 3,
  },
  {
    title: createLocalizedText('Unique Asia расширяет консультационную команду'),
    excerpt: createLocalizedText('Теперь больше встреч доступно в вечернее время и по видеосвязи.'),
    category: 'Компания',
    date: '2026-04-30',
    image: '/work.jpg',
    published: true,
    order: 4,
  },
];

let mutationQueue = Promise.resolve();

function sortItems(items: NewsItem[]) {
  return [...items].sort((a, b) => a.order - b.order || b.date.localeCompare(a.date));
}

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    const now = new Date().toISOString();
    const initialItems = seedItems.map((item) => ({
      ...item,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    }));
    await writeFile(dataFile, `${JSON.stringify(initialItems, null, 2)}\n`, 'utf8');
  }
}

async function readItems() {
  await ensureStore();
  const contents = await readFile(dataFile, 'utf8');
  return (JSON.parse(contents) as unknown[]).map(normalizeNewsItem).filter(Boolean) as NewsItem[];
}

async function writeItems(items: NewsItem[]) {
  const temporaryFile = `${dataFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(sortItems(items), null, 2)}\n`, 'utf8');
  await rename(temporaryFile, dataFile);
}

function mutateItems<T>(mutator: (items: NewsItem[]) => T | Promise<T>) {
  const operation = mutationQueue.then(async () => {
    const items = await readItems();
    const result = await mutator(items);
    await writeItems(items);
    return result;
  });

  mutationQueue = operation.then(
    () => undefined,
    () => undefined,
  );
  return operation;
}

function normalizeNewsInput(input: NewsInput): NewsInput {
  return {
    ...input,
    title: normalizeLocalizedText(input.title, '', 180),
    excerpt: normalizeLocalizedText(input.excerpt, '', 600),
  };
}

function normalizeNewsItem(value: unknown): NewsItem | null {
  if (!value || typeof value !== 'object') return null;

  const item = value as Record<string, unknown>;
  if (typeof item.id !== 'string') return null;

  return {
    id: item.id,
    title: normalizeLocalizedText(item.title, '', 180),
    excerpt: normalizeLocalizedText(item.excerpt, '', 600),
    category: item.category as NewsItem['category'],
    date: typeof item.date === 'string' ? item.date : new Date().toISOString().slice(0, 10),
    image: typeof item.image === 'string' ? item.image : '/tourism.jpg',
    published: item.published === true,
    order: Number.isInteger(Number(item.order)) ? Number(item.order) : 9999,
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
    updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : new Date().toISOString(),
  };
}

export async function getPublishedNews() {
  return sortItems((await readItems()).filter((item) => item.published));
}

export async function getAllNews() {
  return sortItems(await readItems());
}

export async function createNews(input: NewsInput) {
  return mutateItems((items) => {
    const now = new Date().toISOString();
    const item: NewsItem = {
      ...normalizeNewsInput(input),
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    items.push(item);
    return item;
  });
}

export async function updateNews(id: string, input: NewsInput) {
  return mutateItems((items) => {
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const updatedItem: NewsItem = {
      ...items[index],
      ...normalizeNewsInput(input),
      updatedAt: new Date().toISOString(),
    };
    items[index] = updatedItem;
    return updatedItem;
  });
}

export async function deleteNews(id: string) {
  return mutateItems((items) => {
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    return true;
  });
}
