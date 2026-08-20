import CNFlag from '../assets/CN.svg';
import DEFlag from '../assets/DE.svg';
import GBFlag from '../assets/GB.svg';
import JPFlag from '../assets/JP.svg';
import KGFlag from '../assets/KG.svg';
import RUFlag from '../assets/RU.svg';
import { useI18n } from '../i18n/I18nContext';
import type { Locale } from '../types/localized';

const flagByLocale: Record<Locale, string> = {
  ru: RUFlag,
  ky: KGFlag,
  en: GBFlag,
  zh: CNFlag,
  ja: JPFlag,
  de: DEFlag,
};

const labelByLocale: Record<Locale, string> = {
  ru: 'Флаг России',
  ky: 'Флаг Кыргызстана',
  en: 'Флаг Великобритании',
  zh: 'Флаг Китая',
  ja: 'Флаг Японии',
  de: 'Флаг Германии',
};

export default function LanguageFlag({ locale, className = '' }: { locale: Locale; className?: string }) {
  const { t } = useI18n();

  return (
    <span className={`inline-flex ${className}`}>
      <img
        src={flagByLocale[locale]}
        alt={t(labelByLocale[locale])}
        className="h-[17px] w-[26px] overflow-hidden rounded-[5px] border border-black/10 object-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
        loading="lazy"
      />
    </span>
  );
}
