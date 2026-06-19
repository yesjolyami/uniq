import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Images } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { newsApi } from '../api/news';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import type { NewsItem } from '../types/news';
import { defaultSiteContent, type GalleryImage, type SiteContent } from '../types/siteContent';

const categories = ['Все', 'Туризм', 'Обучение', 'Компания'] as const;

export default function NewsGallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Все');
  const [visibleCount, setVisibleCount] = useState(3);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, locale } = useI18n();

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

    siteContentApi
      .getPublic()
      .then((siteContent) => {
        if (isMounted) setContent(siteContent);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = newsItems
    .filter((item) => activeCategory === 'Все' || item.category === activeCategory)
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date));

  const changeCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setVisibleCount(3);
  };

  return (
    <>
      <section id="новости" className="bg-sand-light py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Будьте в курсе')}</span>
              <h2 className="text-3xl font-black text-primary md:text-5xl">{t('Новости и обновления')}</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" aria-label={t('Фильтр новостей')}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => changeCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#e62020]/20 ${
                    activeCategory === category ? 'border border-brand/20 bg-brand-soft text-primary' : 'border border-black/[0.06] bg-white text-gray-600 hover:text-primary'
                  }`}
                >
                  {t(category)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Загрузка новостей">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-[420px] animate-pulse rounded-[1.5rem] bg-gray-100" />
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredNews.slice(0, visibleCount).map((item) => (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="group overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white"
                  >
                    <div className="h-56 overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">{t(item.category)}</span>
                        <time dateTime={item.date} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Intl.DateTimeFormat(locale === 'ky' ? 'ky-KG' : locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${item.date}T00:00:00`))}
                        </time>
                      </div>
                      <h3 className="mb-3 text-lg font-black leading-snug text-primary">{t(item.title)}</h3>
                      <p className="text-sm leading-6 text-gray-500">{t(item.excerpt)}</p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}

          {visibleCount < filteredNews.length && (
            <div className="mt-14 text-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + 3)} className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-brand/30 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
                {t('Показать ещё')}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="фотогалерея" className="border-y border-gray-100 bg-slate-50 py-28 text-primary md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <span className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f5963b]"><Images className="h-4 w-4" />{t('Моменты из поездок')}</span>
              <h2 className="text-3xl font-black md:text-5xl">{t('Фотогалерея')}</h2>
            </div>
            <span className="hidden text-sm text-gray-500 sm:block">{t('Нажмите на фото, чтобы увеличить')}</span>
          </div>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-5 md:auto-rows-[220px] md:grid-cols-4">
            {content.gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`${t('Открыть фото')}: ${t(image.alt)}`}
                className={`group relative overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5963b] ${index === 0 || index === 5 ? 'col-span-2' : ''} ${index === 0 ? 'row-span-2' : ''}`}
              >
                <img src={image.src} alt={t(image.alt)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-[#4b3830]/0 transition-colors group-hover:bg-[#4b3830]/20" />
                <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(selectedImage.alt)}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-[#4b3830]/90 p-4"
          >
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              src={selectedImage.src}
              alt={t(selectedImage.alt)}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain"
            />
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary" aria-label={t('Закрыть фотографию')}>{t('Закрыть')}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
