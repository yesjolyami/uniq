import { useEffect, useState } from 'react';
import { ArrowUpRight, Images } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type GalleryImage, type SiteContent } from '../types/siteContent';

export default function GallerySection() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { t, locale } = useI18n();
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  return (
    <>
      <section id="фотогалерея" className="border-b border-gray-100 bg-slate-50 py-10 text-primary sm:py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <span className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f5963b]"><Images className="h-4 w-4" />{t('Моменты из поездок')}</span>
              <h2 className="text-[clamp(1.7rem,5vw,2.2rem)] font-black leading-tight">{t('Фотогалерея')}</h2>
            </div>
            <span className="hidden text-sm text-gray-500 sm:block">{t('Нажмите на фото, чтобы увеличить')}</span>
          </div>
          <div className="grid auto-rows-[96px] grid-cols-2 gap-3 sm:auto-rows-[120px] sm:gap-4 md:auto-rows-[145px] md:grid-cols-4">
            {content.gallery.slice(0, 4).map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`${t('Открыть фото')}: ${text(image.alt)}`}
                className={`group relative overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5963b] ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img src={image.src} alt={text(image.alt)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-[#4b3830]/0 transition-colors group-hover:bg-[#4b3830]/20" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white text-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
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
            aria-label={text(selectedImage.alt)}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-[#4b3830]/90 p-4"
          >
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              src={selectedImage.src}
              alt={text(selectedImage.alt)}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain"
            />
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary sm:right-5 sm:top-5" aria-label={t('Закрыть фотографию')}>{t('Закрыть')}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
