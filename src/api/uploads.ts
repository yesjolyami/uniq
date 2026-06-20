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

export const maxUploadMegabytes = 2048;
export const maxUploadBytes = maxUploadMegabytes * 1024 * 1024;

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

    if (response.status === 413) {
      throw new Error(
        payload?.message ||
        `Сервер отклонил файл по лимиту размера. Для видео до ${maxUploadMegabytes} МБ нужно увеличить client_max_body_size в Nginx и перезагрузить Nginx.`,
      );
    }

    throw new Error(payload?.message || 'Не удалось загрузить файл');
  }

  return response.json() as Promise<UploadResult>;
}
