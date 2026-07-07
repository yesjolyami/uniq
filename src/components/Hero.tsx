import { useEffect, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Plane } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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

const heroDirections = [
  {
    label: 'Туризм',
    href: '/tourism',
    icon: Plane,
    className: 'bg-brand text-white shadow-[0_18px_36px_rgba(230,32,32,0.28)] hover:bg-[#c91616]',
    iconClassName: 'bg-white/18 text-white',
  },
  {
    label: 'Трудоустройство',
    href: '/employment',
    icon: BriefcaseBusiness,
    className: 'bg-primary text-white shadow-[0_18px_36px_rgba(39,39,42,0.22)] hover:bg-primary-light',
    iconClassName: 'bg-white/14 text-white',
  },
  {
    label: 'Обучение',
    href: '/education',
    icon: GraduationCap,
    className: 'bg-[#f5963b] text-primary shadow-[0_18px_36px_rgba(245,150,59,0.28)] hover:bg-[#e88424]',
    iconClassName: 'bg-primary/10 text-primary',
  },
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
      className="relative flex min-h-[62svh] items-end overflow-hidden bg-[#f7f4ef] pb-9 pt-18 md:min-h-[58vh] md:items-center md:pb-12 md:pt-20"
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
            className={`absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110 ${slides[activeSlide].position}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.68)_0%,rgba(255,255,255,.44)_52%,rgba(255,255,255,.74)_100%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,.9)_0%,rgba(255,255,255,.68)_38%,rgba(255,255,255,.16)_72%,rgba(255,255,255,.04)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-primary">
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
            className="mb-5 max-w-4xl text-[2rem] font-black leading-[1.02] sm:mb-6 sm:text-[2.7rem] lg:text-[3rem]"
          >
            {text(hero.title)}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}

export function HeroDirectionButtons() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 -mt-8 bg-white pb-8 sm:-mt-10 sm:pb-10 md:-mt-12 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >

          <div className="grid gap-3 sm:grid-cols-3">
            {heroDirections.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.href)}
                className={`group flex min-h-20 w-full items-center justify-between gap-3 rounded-[1.15rem] px-4 py-4 text-left font-black transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:translate-y-0 active:scale-[0.98] sm:min-h-24 sm:px-5 mt-10 ${item.className}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconClassName}`}>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 text-[15px] leading-tight sm:text-[13px] md:text-[14px] lg:text-[15px]">
                    {t(item.label)}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
