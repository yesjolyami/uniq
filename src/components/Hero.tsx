import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import KyrgyzOrnament, { KyrgyzMedallion } from './KyrgyzOrnament';

const heroDirections = [
  {
    label: 'Туризм',
    description: 'Подобрать тур',
    href: '/tourism',
    icon: Plane,
    className: 'bg-[#d84b3e] text-white shadow-[0_18px_36px_rgba(216,75,62,0.24)] hover:bg-[#bf3d32]',
    iconClassName: 'bg-white/18 text-white',
  },
  {
    label: 'Трудоустройство',
    description: 'Хочу работать за рубежом',
    href: '/employment',
    icon: BriefcaseBusiness,
    className: 'bg-[#137f7b] text-white shadow-[0_18px_36px_rgba(19,127,123,0.22)] hover:bg-[#0d6865]',
    iconClassName: 'bg-white/16 text-white',
  },
  {
    label: 'Обучение',
    description: 'Записаться на языковые курсы',
    href: '/education',
    icon: GraduationCap,
    className: 'bg-[#e6a23c] text-primary shadow-[0_18px_36px_rgba(230,162,60,0.24)] hover:bg-[#d4912d]',
    iconClassName: 'bg-primary/10 text-primary',
  },
];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[66svh] items-end overflow-hidden bg-[#f7f1e7] pb-14 pt-20 md:min-h-[64vh] md:items-center md:pb-16 md:pt-24">
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt={t('Путешественники на фоне японского храма')}
          fetchPriority="high"
          className="h-full w-full object-cover object-center brightness-110 contrast-105 saturate-110 md:object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,.86)_0%,rgba(255,255,255,.48)_44%,rgba(255,250,241,.92)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,248,.97)_0%,rgba(255,249,238,.8)_43%,rgba(255,255,255,.18)_74%,rgba(255,255,255,.04)_100%)]" />
      </div>
      <div className="absolute -left-20 top-28 h-48 w-48 rounded-full border-[32px] border-brand/[0.07] sm:left-[-4rem] sm:h-64 sm:w-64" />
      <KyrgyzMedallion
        className="absolute bottom-10 right-[5%] hidden h-36 w-36 rotate-6 opacity-60 drop-shadow-[0_16px_28px_rgba(78,61,42,0.12)] md:block lg:h-44 lg:w-44"
        tone="warm"
        variant="kochkor"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl rounded-[2rem] border border-white/65 bg-white/35 p-5 text-primary shadow-[0_24px_80px_rgba(91,69,44,0.1)] backdrop-blur-[2px] sm:p-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <span className="mb-3 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:mb-4 sm:text-[11px] sm:tracking-[0.16em]">
            <span className="h-px w-8 bg-brand" />
            {t('ОсОО «Юник Азия» / Бишкек')}
          </span>

          <h1 className="mb-4 max-w-3xl text-[2.15rem] font-black leading-[1.02] tracking-[-0.035em] sm:text-[2.85rem] lg:text-[3.35rem]">
            {t('Путешествие начинается с «Unique Asia»')}
          </h1>

          <p className="max-w-2xl text-sm font-medium leading-6 text-primary/75 sm:text-base sm:leading-7">
            {t('Организуем поездки, трудоустройство и обучение за рубежом с сопровождением на каждом этапе.')}
          </p>
        </div>
      </div>
    </section>
  );
}

export function HeroDirectionButtons() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative z-10 -mt-7 bg-transparent pb-10 sm:-mt-9 sm:pb-12 md:-mt-11 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl pt-6 sm:pt-8"
        >
          <KyrgyzOrnament
            className="pointer-events-none absolute left-1/2 top-0 h-24 w-screen -translate-x-1/2 opacity-90"
            tone="warm"
            variant="directionBorder"
          />

          <div className="relative z-10 grid gap-3 rounded-[1.8rem] border border-white/80 bg-[rgba(255,251,244,0.82)] p-2.5 shadow-[0_24px_60px_rgba(64,77,69,0.12)] backdrop-blur-md sm:grid-cols-3 sm:p-3">
            {heroDirections.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.href)}
                className={`group flex min-h-20 w-full items-center justify-between gap-3 rounded-[1.35rem] px-4 py-4 text-left transition-all hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:translate-y-0 active:scale-[0.98] sm:min-h-24 sm:px-5 ${item.className}`}
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
