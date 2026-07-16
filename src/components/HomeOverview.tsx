import { ArrowRight, BriefcaseBusiness, Building2, CheckCheck, Compass, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import KyrgyzOrnament from './KyrgyzOrnament';

const services = [
  {
    icon: Compass,
    title: 'Туризм',
    description: 'Маршруты по миру и Кыргызстану, визы, авиабилеты, отели, индивидуальные и корпоративные поездки.',
    href: '/tourism',
    accent: 'border-[#d84b3e]/15 bg-[linear-gradient(145deg,#fff4ed_0%,#ffffff_72%)] text-[#d84b3e]',
    iconClassName: 'bg-[#d84b3e] text-white',
    number: '01',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Трудоустройство',
    description: 'Легальные программы, проверенные работодатели, контракт до выезда и сопровождение документов.',
    href: '/employment',
    accent: 'border-[#137f7b]/15 bg-[linear-gradient(145deg,#edf9f7_0%,#ffffff_72%)] text-[#137f7b]',
    iconClassName: 'bg-[#137f7b] text-white',
    number: '02',
  },
  {
    icon: GraduationCap,
    title: 'Обучение',
    description: 'Языковые курсы, программы подготовки гидов и менеджеров по туризму, обучение перед выездом.',
    href: '/education',
    accent: 'border-[#e6a23c]/20 bg-[linear-gradient(145deg,#fff8e8_0%,#ffffff_72%)] text-[#b87817]',
    iconClassName: 'bg-[#e6a23c] text-primary',
    number: '03',
  },
];

const trustPoints = [
  'Работаем с 2019 года и сопровождаем частных и корпоративных клиентов.',
  'Собираем поездку, обучение или трудоустройство в один понятный процесс.',
  'Объясняем этапы, сроки и список документов до начала оформления.',
  'Остаёмся на связи во время подготовки, выезда и самой программы.',
];

const extras = [
  'Авиабилеты и отели',
  'Визовые услуги',
  'Медицинский туризм',
  'Конференции и форумы',
  'Корпоративное обслуживание',
  'Поездки по Кыргызстану',
];

export default function HomeOverview() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const scrollToContacts = () => {
    document.getElementById('контакты')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="направления" className="overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#f6faf7_48%,#fff9ef_100%)] py-14 sm:py-18 md:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/10 bg-white/75 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              <Sparkles className="h-4 w-4" />
              {t('Международные возможности')}
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.02] tracking-[-0.04em] text-primary">
              {t('Три направления — один понятный путь')}
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-6 text-gray-600 sm:text-[15px]">
              {t('Выберите цель, а мы соберём документы, маршрут и сопровождение в единую последовательность без лишней бюрократии.')}
            </p>
            <KyrgyzOrnament className="mt-4 h-16 w-full max-w-md opacity-75" tone="mixed" variant="floral" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.07 }}
              className={`group flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[1.65rem] border p-5 shadow-[0_18px_50px_rgba(54,72,63,0.07)] transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_65px_rgba(54,72,63,0.12)] sm:p-6 ${service.accent}`}
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${service.iconClassName}`}>
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-black tracking-[0.2em] opacity-40">{service.number}</span>
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-[-0.025em] text-primary">{t(service.title)}</h3>
                <p className="text-sm leading-6 text-gray-600">{t(service.description)}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(service.href)}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-current/15 bg-white/80 px-4 py-2.5 text-sm font-black transition-all group-hover:gap-3 group-hover:bg-white"
              >
                {t('Подробнее')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="soft-lift relative overflow-hidden rounded-[1.75rem] border border-[#d8cbb9] bg-[linear-gradient(135deg,#fff8ec_0%,#ffffff_50%,#eef8f5_100%)] p-6 sm:p-8"
          >
            <div className="relative max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#137f7b]">
                <Building2 className="h-4 w-4" />
                {t('Unique Asia')}
              </span>
              <h3 className="mb-4 text-[clamp(1.6rem,4vw,2.35rem)] font-black leading-tight tracking-[-0.03em] text-primary">
                {t('Локальная команда в Бишкеке с международной сетью партнёров')}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-gray-600">
                {t('Работаем на стыке туризма, образования и легального трудоустройства, поэтому можем видеть всю задачу целиком — от первого вопроса до прибытия.')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {extras.map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-full px-3 py-2 text-xs font-bold ${
                      index % 3 === 0
                        ? 'bg-[#fff0e9] text-[#b83d32]'
                        : index % 3 === 1
                          ? 'bg-[#eaf7f4] text-[#0d6865]'
                          : 'bg-[#fff5dc] text-[#9a6514]'
                    }`}
                  >
                    {t(item)}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={scrollToContacts}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white shadow-md shadow-cta/15 transition-colors hover:bg-cta-hover"
              >
                {t('Обсудить задачу')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[#137f7b]/15 bg-[#eaf6f2] p-6 sm:p-8"
          >
            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#137f7b]">
                <CheckCheck className="h-4 w-4" />
                {t('Почему нам доверяют')}
              </span>
              <div className="space-y-3">
                {trustPoints.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/90 bg-white/75 p-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#137f7b] text-[11px] font-black text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold leading-5 text-primary/80">{t(item)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
