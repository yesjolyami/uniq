import { createLocalizedText, type LocalizedText } from './localized';

export type HeroFact = {
  value: string;
  label: LocalizedText;
};

export type HeroContent = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  primaryCta: LocalizedText;
  secondaryCta: LocalizedText;
  whatsappLabel: LocalizedText;
  facts: HeroFact[];
};

export type VideoSlot = {
  title: LocalizedText;
  label: LocalizedText;
  image: string;
  videoUrl: string;
  enabled: boolean;
};

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
};

export type PageIntroContent = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
};

export type ContentCard = {
  title: LocalizedText;
  text: LocalizedText;
};

export type TourismPageContent = {
  intro: PageIntroContent;
  highlights: LocalizedText[];
  benefits: ContentCard[];
  formatsTitle: LocalizedText;
  formatsLead: LocalizedText;
  formats: LocalizedText[];
};

export type EmploymentPageContent = {
  intro: PageIntroContent;
  countries: LocalizedText[];
  advantages: ContentCard[];
  processTitle: LocalizedText;
  steps: LocalizedText[];
  supportTitle: LocalizedText;
  supportItems: LocalizedText[];
};

export type EducationPageContent = {
  intro: PageIntroContent;
  benefits: ContentCard[];
  tracks: ContentCard[];
  formatsTitle: LocalizedText;
  formatsLead: LocalizedText;
  formats: LocalizedText[];
  note: LocalizedText;
};

export type SiteContent = {
  hero: HeroContent;
  videos: VideoSlot[];
  gallery: GalleryImage[];
  tourism: TourismPageContent;
  employment: EmploymentPageContent;
  education: EducationPageContent;
};

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: createLocalizedText('ОсОО «Юник Азия» / Бишкек'),
    title: createLocalizedText('Поездка, учёба или работа за рубежом — без разрозненных подрядчиков'),
    subtitle: createLocalizedText('Туризм, визы, авиабилеты, обучение и легальное трудоустройство с сопровождением до выезда.'),
    primaryCta: createLocalizedText('Оставить заявку'),
    secondaryCta: createLocalizedText('Выбрать услугу'),
    whatsappLabel: createLocalizedText('WhatsApp'),
    facts: [
      { value: '2019', label: createLocalizedText('год начала работы') },
      { value: '6', label: createLocalizedText('стран для трудоустройства') },
      { value: '3', label: createLocalizedText('основных направления') },
    ],
  },
  videos: [
    {
      title: createLocalizedText('О компании за 60 секунд'),
      label: createLocalizedText('Unique Asia'),
      image: '/work.jpg',
      videoUrl: '',
      enabled: true,
    },
    {
      title: createLocalizedText('Как проходит сопровождение'),
      label: createLocalizedText('Туризм / работа / обучение'),
      image: '/tourism.jpg',
      videoUrl: '',
      enabled: true,
    },
  ],
  gallery: [
    { src: '/tourism.jpg', alt: createLocalizedText('Путешествие по горным маршрутам Кыргызстана') },
    { src: '/learn.jpg', alt: createLocalizedText('Участники образовательной программы') },
    { src: '/tourism_germany.jpg', alt: createLocalizedText('Городской тур по Германии') },
    { src: '/work_germany.jpg', alt: createLocalizedText('Групповая поездка с Unique Asia') },
    { src: '/learn_germany.jpg', alt: createLocalizedText('Языковая программа за рубежом') },
    { src: '/work.jpg', alt: createLocalizedText('Сопровождение участников программы') },
  ],
  tourism: {
    intro: {
      eyebrow: createLocalizedText('Туризм'),
      title: createLocalizedText('Туризм как отдельный маршрут с понятной программой поездки'),
      description: createLocalizedText('Собираем поездку под задачу клиента: маршрут, билеты, проживание, документы и понятный бюджет без лишней перегрузки.'),
      image: '/tourism.jpg',
    },
    highlights: [
      createLocalizedText('Маршрут, авиабилеты, отели и визы'),
      createLocalizedText('Поездки по Кыргызстану и за рубеж'),
      createLocalizedText('Гиды, активный отдых и гастрономия'),
    ],
    benefits: [
      {
        title: createLocalizedText('Индивидуальный маршрут'),
        text: createLocalizedText('Подбираем направление, темп поездки и сценарий отдыха под состав группы и бюджет.'),
      },
      {
        title: createLocalizedText('Понятная организация'),
        text: createLocalizedText('Заранее фиксируем проживание, трансферы, документы и ключевые точки маршрута.'),
      },
      {
        title: createLocalizedText('Форматы для групп'),
        text: createLocalizedText('Собираем семейные, корпоративные и авторские поездки с единым координатором.'),
      },
    ],
    formatsTitle: createLocalizedText('Форматы поездок'),
    formatsLead: createLocalizedText('Подбираем формат под цель поездки'),
    formats: [
      createLocalizedText('Семейные поездки и спокойный отдых'),
      createLocalizedText('Групповые выезды и корпоративные маршруты'),
      createLocalizedText('Комбинированные туры с городами и природой'),
      createLocalizedText('Короткие weekend-программы и сезонные сборы'),
    ],
  },
  employment: {
    intro: {
      eyebrow: createLocalizedText('Трудоустройство за рубежом'),
      title: createLocalizedText('Легальная работа с понятными этапами до выезда'),
      description: createLocalizedText('Работаем с проверенными работодателями, помогаем оформить документы и держим связь с клиентом на каждом важном этапе.'),
      image: '/work_germany.jpg',
    },
    countries: [
      createLocalizedText('Япония'),
      createLocalizedText('Германия'),
      createLocalizedText('Словакия'),
      createLocalizedText('Венгрия'),
      createLocalizedText('Эстония'),
      createLocalizedText('Монголия'),
    ],
    advantages: [
      {
        title: createLocalizedText('Легальный процесс'),
        text: createLocalizedText('Работаем только по понятной схеме с документами, подтверждёнными этапами и прозрачным сопровождением.'),
      },
      {
        title: createLocalizedText('Контроль документов'),
        text: createLocalizedText('Проверяем анкеты, договоры, разрешения и список бумаг до подачи и выезда.'),
      },
      {
        title: createLocalizedText('Страны и направления'),
        text: createLocalizedText('Подбираем вакансии и формат переезда под опыт, язык, ожидания по доходу и сроки выезда.'),
      },
    ],
    processTitle: createLocalizedText('Как проходит процесс'),
    steps: [
      createLocalizedText('Поиск работодателя и организация собеседования'),
      createLocalizedText('Разрешение на работу, контракт и анкеты'),
      createLocalizedText('Подача документов, визовая поддержка и страховка'),
      createLocalizedText('Медосмотр, предмиграционная подготовка, логистика и авиабилеты'),
    ],
    supportTitle: createLocalizedText('Что сопровождаем отдельно'),
    supportItems: [
      createLocalizedText('Проверка работодателя и условий контракта'),
      createLocalizedText('Сопровождение по визе и медицинским требованиям'),
      createLocalizedText('Подготовка к собеседованию и выезду'),
      createLocalizedText('Связь с менеджером до отъезда и после прибытия'),
    ],
  },
  education: {
    intro: {
      eyebrow: createLocalizedText('Обучение'),
      title: createLocalizedText('Языки и туристические профессии с понятной программой занятий'),
      description: createLocalizedText('Организуем языковые курсы и обучение для гидов, менеджеров по туризму, бронированию и продаже авиабилетов.'),
      image: '/learn_germany.jpg',
    },
    benefits: [
      {
        title: createLocalizedText('Языковая база'),
        text: createLocalizedText('Подбираем уровень и программу занятий под задачу: учёба, работа, поездка или смена профессии.'),
      },
      {
        title: createLocalizedText('Практическая программа'),
        text: createLocalizedText('Фокусируемся на реальных сценариях: коммуникация, документы, сервис, ориентирование и адаптация.'),
      },
      {
        title: createLocalizedText('Поддержка по траектории'),
        text: createLocalizedText('Помогаем выбрать формат обучения, нагрузку и последовательность модулей без перегруза.'),
      },
    ],
    tracks: [
      {
        title: createLocalizedText('Языковые курсы'),
        text: createLocalizedText('Английский, японский, немецкий и кыргызский язык для учёбы, работы и адаптации.'),
      },
      {
        title: createLocalizedText('Курсы в сфере туризма'),
        text: createLocalizedText('Подготовка гидов, менеджеров по туризму, бронированию и продаже авиабилетов.'),
      },
      {
        title: createLocalizedText('Темы курсов'),
        text: createLocalizedText('Стандарты туризма, экскурсионная деятельность, этика, культура Кыргызстана, география, гастрономия, безопасность и первая медицинская помощь.'),
      },
    ],
    formatsTitle: createLocalizedText('Форматы обучения'),
    formatsLead: createLocalizedText('Собираем программу под темп и цель'),
    formats: [
      createLocalizedText('Индивидуальные и мини-группы'),
      createLocalizedText('Краткосрочные интенсивы'),
      createLocalizedText('Подготовка к поездке и адаптации'),
      createLocalizedText('Программы для туризма и сервиса'),
    ],
    note: createLocalizedText('Подключаем обучение к реальным задачам: поступление, работа с туристами, сервис, сопровождение поездок и уверенная адаптация.'),
  },
};
