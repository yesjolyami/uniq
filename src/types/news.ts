export const newsCategories = ['Туризм', 'Обучение', 'Компания'] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
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
