export const localeCodes = ['ru', 'ky', 'en', 'zh', 'ja', 'de'] as const;

export type Locale = (typeof localeCodes)[number];

export type LocalizedText = Record<Locale, string>;

export const languageLabels: Record<Locale, string> = {
  ru: 'Русский',
  ky: 'Кыргызча',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  de: 'Deutsch',
};

export function createLocalizedText(value = ''): LocalizedText {
  return localeCodes.reduce((result, locale) => {
    result[locale] = locale === 'ru' ? value : '';
    return result;
  }, {} as LocalizedText);
}

export function isLocalizedText(value: unknown): value is Partial<LocalizedText> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

export function normalizeLocalizedText(value: unknown, fallback: string | LocalizedText, maxLength = 220): LocalizedText {
  const fallbackText = typeof fallback === 'string' ? createLocalizedText(fallback) : fallback;
  const input = isLocalizedText(value) ? value : createLocalizedText(typeof value === 'string' ? value : fallbackText.ru);
  const isLegacyString = typeof value === 'string';

  return localeCodes.reduce((result, locale) => {
    const rawValue = input[locale];
    const fallbackValue = isLegacyString && locale !== 'ru' ? '' : fallbackText[locale] || '';
    const text = typeof rawValue === 'string' ? rawValue.trim() : '';
    result[locale] = (text || fallbackValue || '').slice(0, maxLength);
    return result;
  }, {} as LocalizedText);
}

export function getLocalizedText(value: string | Partial<LocalizedText>, locale: Locale) {
  if (typeof value === 'string') return value;
  return value[locale] || value.ru || '';
}
