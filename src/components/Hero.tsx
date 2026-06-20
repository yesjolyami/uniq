import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FileCheck2, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';
import { getLocalizedText } from '../types/localized';

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

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-[calc(100svh-68px)] items-end overflow-hidden bg-[#f7f4ef] pb-20 pt-24 md:min-h-[78vh] md:items-center md:pb-24 md:pt-32"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,239,.72)_0%,#f7f4ef_76%)] md:bg-[linear-gradient(90deg,#f7f4ef_0%,rgba(247,244,239,.92)_42%,rgba(247,244,239,.38)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 md:gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.42fr)] lg:items-center">
        <div className="max-w-3xl text-primary">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:mb-5 sm:text-[11px] sm:tracking-[0.16em]"
          >
            <span className="h-px w-8 bg-brand" />
            {text(hero.eyebrow)}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 max-w-4xl text-[clamp(2rem,8vw,3.5rem)] font-black leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
          >
            {text(hero.title)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 max-w-2xl text-sm leading-7 text-gray-700 sm:mb-7 sm:text-base"
          >
            {text(hero.subtitle)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mb-6 flex flex-wrap gap-2 sm:mb-7"
          >
            {['Туризм', 'Трудоустройство', 'Обучение'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollTo('услуги')}
                className="rounded-full border border-primary/10 bg-white/55 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-primary transition-colors hover:border-brand hover:text-brand sm:px-4 sm:text-xs"
              >
                {t(item)}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollTo('cta')}
              className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand active:scale-[0.98] sm:w-auto"
            >
              {text(hero.primaryCta)}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('услуги')}
              className="w-full rounded-full border border-primary/30 bg-transparent px-7 py-3.5 text-sm font-bold text-primary transition-all hover:border-brand hover:text-brand active:scale-[0.98] sm:w-auto"
            >
              {text(hero.secondaryCta)}
            </button>
            <a
              href="https://wa.me/996508979747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#159447]/35 bg-transparent px-7 py-3.5 text-sm font-bold text-[#159447] transition-all hover:bg-white/60 active:scale-[0.98] sm:w-auto"
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
          className="max-w-md rounded-[1.25rem] border border-primary/10 bg-white/68 p-4 text-primary shadow-sm backdrop-blur-sm sm:rounded-[1.5rem] sm:p-5 lg:ml-auto"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand/30 text-brand">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div>
              <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-brand">{t('Рабочая зона')}</p>
              <h2 className="text-lg font-black leading-tight">{t('Документы, маршрут и связь с менеджером в одном процессе')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-primary/10 min-[420px]:grid-cols-3">
            {hero.facts.map((fact) => (
              <div key={fact.value} className="border-b border-primary/10 px-3 py-3 last:border-b-0 min-[420px]:border-b-0 min-[420px]:border-r min-[420px]:py-4 min-[420px]:last:border-r-0">
                <strong className="block text-xl font-black text-primary">{fact.value}</strong>
                <span className="mt-2 block text-[11px] font-semibold leading-4 text-gray-600">{text(fact.label)}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-gray-600">
            {t('Для трудоустройства отдельно фиксируем страну, работодателя, контракт и список документов до покупки билетов.')}
          </p>
        </motion.aside>
        </div>

        <div className="absolute bottom-[-1rem] left-4 right-4 flex items-center justify-between sm:left-6 sm:right-6 md:bottom-[-2rem] lg:left-auto lg:right-8 lg:w-auto lg:gap-5">
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
              onClick={showPrevious}
              aria-label={t('Предыдущий слайд')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-[#f4f1eb]/80 text-primary shadow-sm backdrop-blur transition-colors hover:border-brand hover:text-brand sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label={t('Следующий слайд')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-brand sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
