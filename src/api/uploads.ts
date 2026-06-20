const API_URL = '/api';

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export type UploadResult = {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
};

export async function uploadAsset(token: string, file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/admin/uploads`, {
    method: 'POST',
    headers: authHeaders(token),
    body: formData,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || 'Не удалось загрузить файл');
  }

  return response.json() as Promise<UploadResult>;
}
