import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const heroDirections = [
  {
    label: 'Туризм',
    description: 'Подобрать тур',
    href: '/tourism',
    icon: Plane,
    className: 'bg-brand text-white shadow-[0_18px_36px_rgba(230,32,32,0.28)] hover:bg-[#c91616]',
    iconClassName: 'bg-white/18 text-white',
  },
  {
    label: 'Трудоустройство',
    description: 'Хочу работать за рубежом',
    href: '/employment',
    icon: BriefcaseBusiness,
    className: 'bg-primary text-white shadow-[0_18px_36px_rgba(39,39,42,0.22)] hover:bg-primary-light',
    iconClassName: 'bg-white/14 text-white',
  },
  {
    label: 'Обучение',
    description: 'Записаться на языковые курсы',
    href: '/education',
    icon: GraduationCap,
    className: 'bg-[#f5963b] text-primary shadow-[0_18px_36px_rgba(245,150,59,0.28)] hover:bg-[#e88424]',
    iconClassName: 'bg-primary/10 text-primary',
  },
];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-[#f7f4ef] pb-9 pt-18 md:min-h-[58vh] md:items-center md:pb-12 md:pt-20">
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt={t('Путешественники на фоне японского храма')}
          fetchPriority="high"
          className="h-full w-full object-cover object-center brightness-110 contrast-105 saturate-110 md:object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,249,.82)_0%,rgba(255,255,255,.52)_48%,rgba(255,255,255,.88)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,249,.96)_0%,rgba(255,255,255,.76)_42%,rgba(255,255,255,.18)_74%,rgba(255,255,255,.06)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-primary">
          <span className="mb-3 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:mb-4 sm:text-[11px] sm:tracking-[0.16em]">
            <span className="h-px w-8 bg-brand" />
            {t('ОсОО «Юник Азия» / Бишкек')}
          </span>

          <h1 className="mb-4 max-w-3xl text-[2rem] font-black leading-[1.02] sm:text-[2.7rem] lg:text-[3rem]">
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
                className={`group mt-20 flex min-h-20 w-full items-center justify-between gap-3 rounded-[1.35rem] px-4 py-4 text-left transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:translate-y-0 active:scale-[0.98] sm:min-h-24 sm:px-5 ${item.className}`}
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
