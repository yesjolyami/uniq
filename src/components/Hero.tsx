import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FileCheck2, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

const slides = [
  { image: '/hero.png', alt: 'Путешественники на фоне японского храма', position: 'object-center md:object-right' },
  { image: '/cta.png', alt: 'Горный маршрут в Кыргызстане', position: 'object-center' },
  { image: '/tourism_germany.jpg', alt: 'Путешествие по Германии', position: 'object-center' },
  { image: '/learn_germany.jpg', alt: 'Международная языковая программа', position: 'object-center' },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const { t, locale } = useI18n();
  const hero = content.hero;
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-[62svh] items-end overflow-hidden bg-[#f7f4ef] pb-9 pt-18 md:min-h-[56vh] md:items-center md:pb-12 md:pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription={t('слайдер')}
      aria-label={t('Основные направления Unique Asia')}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={slides[activeSlide].image}
            src={slides[activeSlide].image}
            alt={t(slides[activeSlide].alt)}
            fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 5.5, ease: 'linear' } }}
            className={`absolute inset-0 h-full w-full object-cover ${slides[activeSlide].position}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,239,.76)_0%,#f7f4ef_78%)] md:bg-[linear-gradient(90deg,#f7f4ef_0%,rgba(247,244,239,.92)_44%,rgba(247,244,239,.34)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-5 md:gap-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(280px,0.38fr)] lg:items-center">
          <div className="max-w-3xl text-primary">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:mb-4 sm:text-[11px] sm:tracking-[0.16em]"
            >
              <span className="h-px w-8 bg-brand" />
              {text(hero.eyebrow)}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-3 max-w-4xl text-[clamp(1.85rem,6vw,3rem)] font-black leading-[1.02] sm:text-[2.8rem]"
            >
              {text(hero.title)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 max-w-xl text-sm leading-5 text-gray-700 sm:mb-5 sm:text-[14px]"
            >
              {text(hero.subtitle)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="mb-4 flex flex-wrap gap-2 sm:mb-5"
            >
              {['Туризм', 'Трудоустройство', 'Обучение'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item === 'Туризм' ? 'туризм' : 'контакты')}
                  className="rounded-full border border-primary/10 bg-white/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-primary transition-colors hover:border-brand hover:text-brand"
                >
                  {t(item)}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row"
            >
              <button
                type="button"
                onClick={() => scrollTo('контакты')}
                className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand active:scale-[0.98] sm:w-auto"
              >
                {text(hero.primaryCta)}
              </button>
              <button
                type="button"
                onClick={() => scrollTo('туризм')}
                className="w-full rounded-full border border-primary/30 bg-transparent px-5 py-2.5 text-sm font-bold text-primary transition-all hover:border-brand hover:text-brand active:scale-[0.98] sm:w-auto"
              >
                {text(hero.secondaryCta)}
              </button>
              <a
                href="https://wa.me/996508979747"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#159447]/35 bg-transparent px-5 py-2.5 text-sm font-bold text-[#159447] transition-all hover:bg-white/60 active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                {text(hero.whatsappLabel)}
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="max-w-md rounded-[1.25rem] border border-primary/10 bg-white/70 p-3.5 text-primary shadow-sm backdrop-blur-sm sm:p-4 lg:ml-auto"
          >
            <div className="mb-3 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand/30 text-brand">
                <FileCheck2 className="h-5 w-5" />
              </span>
              <div>
                <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-brand">{t('Рабочая зона')}</p>
                <h2 className="text-[15px] font-black leading-tight sm:text-base">{t('Документы, маршрут и связь с менеджером в одном процессе')}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-primary/10 min-[420px]:grid-cols-3">
              {hero.facts.map((fact) => (
                <div key={fact.value} className="border-b border-primary/10 px-3 py-2.5 last:border-b-0 min-[420px]:border-b-0 min-[420px]:border-r min-[420px]:last:border-r-0">
                  <strong className="block text-base font-black text-primary">{fact.value}</strong>
                  <span className="mt-1 block text-[10px] font-semibold leading-4 text-gray-600">{text(fact.label)}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-4 text-gray-600">
              {t('Для трудоустройства отдельно фиксируем страну, работодателя, контракт и список документов до покупки билетов.')}
            </p>
          </motion.aside>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-5 lg:max-w-[17rem] lg:ml-auto">
          <div className="flex items-center gap-2" role="tablist" aria-label={t('Выбор слайда')}>
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                role="tab"
                aria-selected={activeSlide === index}
                aria-label={`${t('Показать слайд')} ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index ? 'w-10 bg-brand' : 'w-5 bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
              aria-label={t('Предыдущий слайд')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-[#f4f1eb]/80 text-primary shadow-sm backdrop-blur transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
              aria-label={t('Следующий слайд')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
