import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

export default function VideoStories() {
  const { t } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const videos = content.videos.filter((video) => video.enabled);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  if (!videos.length) return null;

  return (
    <section className="bg-white py-28 md:py-36" aria-label={t('Видео Unique Asia')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {t('Видео')}
            </span>
            <h2 className="text-3xl font-black leading-tight text-primary md:text-4xl">
              {t('Места для коротких роликов')}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {videos.map((video, index) => (
            <motion.article
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-slate-50"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.image}
                  alt={t(video.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-primary/35" />
                <a
                  href={video.videoUrl || undefined}
                  target={video.videoUrl ? '_blank' : undefined}
                  rel={video.videoUrl ? 'noreferrer' : undefined}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand/30"
                  aria-label={`${t('Открыть видео')}: ${t(video.title)}`}
                >
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </a>
              </div>
              <div className="flex items-center justify-between gap-6 p-6">
                <h3 className="text-xl font-black text-primary">{t(video.title)}</h3>
                <span className="shrink-0 text-right text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {t(video.label)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
