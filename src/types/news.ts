import { createLocalizedText, type LocalizedText } from './localized';

export const newsCategories = ['Туризм', 'Обучение', 'Компания'] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: NewsCategory;
  date: string;
  image: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type NewsInput = Pick<
  NewsItem,
  'title' | 'excerpt' | 'category' | 'date' | 'image' | 'published' | 'order'
>;

export const createEmptyNewsText = () => ({
  title: createLocalizedText(),
  excerpt: createLocalizedText(),
});
