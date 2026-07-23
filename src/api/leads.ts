export type LeadInput = {
  submissionId: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  website: string;
  pageUrl: string;
  utm: Record<string, string>;
};

export async function submitLead(input: LeadInput) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null) as { message?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.message || 'Не удалось отправить заявку. Попробуйте ещё раз.');
  }
}
