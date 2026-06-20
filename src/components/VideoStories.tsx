import { useEffect, useState } from 'react';
import { ExternalLink, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { defaultSiteContent, type SiteContent, type VideoSlot } from '../types/siteContent';
import { getLocalizedText } from '../types/localized';

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
  const { t, locale } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [selectedVideo, setSelectedVideo] = useState<VideoSlot | null>(null);

  const videos = content.videos.filter((video) => video.enabled);
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  if (!videos.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20 md:py-28 lg:py-36" aria-label={t('Видео Unique Asia')}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex min-w-0 flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {t('Видео')}
            </span>

            <h2 className="max-w-3xl text-2xl font-black leading-tight text-primary [overflow-wrap:anywhere] sm:text-3xl md:text-4xl">
              {t('Места для коротких роликов')}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
          {videos.map((video, index) => {
            const hasVideo = Boolean(video.videoUrl.trim());
            const title = text(video.title);
            const label = text(video.label);

            return (
              <motion.article
                key={`${video.videoUrl || video.image}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.08 }}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-slate-50 sm:rounded-[1.5rem]"
              >
                <div className="relative aspect-video min-h-[180px] overflow-hidden bg-slate-200 sm:min-h-0">
                  <img
                    src={video.image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-primary/35" />

                  <button
                    type="button"
                    onClick={() => hasVideo && setSelectedVideo(video)}
                    disabled={!hasVideo}
                    className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-primary sm:h-16 sm:w-16"
                    aria-label={`${t('Открыть видео')}: ${title}`}
                  >
                    <Play className="ml-0.5 h-5 w-5 fill-current sm:ml-1 sm:h-7 sm:w-7" />
                  </button>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6 md:flex-row md:items-start md:justify-between md:gap-6">
                  <h3 className="min-w-0 text-lg font-black leading-snug text-primary [hyphens:auto] [overflow-wrap:anywhere] sm:text-xl">
                    {title}
                  </h3>

                  <span className="min-w-0 shrink-0 text-left text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand [hyphens:auto] [overflow-wrap:anywhere] md:max-w-[45%] md:text-right">
                    {label}
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
            aria-label={text(selectedVideo.title)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/80 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.25rem] bg-black shadow-2xl sm:rounded-[1.5rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex max-h-[35dvh] shrink-0 flex-col gap-3 overflow-y-auto bg-white px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:px-5">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black leading-snug text-primary [hyphens:auto] [overflow-wrap:anywhere] sm:text-base">
                    {text(selectedVideo.title)}
                  </h3>

                  <p className="mt-1 text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand [hyphens:auto] [overflow-wrap:anywhere]">
                    {text(selectedVideo.label)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
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

              <div className="min-h-0 bg-black">
                <div className="aspect-video max-h-[calc(100dvh-8rem)] w-full">
                  {isDirectVideo(selectedVideo.videoUrl) ? (
                    <video
                      key={selectedVideo.videoUrl}
                      src={selectedVideo.videoUrl}
                      poster={selectedVideo.image}
                      controls
                      autoPlay
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(selectedVideo.videoUrl)}
                      title={text(selectedVideo.title)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}