import { BadgeCheck, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const steps = [
  'Поиск работодателя и организация собеседования',
  'Разрешение на работу, контракт и анкеты',
  'Подача документов, визовая поддержка и страховка',
  'Медосмотр, предмиграционная подготовка, логистика и авиабилеты',
];

export default function EmploymentPage() {
  const { t } = useI18n();

  return (
    <main className="bg-[#fbfcfd] pt-24 sm:pt-28">
      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.35rem] border border-black/[0.05] bg-white p-5 sm:p-7 lg:p-8">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <BriefcaseBusiness className="h-4 w-4" />
              {t('Трудоустройство за рубежом')}
            </span>
            <h1 className="mb-4 text-[clamp(1.8rem,5vw,2.6rem)] font-black leading-tight text-primary">
              {t('Легальная работа с понятными этапами до выезда')}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-gray-600">
              {t('Работаем с проверенными работодателями, помогаем оформить документы и держим связь с клиентом на каждом важном этапе.')}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {['Япония', 'Германия', 'Словакия', 'Венгрия', 'Эстония', 'Монголия'].map((country) => (
                <span key={country} className="rounded-full border border-black/10 bg-sand px-3 py-1.5 text-xs font-bold text-primary">
                  {t(country)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step} className="rounded-[1.2rem] border border-black/[0.06] bg-white p-5">
                <BadgeCheck className="mb-4 h-5 w-5 text-brand" />
                <span className="mb-2 block text-xs font-black text-gray-300">0{index + 1}</span>
                <p className="text-sm font-bold leading-6 text-primary">{t(step)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand">
            {t('Получить консультацию')}
          </Link>
        </div>
      </section>
    </main>
  );
}
