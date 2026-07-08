import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Quote, Star, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { newsApi } from '../api/news';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import type { NewsItem } from '../types/news';

const categories = ['Все', 'Туризм', 'Обучение', 'Компания'] as const;


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
              {t('Новости')}
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

        <div>
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Загрузка новостей">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-[210px] animate-pulse rounded-[1.5rem] bg-gray-100" />
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
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredNews.map((item) => (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="group h-full overflow-hidden rounded-[1.15rem] border border-black/[0.06] bg-white"
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
          )}
        </div>
      </div>
    </section>
  );
}
