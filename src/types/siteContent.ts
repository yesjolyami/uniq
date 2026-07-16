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
  routeTitle: LocalizedText;
  routeSteps: ContentCard[];
  cityImage: string;
  natureImage: string;
  packageTitle: LocalizedText;
  packageLead: LocalizedText;
  packageItems: ContentCard[];
  packageNoteTitle: LocalizedText;
  packageNoteText: LocalizedText;
};

export type EmploymentPageContent = {
  intro: PageIntroContent;
  countries: LocalizedText[];
  advantages: ContentCard[];
  processTitle: LocalizedText;
  steps: LocalizedText[];
  supportTitle: LocalizedText;
  supportIntro: LocalizedText[];
  supportItems: LocalizedText[];
  supportOutro: LocalizedText[];
  supportImage: string;
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
    eyebrow: createLocalizedText('Путешествие начинается с «Unique Asia»'),
    title: createLocalizedText('Поездка, учёба или работа за рубежом — без разрозненных подрядчиков'),
    subtitle: createLocalizedText('Организуем поездки, трудоустройство и обучение за рубежом с сопровождением на каждом этапе.'),
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
      title: createLocalizedText('Туризм как вдохновение и искусство планирования'),
      description: createLocalizedText('Каждая поездка — это новая история, новый ракурс и новый взгляд на себя. Мы подбираем маршруты, которые заставляют сердце биться чаще и дарят воспоминания на всю жизнь. Мы превращаем хаос маршрутов, виз и билетов в изящную симфонию. Каждая деталь продумана, каждый этап находится под контролем. Вам остаётся только наслаждаться путешествием.'),
      image: '/tourism.jpg',
    },
    highlights: [
      createLocalizedText('Маршрут, авиабилеты, отели и визы'),
      createLocalizedText('Поездки по Кыргызстану и за рубеж'),
      createLocalizedText('Профессиональные гиды, переводчики и сопровождающие'),
    ],
    benefits: [
      {
        title: createLocalizedText('Туры по всему миру'),
        text: createLocalizedText('Туры по всему миру — от идеи до собранного чемодана. Вы называете страну, а мы формируем полный пакет путешествия: перелёт, проживание, трансферы, страховку и экскурсии.'),
      },
      {
        title: createLocalizedText('Туры по Кыргызстану'),
        text: createLocalizedText('Мы предлагаем уникальные туры по нетронутой природе, горным озёрам и местам, связанным с кочевой культурой Кыргызстана. Наши гиды становятся проводниками в мир настоящих легенд, национальных традиций и кыргызского гостеприимства.'),
      },
      {
        title: createLocalizedText('Фокус'),
        text: createLocalizedText('Не шаблонный тур, а поездка под конкретный сценарий: учитываем цель поездки, ритм отдыха, состав группы, бюджет и те впечатления, которые человек действительно хочет получить.'),
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
    routeTitle: createLocalizedText('Выберите своё направление'),
    routeSteps: [
      {
        title: createLocalizedText('Туры по Кыргызстану'),
        text: createLocalizedText('Иссык-Куль, Сон-Куль, горные ущелья и кочевая культура — готовые и индивидуальные маршруты по стране.'),
      },
      {
        title: createLocalizedText('Туры за рубеж'),
        text: createLocalizedText('Пляжный отдых, яркие города и насыщенные экскурсионные программы в странах Азии, Европы и не только.'),
      },
      {
        title: createLocalizedText('Авторские путешествия'),
        text: createLocalizedText('Создадим маршрут под ваши даты, интересы, состав компании и комфортный бюджет — без шаблонных решений.'),
      },
    ],
    cityImage: '/tourism_germany.jpg',
    natureImage: '/hero.png',
    packageTitle: createLocalizedText('Поездка собирается как цельный маршрут, а не набор случайных бронирований'),
    packageLead: createLocalizedText('Мы соединяем логистику, проживание, впечатления и сопровождение в одну внятную программу, которая выглядит аккуратно и ощущается спокойно ещё до выезда.'),
    packageItems: [
      { title: createLocalizedText('Перелёт и логистика'), text: createLocalizedText('Подбираем авиабилеты, стыковки, трансферы и темп маршрута без лишних пересадок и случайных решений.') },
      { title: createLocalizedText('Проживание и комфорт'), text: createLocalizedText('Собираем размещение под сценарий поездки: городской ритм, семейный отдых, природа или групповая программа.') },
      { title: createLocalizedText('Маршрут и впечатления'), text: createLocalizedText('Формируем программу с экскурсиями, природными точками, локальными локациями и временем на отдых.') },
      { title: createLocalizedText('Сопровождение группы'), text: createLocalizedText('Подключаем координатора, гидов, переводчиков и организацию групповых выездов, если это нужно формату поездки.') },
    ],
    packageNoteTitle: createLocalizedText('Организация под ключ'),
    packageNoteText: createLocalizedText('Все этапы и расходы прозрачны. Организация поездки выполняется под ключ.'),
  },
  employment: {
    intro: {
      eyebrow: createLocalizedText('Трудоустройство за рубежом'),
      title: createLocalizedText('Легальная работа или обучение за рубежом с понятными этапами до выезда'),
      description: createLocalizedText('Трудоустройство под ключ. Оставьте нам бюрократию — займитесь мечтой.'),
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
    supportTitle: createLocalizedText('В пакет входит'),
    supportIntro: [
      createLocalizedText('Трудоустройство под ключ.'),
      createLocalizedText('Оставьте нам бюрократию — займитесь мечтой.'),
    ],
    supportItems: [
      createLocalizedText('Поиск подходящей вакансии и организация собеседования'),
      createLocalizedText('Визовая поддержка: заполнение анкет, подготовка документов и сопровождение при обращении в посольство'),
      createLocalizedText('Перевод дипломов и паспортов с нотариальным заверением'),
      createLocalizedText('Языковые курсы перед выездом'),
      createLocalizedText('Организация медицинского осмотра'),
      createLocalizedText('Оформление медицинской страховки'),
      createLocalizedText('Подбор и приобретение авиабилетов с выгодными стыковками и бонусами'),
      createLocalizedText('Предвыездная миграционная подготовка: законы, обычаи и особенности быта в стране назначения'),
    ],
    supportOutro: [
      createLocalizedText('Всё это — в одной компании. Никакой беготни по городу.'),
      createLocalizedText('Просто скажите нам «да», и мы запустим процесс.'),
    ],
    supportImage: '/work.jpg',
  },
  education: {
    intro: {
      eyebrow: createLocalizedText('Обучение'),
      title: createLocalizedText('Обучение языкам и туристическим профессиям с понятной программой занятий и получением сертификата.'),
      description: createLocalizedText('Наши курсы — это не просто уроки. Организуем языковые курсы и обучение для гидов, менеджеров по туризму, бронированию и продаже авиабилетов по эффективным программам.'),
      image: '/learn_germany.jpg',
    },
    benefits: [
      {
        title: createLocalizedText('Языковые курсы'),
        text: createLocalizedText('Изучение иностранных языков даёт колоссальные преимущества: это образование, международный опыт, свобода общения и новые карьерные перспективы.'),
      },
      {
        title: createLocalizedText('Изучение языков и развитие мышления'),
        text: createLocalizedText('Кроме того, изучение языков является отличным тренажёром для мозга. Знание иностранных языков меняет не только мировоззрение человека, но и помогает развивать память, внимание и мышление.'),
      },
      {
        title: createLocalizedText('Особенность обучения в компании «Юник Азия»'),
        text: createLocalizedText('Главная особенность обучения в компании «Юник Азия» заключается в том, что языковые курсы комбинируются с другими направлениями деятельности компании.'),
      },
    ],
    tracks: [
      {
        title: createLocalizedText('Курсы в сфере туризма'),
        text: createLocalizedText('Это направление является уникальным проектом компании, поскольку ранее аналогичного комплексного подхода к обучению специалистов туристической сферы в Кыргызстане не было.'),
      },
      {
        title: createLocalizedText('Почему это важно'),
        text: createLocalizedText('Кыргызстан ежегодно привлекает тысячи иностранных туристов. Международные издания и туристические платформы регулярно включают страну в подборки рекомендуемых направлений для путешествий. Развитие туристической отрасли создаёт спрос на квалифицированных специалистов, которые знают иностранные языки, понимают особенности работы с туристами и умеют профессионально организовывать поездки.'),
      },
      {
        title: createLocalizedText('Направления подготовки'),
        text: createLocalizedText('Компания «Юник Азия» предлагает обучение по трём основным направлениям: • Подготовка менеджеров по туризму • Подготовка гидов • Подготовка менеджеров по бронированию и продаже авиабилетов'),
      },
    ],
    formatsTitle: createLocalizedText('Какие языки мы преподаём'),
    formatsLead: createLocalizedText('Вы можете изучать язык для конкретной цели — туристической поездки, учёбы, работы, адаптации или трудоустройства за границей.'),
    formats: [
      createLocalizedText('Английский язык'),
      createLocalizedText('Японский язык'),
      createLocalizedText('Немецкий язык'),
      createLocalizedText('Кыргызский язык'),
    ],
    note: createLocalizedText('Подготовка гидов, менеджеров по туризму, а также специалистов по бронированию и продаже авиабилетов.'),
  },
};
