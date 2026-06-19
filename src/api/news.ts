import type { NewsInput, NewsItem } from '../types/news';

const API_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || 'Не удалось выполнить запрос');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const newsApi = {
  getPublished: () => request<NewsItem[]>('/news'),
  login: (password: string) =>
    request<{ token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
  getAll: (token: string) =>
    request<NewsItem[]>('/admin/news', {
      headers: authHeaders(token),
    }),
  create: (token: string, input: NewsInput) =>
    request<NewsItem>('/admin/news', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(input),
    }),
  update: (token: string, id: string, input: NewsInput) =>
    request<NewsItem>(`/admin/news/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(input),
    }),
  remove: (token: string, id: string) =>
    request<void>(`/admin/news/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    }),
};
