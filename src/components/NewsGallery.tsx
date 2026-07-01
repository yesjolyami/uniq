import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Quote, Star, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { newsApi } from '../api/news';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import type { NewsItem } from '../types/news';

const categories = ['Все', 'Туризм', 'Обучение', 'Компания'] as const;

const testimonials = [
  {
    category: 'Туризм',
    name: 'Аманкул',
    quote: 'Поездка была организована чётко: маршрут, документы и связь с координатором. Можно было просто наслаждаться путешествием.',
  },
  {
    category: 'Оформление виз',
    name: 'Камилла',
    quote: 'Получила понятный список документов и помощь на каждом этапе. Не пришлось самостоятельно разбираться во всех деталях.',
  },
  {
    category: 'Обучение',
    name: 'Арген',
    quote: 'Начал изучать японский язык с нуля. За три месяца дошёл до уровня N4. Преподаватели объясняют понятно и профессионально.',
  },
];

export default function NewsGallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Все');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, locale } = useI18n();
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    let isMounted = true;

    newsApi
      .getPublished()
      .then((items) => {
        if (isMounted) setNewsItems(items);
      })
      .catch((requestError: Error) => {
        if (isMounted) setError(requestError.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = useMemo(
    () => newsItems
      .filter((item) => activeCategory === 'Все' || item.category === activeCategory)
      .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date)),
    [activeCategory, newsItems]
  );

  const featuredReview = testimonials[reviewIndex];

  return (
    <section id="новости" className="border-y border-black/[0.05] bg-sand-light py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              <TrendingUp className="h-4 w-4" />
              {t('Будьте в курсе')}
            </span>
            <h2 className="text-[clamp(1.7rem,5vw,2.3rem)] font-black leading-tight text-primary">
              {t('Новости, отзывы и обновления')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1" aria-label={t('Фильтр новостей')}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#e62020]/20 ${
                  activeCategory === category ? 'border border-brand/20 bg-brand-soft text-primary' : 'border border-black/[0.06] bg-white text-gray-600 hover:text-primary'
                }`}
              >
                {t(category)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.16fr_0.84fr]">
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: '2019', label: 'Работаем с международными и локальными программами' },
                { value: '1000+', label: 'Обращений по поездкам, обучению и документам' },
                { value: '24/7', label: 'Связь с координатором в важных точках маршрута' },
              ].map((item) => (
                <article key={item.value} className="rounded-[1.1rem] border border-black/[0.06] bg-white p-3.5">
                  <strong className="block text-xl font-black text-primary">{item.value}</strong>
                  <p className="mt-1.5 text-[11px] leading-4 text-gray-600">{t(item.label)}</p>
                </article>
              ))}
            </div>

            {isLoading ? (
              <div className="flex gap-4 overflow-hidden" aria-label="Загрузка новостей">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-[210px] min-w-[260px] animate-pulse rounded-[1.5rem] bg-gray-100 sm:min-w-[290px]" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                Новости временно недоступны. Попробуйте обновить страницу позже.
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.06] bg-white px-5 py-12 text-center text-sm font-semibold text-gray-500">
                В этой категории пока нет опубликованных новостей.
              </div>
            ) : (
              <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <AnimatePresence mode="popLayout">
                  <div className="flex snap-x snap-mandatory gap-4">
                    {filteredNews.map((item) => (
                      <motion.article
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="group min-w-[260px] snap-start overflow-hidden rounded-[1.15rem] border border-black/[0.06] bg-white sm:min-w-[290px] lg:min-w-[320px]"
                      >
                        <div className="h-32 overflow-hidden">
                          <img src={item.image} alt={text(item.title)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">{t(item.category)}</span>
                            <time dateTime={item.date} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {new Intl.DateTimeFormat(locale === 'ky' ? 'ky-KG' : locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${item.date}T00:00:00`))}
                            </time>
                          </div>
                          <h3 className="mb-1.5 line-clamp-2 text-base font-black leading-snug text-primary">{text(item.title)}</h3>
                          <p className="line-clamp-2 text-sm leading-5 text-gray-500">{text(item.excerpt)}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            )}
          </div>

          <aside className="grid gap-4">
            <motion.article
              id="отзывы"
              key={featuredReview.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="scroll-mt-24 rounded-[1.15rem] border border-black/[0.06] bg-[#fff9f4] p-4 text-primary sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                  <Quote className="h-5 w-5" />
                </span>
                <div className="flex gap-1" aria-label={`5 ${t('из 5')}`}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-[#f5963b] text-[#f5963b]" />
                  ))}
                </div>
              </div>
              <p className="mb-4 line-clamp-4 text-[14px] font-medium leading-6 text-gray-700">
                «{t(featuredReview.quote)}»
              </p>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <strong className="block text-base font-black">{featuredReview.name}</strong>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                    {t(featuredReview.category)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setReviewIndex(index)}
                      aria-label={`${t('Перейти к отзывам')} ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${index === reviewIndex ? 'w-8 bg-brand' : 'w-4 bg-primary/15'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.article>

            <div className="rounded-[1.15rem] border border-black/[0.06] bg-white p-4 sm:p-5">
              <h3 className="mb-3 text-base font-black text-primary">{t('Что обновилось')}</h3>
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {[
                  'Летние туры по Кыргызстану уже открыты к бронированию',
                  'Вечерние консультации и WhatsApp-сопровождение доступны чаще',
                  'Короткие маршруты собраны в отдельные программы',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3.5 py-2.5 text-sm leading-5 text-gray-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
