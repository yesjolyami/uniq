import { ArrowRight, BriefcaseBusiness, Building2, CheckCheck, Compass, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const services = [
  {
    icon: Compass,
    title: 'Туризм',
    description: 'Маршруты по миру и Кыргызстану, визы, авиабилеты, отели, индивидуальные и корпоративные поездки.',
    href: '/tourism',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Трудоустройство',
    description: 'Легальные программы, проверенные работодатели, контракт до выезда и сопровождение документов.',
    href: '/employment',
  },
  {
    icon: GraduationCap,
    title: 'Обучение',
    description: 'Языковые курсы, программы подготовки гидов и менеджеров по туризму, обучение перед выездом.',
    href: '/education',
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#f7f4ef_52%,#ffffff_100%)] py-10 sm:py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(245,150,59,0.12),transparent_58%)]" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 overflow-hidden rounded-[2rem] border border-[#eadfd2] bg-white/88 p-5 shadow-[0_24px_80px_rgba(114,84,71,0.08)] backdrop-blur sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:p-8"
        >
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              {t('О компании')}
            </span>
            <h2 className="max-w-xl text-[clamp(1.8rem,4vw,2.7rem)] font-black leading-[1.02] text-primary">
              {t('Редизайн в теме сайта должен не украшать, а быстрее объяснять, чем именно полезна Unique Asia')}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-primary/72 sm:text-[15px]">
              {t('Unique Asia помогает организовать поездки, обучение и легальное трудоустройство за рубежом с сопровождением на каждом этапе. Консультация, документы, логистика и связь с менеджером собраны в одном месте.')}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Персональный координатор',
              'Прозрачные этапы работы',
              'Проверенные партнёры',
              'Поддержка во время поездки',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-black/5 bg-[#fcfaf7] p-4">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold leading-5 text-primary">{t(item)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-[2rem] border border-black/5 bg-[#221f1c] p-5 text-white shadow-[0_28px_90px_rgba(34,31,28,0.2)] sm:p-7"
          >
            <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f3caa3]">
              <Building2 className="h-4 w-4" />
              {t('Услуги')}
            </span>
            <h3 className="max-w-md text-[clamp(1.6rem,3vw,2.2rem)] font-black leading-tight">
              {t('Три ключевых направления и дополнительные сервисы в одном контуре')}
            </h3>
            <div className="mt-5 grid gap-3">
              {services.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#f3caa3]">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-base font-black">{t(item.title)}</h4>
                        <p className="mt-1 text-sm leading-5 text-white/72">{t(item.description)}</p>
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-[2rem] border border-[#eadfd2] bg-white p-5 sm:p-7"
            >
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                <CheckCheck className="h-4 w-4" />
                {t('Блок доверия')}
              </span>
              <div className="space-y-3">
                {trustPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.25rem] bg-[#fcfaf7] px-4 py-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <CheckCheck className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-primary/78">{t(item)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              className="overflow-hidden rounded-[2rem] border border-[#f1dac7] bg-[linear-gradient(135deg,#fff7ee_0%,#fffdf9_100%)] p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="max-w-md">
                  <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c56d1d]">
                    <Sparkles className="h-4 w-4" />
                    {t('Дополнительно')}
                  </span>
                  <h3 className="text-xl font-black leading-tight text-primary">{t('В пакет также входят сервисы для частных и корпоративных клиентов')}</h3>
                </div>
                <button
                  type="button"
                  onClick={scrollToContacts}
                  className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand"
                >
                  {t('Оставить заявку')}
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {extras.map((item) => (
                  <span key={item} className="rounded-full border border-[#e9d4bf] bg-white/80 px-4 py-2 text-sm font-semibold text-primary/80">
                    {t(item)}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
