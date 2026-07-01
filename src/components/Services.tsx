import { ArrowRight, CalendarDays, Hotel, MapPin, Plane, Users, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';
import { tourPackages } from '../data/servicesContent';
import { useI18n } from '../i18n/I18nContext';

const tourismHighlights = [
  'Маршрут, авиабилеты, отели и визы',
  'Поездки по Кыргызстану и за рубеж',
  'Гиды, активный отдых и гастрономия',
];

export default function Services() {
  const { t } = useI18n();

  const scrollToContacts = () => {
    document.getElementById('контакты')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="туризм" className="overflow-hidden border-b border-black/[0.04] bg-[#fbfcfd] py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <MapPin className="h-4 w-4" />
              {t('Туризм')}
            </span>
            <h2 className="text-[clamp(1.7rem,5vw,2.3rem)] font-black leading-tight text-primary">
              {t('Туризм как главный коммерческий акцент')}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-5 text-gray-600">
            {t('Показываем главное: маршрут, билеты, проживание и понятный план поездки.')}
          </p>
        </div>

        <div className="grid gap-5">
          <div className="overflow-hidden rounded-[1.35rem] border border-gray-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
              <div className="flex min-w-0 flex-col justify-center p-4 text-primary sm:p-6 lg:p-7">
                <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f5963b]">
                  {t('По миру и по Кыргызстану')}
                </span>
                <h3 className="mb-3 text-[clamp(1.4rem,4vw,1.8rem)] font-black leading-tight">
                  {t('Маршрут, билеты и проживание собираются в один короткий сценарий')}
                </h3>
                <p className="mb-4 text-sm leading-5 text-gray-600">
                  {t('Подбираем поездки для семей, пар, групп и деловых клиентов без лишней перегрузки.')}
                </p>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {tourismHighlights.map((item) => (
                    <div key={item} className="rounded-2xl bg-sand px-3.5 py-3 text-sm font-semibold leading-5 text-primary">
                      {t(item)}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={scrollToContacts}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/30 sm:w-fit"
                >
                  {t('Оставить заявку')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative min-h-[220px] border-t border-black/[0.05] lg:border-l lg:border-t-0">
                <img
                  src="/tourism.jpg"
                  alt={t('Туризм')}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/35 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/50 bg-white/92 p-3.5 shadow-sm sm:max-w-xs">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t('После консультации')}</p>
                  <p className="text-sm font-bold leading-5 text-primary">{t('Вы получите маршрут, бюджет и список документов')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[1.15rem] border border-black/[0.05] bg-[#fff9f4] p-4 sm:p-5">
          <h3 className="mb-3 text-base font-black text-primary">{t('Что чаще всего бронируют')}</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Plane, title: 'Авиабилеты' },
              { icon: Hotel, title: 'Отели' },
              { icon: Users, title: 'Групповые туры' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/[0.05] bg-white p-3.5 text-center">
                <item.icon className="mx-auto mb-2.5 h-5 w-5 text-brand" />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{t(item.title)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Ближайшие поездки')}</span>
              <h3 className="text-xl font-black text-primary">{t('Готовые турпакеты')}</h3>
            </div>
            <p className="max-w-md text-sm leading-5 text-gray-600">{t('Короткие форматы для быстрого выбора и обсуждения.')}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {tourPackages.slice(0, 2).map((tour, index) => (
            <motion.article
              key={tour.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.04 }}
              className={`group overflow-hidden rounded-[1.25rem] border bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(25,26,24,0.08)] ${
                tour.featured ? 'border-[#f5963b]/60' : 'border-black/[0.06]'
              }`}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={tour.image} alt={t(tour.title)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {tour.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    {t('Популярный')}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <MapPin className="h-4 w-4 text-brand" />
                  {t(tour.location)}
                </div>
                <h4 className="mb-3 text-base font-black text-primary">{t(tour.title)}</h4>
                <div className="mb-3 grid gap-2 border-y border-gray-100 py-2.5 text-xs text-gray-600 min-[420px]:grid-cols-2">
                  <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{t(tour.duration)}</span>
                  <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{t(tour.dates)}</span>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {tour.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-sand px-3 py-1.5 text-[11px] font-semibold text-gray-600">{t(tag)}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-black text-primary">{t(tour.price)}</span>
                  <button
                    type="button"
                    onClick={scrollToContacts}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:border-brand hover:text-brand"
                  >
                    {t('Подробнее')}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
