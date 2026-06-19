import { defaultSiteContent, type SiteContent } from '../types/siteContent';

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

  return response.json() as Promise<T>;
}

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const siteContentApi = {
  getPublic: async () => {
    try {
      return await request<SiteContent>('/site-content');
    } catch {
      return defaultSiteContent;
    }
  },

  getAdmin: (token: string) =>
    request<SiteContent>('/admin/site-content', {
      headers: authHeaders(token),
    }),

  update: (token: string, input: SiteContent) =>
    request<SiteContent>(
      '/admin/site-content',
      { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(input) },
    ),
};
