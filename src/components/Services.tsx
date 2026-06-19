import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Landmark,
  Languages,
  Link2,
  MapPin,
  MessagesSquare,
  Plane,
  Route,
  Stamp,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { tourPackages } from '../data/servicesContent';
import { useI18n } from '../i18n/I18nContext';

const serviceTabs = [
  {
    id: 'tourism',
    label: 'Туризм',
    eyebrow: 'По миру и по Кыргызстану',
    title: 'Маршрут, билеты, отели и документы собираются в один план',
    description:
      'Подбираем туры, авиабилеты, отели и визовую поддержку для частных клиентов, семей, групп и деловых поездок.',
    icon: MapPin,
    features: ['Поездки по Кыргызстану и за рубеж', 'Индивидуальные туры, отели, билеты и визы', 'Медицинский туризм, конференции и форумы'],
    image: '/tourism.jpg',
  },
  {
    id: 'employment',
    label: 'Трудоустройство',
    eyebrow: 'Легальная работа за рубежом',
    title: 'Работа за рубежом начинается с контракта и проверенных документов',
    description:
      'Помогаем пройти этапы поиска работодателя, собеседования, разрешения на работу, визовой поддержки и подготовки к выезду.',
    icon: BriefcaseBusiness,
    features: ['Япония, Германия, Словакия, Венгрия, Эстония, Монголия', 'Проверенные работодатели и трудовой контракт', 'Документы, страховка, медосмотр, логистика и авиабилеты'],
    image: '/work_germany.jpg',
  },
  {
    id: 'languages',
    label: 'Обучение',
    eyebrow: 'Языки и профессии в туризме',
    title: 'Языки и туристические профессии с понятной программой занятий',
    description:
      'Организуем языковые курсы и обучение для гидов, менеджеров по туризму, бронированию и продаже авиабилетов.',
    icon: Languages,
    features: ['Английский, японский, немецкий и кыргызский языки', 'Курсы гидов и менеджеров по туризму', 'Стандарты туризма, безопасность, культура и первая помощь'],
    image: '/learn_germany.jpg',
  },
];

const serviceCards = [
  { icon: Plane, title: 'Авиабилеты', text: 'Смотрим стыковки, багаж, время прилёта и риски опоздания, а не только минимальную цену.', size: 'md:col-span-2 xl:col-span-1' },
  { icon: Stamp, title: 'Визовые услуги', text: 'Проверяем тип визы, список документов, сроки подачи и слабые места заявки до записи.', size: '' },
  { icon: Hotel, title: 'Бронирование отелей', text: 'Подбираем район, формат проживания и условия отмены под реальный маршрут поездки.', size: '' },
  { icon: HeartPulse, title: 'Медицинский туризм', text: 'Собираем поездку для консультации, лечения или восстановления: клиника, проживание, перевод и дорога.', size: 'md:col-span-2' },
  { icon: Route, title: 'Индивидуальные туры', text: 'Маршрут строится от дат, темпа и состава группы: без лишних остановок ради красивого буклета.', size: '' },
  { icon: MessagesSquare, title: 'Конференции и форумы', text: 'Регистрация, билеты, отели, трансфер и тайминг участников ведутся через одного координатора.', size: '' },
  { icon: BriefcaseBusiness, title: 'Трудоустройство за рубежом', text: 'Страна, работодатель, собеседование, разрешение, контракт, страховка и выезд идут по чек-листу.', size: 'xl:col-span-2' },
  { icon: BookOpenCheck, title: 'Курсы и обучение', text: 'Языки, гиды, менеджеры по туризму и специалисты по бронированию авиабилетов.', size: '' },
  { icon: Handshake, title: 'Корпоративное обслуживание', text: 'Командировки, выставки, incentive-программы, teambuilding, оплата и отчётность для бухгалтерии.', size: '' },
];

const tourismHighlights = [
  'Подбор маршрута, авиабилетов, отелей и виз',
  'Поездки по Кыргызстану: горы, озёра, природа и кочевая культура',
  'Местные гиды, активный отдых, гастрономия и гостеприимство',
  'Индивидуальные туры, медицинский туризм, конференции и форумы',
];

const employmentSteps = [
  'Поиск работодателя и организация собеседования',
  'Разрешение на работу, контракт и анкеты',
  'Подача документов, визовая поддержка и страховка',
  'Медосмотр, предмиграционная подготовка, логистика и авиабилеты',
];

const educationTracks = [
  {
    title: 'Языковые курсы',
    text: 'Английский, японский, немецкий и кыргызский язык для учёбы, работы и адаптации.',
  },
  {
    title: 'Курсы в сфере туризма',
    text: 'Подготовка гидов, менеджеров по туризму, бронированию и продаже авиабилетов.',
  },
];

const corporateBenefits = [
  'Персональный менеджер и приоритетное обслуживание',
  'Подбор вариантов под бюджет и удобная форма оплаты',
  'Отчёты по поездкам, конфиденциальность и связь 24 часа',
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(serviceTabs[0].id);
  const activeService = serviceTabs.find((item) => item.id === activeTab) ?? serviceTabs[0];
  const { t } = useI18n();

  const scrollToForm = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="услуги" className="overflow-hidden border-y border-black/[0.04] bg-[#fbfcfd] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              <FileText className="h-4 w-4" />
              {t('Что реально закрываем')}
            </span>
            <h2 className="text-3xl font-black leading-tight text-primary sm:text-4xl lg:text-[2.75rem]">
              {t('Не набор карточек, а практические задачи клиента')}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-600">
            {t('На сайте оставлены только направления, где у клиента есть конкретный результат: документ, маршрут, контракт, билет, курс или корпоративный отчёт.')}
          </p>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label={t('Категории услуг')}>
          {serviceTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand/30 ${
                activeTab === tab.id
                  ? 'border border-primary bg-primary text-white shadow-sm'
                  : 'border border-black/5 bg-white text-gray-600 hover:text-primary'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {t(tab.label)}
            </button>
          ))}
        </div>

        <div className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid min-h-[440px] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="flex flex-col justify-center p-6 text-primary sm:p-8 lg:p-10">
                <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#f5963b]">
                  {t(activeService.eyebrow)}
                </span>
                <h3 className="mb-4 max-w-xl text-2xl font-black leading-tight sm:text-3xl">
                  {t(activeService.title)}
                </h3>
                <p className="mb-6 max-w-xl text-sm leading-6 text-gray-600">
                  {t(activeService.description)}
                </p>
                <ul className="mb-7 space-y-3">
                  {activeService.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-primary/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {t(feature)}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {t('Оставить заявку')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative min-h-[260px] lg:min-h-full">
                <img
                  src={activeService.image}
                  alt={t(activeService.title)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/30 via-transparent to-transparent lg:bg-none" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/92 p-4 shadow-sm sm:left-auto sm:max-w-xs">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t('После консультации')}</p>
                  <p className="text-sm font-bold leading-6 text-primary">{t('Вы получите список шагов, документов и ориентир по срокам')}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.04 }}
              className="group flex min-h-0 flex-col justify-between rounded-[1.2rem] border border-black/[0.05] bg-white p-6 transition-all hover:border-brand/20 hover:shadow-sm"
            >
              <div>
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-[#f8fafc] text-brand transition-colors group-hover:border-brand/40">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-base font-black text-primary">{t(service.title)}</h3>
                <p className="max-w-xl text-xs leading-5 text-gray-600">{t(service.text)}</p>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-5 inline-flex w-fit items-center gap-2 border-b border-brand/30 pb-1 text-xs font-bold text-brand transition-colors hover:border-primary hover:text-primary"
              >
                {t('Подробнее')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>

        <div id="туризм" className="scroll-mt-24 pt-24">
          <div className="grid gap-10 rounded-[1.35rem] border border-black/[0.05] bg-white p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                <MapPin className="h-4 w-4" />
                {t('Туризм')}
              </span>
              <h3 className="mb-4 text-2xl font-black leading-tight text-primary md:text-3xl">
                {t('Поездки по миру и Кыргызстану без разрозненных задач')}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {t('Берём на себя маршрут, билеты, проживание, визовые вопросы и сопровождение. Для Кыргызстана делаем акцент на природе, культуре, местных гидах и живом опыте страны.')}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {tourismHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-black/[0.04] bg-sand p-4 text-sm font-semibold leading-6 text-primary">
                  <Check className="mb-3 h-4 w-4 text-brand" />
                  {t(item)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="трудоустройство" className="scroll-mt-24 pt-12">
          <div className="grid gap-0 overflow-hidden rounded-[1.35rem] border border-black/[0.05] bg-white text-primary lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[#f7f4ef] p-8 sm:p-10">
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                <BriefcaseBusiness className="h-4 w-4" />
                {t('Трудоустройство за рубежом')}
              </span>
              <h3 className="mb-4 text-2xl font-black leading-tight md:text-3xl">
                {t('Легальная работа с понятными этапами до выезда')}
              </h3>
              <p className="mb-6 text-sm leading-6 text-gray-600">
                {t('Работаем с проверенными работодателями, помогаем оформить документы и держим связь с клиентом на каждом важном этапе.')}
              </p>
              <div className="flex flex-wrap gap-3">
                {['Япония', 'Германия', 'Словакия', 'Венгрия', 'Эстония', 'Монголия'].map((country) => (
                  <span key={country} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-primary">
                    {t(country)}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-0 bg-white text-primary sm:grid-cols-2">
              {employmentSteps.map((step, index) => (
                <article key={step} className="border-b border-black/[0.05] p-7 sm:border-r sm:even:border-r-0">
                  <BadgeCheck className="mb-5 h-5 w-5 text-brand" />
                  <span className="mb-3 block text-xs font-black text-gray-300">0{index + 1}</span>
                  <p className="text-sm font-bold leading-6">{t(step)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div id="обучение" className="scroll-mt-24 pt-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
            {educationTracks.map((track) => (
              <article key={track.title} className="rounded-[1.2rem] border border-black/[0.05] bg-white p-8">
                <GraduationCap className="mb-5 h-6 w-6 text-brand" />
                <h3 className="mb-3 text-xl font-black text-primary">{t(track.title)}</h3>
                <p className="text-sm leading-6 text-gray-600">{t(track.text)}</p>
              </article>
            ))}
            <article className="rounded-[1.2rem] border border-brand/15 bg-brand-soft/55 p-8">
              <BookOpenCheck className="mb-5 h-6 w-6 text-brand" />
              <h3 className="mb-3 text-xl font-black text-primary">{t('Темы курсов')}</h3>
              <p className="text-sm leading-6 text-gray-600">
                {t('Стандарты туризма, экскурсионная деятельность, этика, культура Кыргызстана, география, гастрономия, безопасность и первая медицинская помощь.')}
              </p>
            </article>
          </div>
        </div>

        <div id="корпоративным клиентам" className="scroll-mt-24 pt-12">
          <div className="grid gap-10 rounded-[1.35rem] border border-black/[0.05] bg-white p-8 sm:p-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                <Handshake className="h-4 w-4" />
                {t('Корпоративное обслуживание')}
              </span>
              <h3 className="mb-4 text-2xl font-black leading-tight text-primary md:text-3xl">
                {t('Деловые поездки, мероприятия и отдых для сотрудников')}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {t('Организуем командировки, выставки, конференции, корпоративные мероприятия, teambuilding, incentive-программы и поездки для команд.')}
              </p>
            </div>
            <div className="grid gap-5">
              {corporateBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-black/[0.04] bg-sand p-4 text-sm font-bold leading-6 text-primary">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {t(benefit)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="для иностранцев" className="scroll-mt-24 pt-24">
          <div className="overflow-hidden rounded-[1.35rem] border border-black/[0.05] bg-white">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative overflow-hidden border-r border-gray-200 bg-slate-50 p-8 text-primary sm:p-12 lg:p-14">
                <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white/60 text-brand">
                  <Globe2 className="h-7 w-7" />
                </span>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#f5963b]">
                  {t('Сервис в Кыргызстане')}
                </span>
                <h3 className="mb-5 min-h-[4.8rem] text-3xl font-black leading-tight sm:text-4xl">{t('Для иностранных граждан')}</h3>
                <p className="mb-8 text-sm leading-7 text-gray-600">
                  {t('Помогаем разобраться в документах и банковских процедурах, подготовить заявление и пройти необходимые этапы.')}
                </p>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {t('Получить консультацию')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      icon: FileText,
                      number: '01',
                      title: 'Визовое сопровождение',
                      text: 'Консультация по типу визы, списку документов, срокам и этапам подачи.',
                    },
                    {
                      icon: CreditCard,
                      number: '02',
                      title: 'Mastercard',
                      text: 'Помощь с подготовкой документов и сопровождение при обращении за банковской картой.',
                    },
                    {
                      icon: Link2,
                      number: '03',
                      title: 'Привязка расчётного счёта',
                      text: 'Консультация по реквизитам и подключению расчётного счёта к доступным сервисам.',
                    },
                  ].map((service) => (
                    <article key={service.title} className="group rounded-2xl border border-black/[0.06] bg-sand-light p-5 transition-colors hover:border-brand/25">
                      <div className="mb-8 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-brand">
                          <service.icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-black text-gray-300">{service.number}</span>
                      </div>
                      <h4 className="mb-3 min-h-12 text-base font-black leading-snug text-primary">{t(service.title)}</h4>
                      <p className="text-xs leading-6 text-gray-600">{t(service.text)}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/15 bg-brand-soft/50 p-4">
                  <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-xs leading-5 text-gray-600">
                    {t('Выпуск карты, открытие счёта и доступность отдельных операций определяются банком после проверки документов клиента.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 mt-28 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Ближайшие поездки')}</span>
            <h3 className="text-3xl font-black text-primary md:text-4xl">{t('Готовые турпакеты')}</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-600">{t('Стоимость указана за одного человека. Программу любого тура можно адаптировать под вашу группу.')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {tourPackages.map((tour, index) => (
            <motion.article
              key={tour.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className={`group overflow-hidden rounded-[1.5rem] border bg-white transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,26,24,0.1)] ${
                tour.featured ? 'border-[#f5963b]/60' : 'border-black/[0.06]'
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={tour.image} alt={t(tour.title)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {tour.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    {t('Популярный')}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <MapPin className="h-4 w-4 text-brand" />
                  {t(tour.location)}
                </div>
                <h4 className="mb-5 text-xl font-black text-primary">{t(tour.title)}</h4>
                <div className="mb-5 grid grid-cols-2 gap-3 border-y border-gray-100 py-4 text-xs text-gray-600">
                  <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{t(tour.duration)}</span>
                  <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{t(tour.dates)}</span>
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {tour.tags.map((tag) => <span key={tag} className="rounded-full bg-sand px-3 py-1.5 text-[11px] font-semibold text-gray-600">{t(tag)}</span>)}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-black text-primary">{t(tour.price)}</span>
                  <button type="button" onClick={scrollToForm} aria-label={`${t('Подробнее о туре')} ${t(tour.title)}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/30">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Plane, title: 'Туры за рубеж', text: 'Готовые маршруты и поездки под запрос' },
            { icon: Users, title: 'Для групп', text: 'От 8 человек, единый координатор' },
            { icon: GraduationCap, title: 'Языковые курсы', text: 'Подбор школы, визы и проживание' },
          ].map((item) => (
            <button key={item.title} type="button" onClick={scrollToForm} className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 text-left transition-all hover:border-brand/30 focus:outline-none focus:ring-2 focus:ring-brand/20">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-sand text-brand transition-colors group-hover:bg-brand group-hover:text-white"><item.icon className="h-5 w-5" /></span>
              <span><strong className="mb-1 block text-sm text-primary">{t(item.title)}</strong><span className="text-xs leading-5 text-gray-500">{t(item.text)}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
