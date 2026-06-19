import { Mail, MapPin, Phone, Instagram } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-gray-200 bg-white pb-8 pt-16 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 font-black text-xl tracking-tighter shadow-sm">
                <span className="text-[#f5963b]">U</span>
                <span className="text-[#e62020]">K</span>
                <span className="text-[#e62020]">G</span>
              </div>
              <div className="flex flex-col flex-1 justify-center translate-y-0.5">
                <span className="text-xl font-bold leading-none tracking-wide text-primary">UNIQUE ASIA</span>
                <span className="mt-1 text-[0.6rem] font-medium uppercase leading-tight tracking-[0.2em] text-gray-500">
                  {t('Международные возможности')}
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              {t('Организуем поездки, обучение и легальное трудоустройство за рубежом с сопровождением на каждом этапе.')}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{t('Компания')}</h4>
            <ul className="space-y-4">
                <li><a href="/#о%20компании" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('О компании')}</a></li>
                <li><a href="/#о%20компании" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Наша команда')}</a></li>
                <li><a href="/#о%20компании" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('История компании')}</a></li>
                <li><a href="/#о%20компании" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Лицензии и документы')}</a></li>
                <li><a href="/#трудоустройство" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Трудоустройство')}</a></li>
                <li><a href="/#обучение" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Обучение')}</a></li>
                <li><a href="/#корпоративным%20клиентам" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Корпоративным клиентам')}</a></li>
                <li><a href="/#новости" className="text-sm text-gray-500 transition-colors hover:text-brand">{t('Новости')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{t('Контакты')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand" />
                <a href="tel:+996508979747" className="text-sm text-gray-500 transition-colors hover:text-brand">+996 508 97-97-47</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand" />
                <a href="tel:+996701979747" className="text-sm text-gray-500 transition-colors hover:text-brand">+996 701 979 747</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand" />
                <a href="mailto:uniqueasiakg@gmail.com" className="text-sm text-gray-500 transition-colors hover:text-brand">uniqueasiakg@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-brand" />
                <a href="https://www.instagram.com/unique_travel_kg" className="text-sm text-gray-500 transition-colors hover:text-brand">@unique_travel_kg</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-brand" />
                <a href="https://www.instagram.com/unique_job_kg" className="text-sm text-gray-500 transition-colors hover:text-brand">@unique_job_kg</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm text-gray-500">{t('г. Бишкек, ул. Московская 164, 720017')}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col items-center border-t border-primary/10 pt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2019–{new Date().getFullYear()} UNIQUE ASIA. {t('Все права защищены.')}
          </p>
        </div>
      </div>
    </footer>
  );
}
