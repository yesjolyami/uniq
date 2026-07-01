import { BookOpenCheck, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const tracks = [
  {
    title: 'Языковые курсы',
    text: 'Английский, японский, немецкий и кыргызский язык для учёбы, работы и адаптации.',
  },
  {
    title: 'Курсы в сфере туризма',
    text: 'Подготовка гидов, менеджеров по туризму, бронированию и продаже авиабилетов.',
  },
  {
    title: 'Темы курсов',
    text: 'Стандарты туризма, экскурсионная деятельность, этика, культура Кыргызстана, география, гастрономия, безопасность и первая медицинская помощь.',
  },
];

export default function EducationPage() {
  const { t } = useI18n();

  return (
    <main className="bg-sand-light pt-24 sm:pt-28">
      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.35rem] border border-black/[0.05] bg-white p-5 sm:p-7 lg:p-8">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <GraduationCap className="h-4 w-4" />
              {t('Обучение')}
            </span>
            <h1 className="mb-4 text-[clamp(1.8rem,5vw,2.6rem)] font-black leading-tight text-primary">
              {t('Языки и туристические профессии с понятной программой занятий')}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-gray-600">
              {t('Организуем языковые курсы и обучение для гидов, менеджеров по туризму, бронированию и продаже авиабилетов.')}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <article key={track.title} className={`rounded-[1.2rem] border p-5 ${index === 2 ? 'border-brand/15 bg-brand-soft/55' : 'border-black/[0.05] bg-white'}`}>
                <BookOpenCheck className="mb-4 h-5 w-5 text-brand" />
                <h2 className="mb-2 text-lg font-black text-primary">{t(track.title)}</h2>
                <p className="text-sm leading-6 text-gray-600">{t(track.text)}</p>
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
