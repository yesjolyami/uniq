import { useEffect, useState } from 'react';
import { ExternalLink, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { defaultSiteContent, type SiteContent, type VideoSlot } from '../types/siteContent';

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url, window.location.origin);

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
  } catch {
    return url;
  }

  return url;
}

function isDirectVideo(url: string) {
  return /\.(mp4|m4v|webm|mov|avi|mpeg|mpg|ogv)(\?.*)?$/i.test(url);
}

export default function VideoStories() {
  const { t } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [selectedVideo, setSelectedVideo] = useState<VideoSlot | null>(null);
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
          {videos.map((video, index) => {
            const hasVideo = Boolean(video.videoUrl.trim());

            return (
            <motion.article
              key={`${video.title}-${index}`}
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
                <button
                  type="button"
                  onClick={() => hasVideo && setSelectedVideo(video)}
                  disabled={!hasVideo}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-primary"
                  aria-label={`${t('Открыть видео')}: ${t(video.title)}`}
                >
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-6 p-6">
                <h3 className="text-xl font-black text-primary">{t(video.title)}</h3>
                <span className="shrink-0 text-right text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {t(video.label)}
                </span>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(selectedVideo.title)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/80 px-4 py-8 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black text-primary sm:text-base">{t(selectedVideo.title)}</h3>
                  <p className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{t(selectedVideo.label)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-primary transition hover:border-brand/30 hover:text-brand"
                    aria-label={t('Открыть видео')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-light"
                    aria-label={t('Закрыть')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="aspect-video bg-black">
                {isDirectVideo(selectedVideo.videoUrl) ? (
                  <video
                    key={selectedVideo.videoUrl}
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.image}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full"
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl(selectedVideo.videoUrl)}
                    title={t(selectedVideo.title)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
