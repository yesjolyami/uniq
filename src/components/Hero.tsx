import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, MessageCircle, Plane } from 'lucide-react';
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
    description: 'Туры, маршруты и сопровождение поездки',
    href: '/tourism',
    icon: Plane,
    className: 'bg-brand text-white shadow-[0_18px_36px_rgba(230,32,32,0.28)] hover:bg-[#c91616]',
    iconClassName: 'bg-white/18 text-white',
  },
  {
    label: 'Трудоустройство',
    description: 'Хочу работать за рубежом!',
    href: '/employment',
    icon: BriefcaseBusiness,
    className: 'bg-primary text-white shadow-[0_18px_36px_rgba(39,39,42,0.22)] hover:bg-primary-light',
    iconClassName: 'bg-white/14 text-white',
  },
  {
    label: 'Обучение',
    description: 'Записаться на языковые курсы и образовательные программы',
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
      className="relative flex min-h-[76svh] items-end overflow-hidden bg-[#f7f4ef] pb-9 pt-18 md:min-h-[84vh] md:items-center md:pb-12 md:pt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription={t('слайдер')}
      aria-label={t('Основные направления Unique Asia')}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,150,59,.22),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(230,32,32,.12),transparent_28%)]" />
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,249,.82)_0%,rgba(255,255,255,.52)_48%,rgba(255,255,255,.88)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,249,.96)_0%,rgba(255,255,255,.76)_42%,rgba(255,255,255,.18)_74%,rgba(255,255,255,.06)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-4xl text-primary">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 inline-flex items-center gap-3 rounded-full border border-brand/10 bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm sm:mb-4 sm:text-[11px] sm:tracking-[0.16em]"
            >
              <span className="h-px w-8 bg-brand" />
              {text(hero.eyebrow)}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 max-w-4xl text-[2.2rem] font-black leading-[0.98] sm:mb-6 sm:text-[3.2rem] lg:text-[4.2rem]"
            >
              {text(hero.title)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08 }}
              className="max-w-2xl text-sm font-medium leading-6 text-primary/80 sm:text-base sm:leading-7"
            >
              {text(hero.subtitle)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.14 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button
                type="button"
                onClick={() => scrollTo('контакты')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_34px_rgba(230,32,32,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#cc1d1d]"
              >
                {text(hero.primaryCta)}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('новости')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/10 bg-white/85 px-6 py-3.5 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/20 hover:text-brand"
              >
                {text(hero.secondaryCta)}
              </button>
              <a
                href="https://wa.me/996508979747"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/20 bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_30px_rgba(37,211,102,.18)] transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" />
                {text(hero.whatsappLabel)}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.2 }}
              className="mt-7 grid gap-3 sm:grid-cols-3"
            >
              {hero.facts.map((fact) => (
                <div key={fact.value + text(fact.label)} className="rounded-[1.35rem] border border-black/6 bg-white/75 px-4 py-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black leading-none text-primary">{fact.value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-primary/58">{text(fact.label)}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="hidden rounded-[2rem] border border-white/65 bg-white/72 p-5 text-primary shadow-[0_28px_90px_rgba(39,39,42,0.12)] backdrop-blur lg:block"
          >
            <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              {t('В пакет входит')}
            </span>
            <div className="space-y-3">
              {[
                'Туризм по миру и Кыргызстану',
                'Легальное трудоустройство за рубежом',
                'Языковые курсы и обучение',
                'Визы, авиабилеты и бронирование',
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] bg-[#fcfaf7] px-4 py-3 text-sm font-semibold leading-5 text-primary/80">
                  {t(item)}
                </div>
              ))}
            </div>
          </motion.aside>
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
    <section className="relative z-10 -mt-8 bg-transparent pb-8 sm:-mt-10 sm:pb-10 md:-mt-12 md:pb-12">
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
                className={`group mt-10 flex min-h-20 w-full items-center justify-between gap-3 rounded-[1.35rem] px-4 py-4 text-left transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:translate-y-0 active:scale-[0.98] sm:min-h-24 sm:px-5 ${item.className}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconClassName}`}>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-black leading-tight sm:text-[13px] md:text-[14px] lg:text-[18px]">
                      {t(item.label)}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium leading-4 text-current/80 sm:text-[10px] md:text-[11px]">
                      {t(item.description)}
                    </span>
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
