export type TeamMember = {
  name: string;
  role: string;
  description: string;
  shortLabel: string;
};

export type CompanyAboutCard = {
  eyebrow: string;
  title: string;
  description: string;
};

export type CompanyDocument = {
  title: string;
  description: string;
  note: string;
  fileUrl: string;
  fileName: string;
};

export type CompanyGalleryCategory = {
  id: string;
  label: string;
  description: string;
};

export type CompanyGalleryImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
  categoryId: string;
  featured?: boolean;
  orientation?: 'landscape' | 'portrait';
};

export const companyHistory = [
  {
    year: '2019',
    title: 'Начало работы',
    description: 'Unique Asia начала деятельность как туристическое агентство. Компания помогала клиентам с организацией поездок, подбором туров, оформлением виз и приобретением авиабилетов.',
  },
  {
    year: '2021',
    title: 'Расширение направлений',
    description: 'В портфеле появились новые образовательные курсы и программы по трудоустройству в Японии и странах Европы.',
  },
  {
    year: '2023',
    title: 'Эксклюзивные поездки',
    description: 'Запустили эксклюзивные авторские туры в Японию и Корею.',
  },
  {
    year: '2026',
    title: 'Новый этап',
    description: 'Развиваем внутренний туризм и социальные проекты, направленные на поддержку молодёжи.',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Сыдыкова Асель Эсеновна',
    role: 'Генеральный директор ОсОО «Юник Азия»',
    description: 'Отвечает за стратегию, качество сервиса и развитие международных направлений.',
    shortLabel: 'АС',
  },
  {
    name: 'Джузбаев Эмиль Темирбекович',
    role: 'Эксперт по туризму и обучению',
    description: 'Разрабатывает туристические программы и курсы для специалистов сферы туризма.',
    shortLabel: 'ЭД',
  },
  {
    name: 'Айдралиева Чолпон Талантбековна',
    role: 'Менеджер по работе с соискателями',
    description: 'Консультирует кандидатов и сопровождает этапы подготовки к трудоустройству.',
    shortLabel: 'ЧА',
  },
  {
    name: 'Султаналиева Асель',
    role: 'Менеджер по работе с Японией',
    description: 'Координирует программы по Японии и помогает клиентам пройти подготовку к выезду.',
    shortLabel: 'АС',
  },
  {
    name: 'Шнайдер Александр',
    role: 'Преподаватель немецкого и английского языков',
    description: 'Готовит студентов к обучению, работе и коммуникации в международной среде.',
    shortLabel: 'АШ',
  },
  {
    name: 'Фридрих Феликс',
    role: 'Преподаватель немецкого языка',
    description: 'Помогает студентам системно развивать разговорные и академические навыки.',
    shortLabel: 'ФФ',
  },
  {
    name: 'Садыбакасова Жылдыз Калыбековна',
    role: 'Преподаватель японского языка',
    description: 'Ведёт языковую подготовку для учебных и рабочих программ в Японии.',
    shortLabel: 'ЖС',
  },
];

export const companyDocuments: CompanyDocument[] = [
  {
    title: 'Регистрационные документы',
    description: 'Официальные реквизиты компании и подтверждение государственной регистрации.',
    note: 'PDF-макет для скачивания',
    fileUrl: '/mock-documents/registration-documents.pdf',
    fileName: 'unique-asia-registration-documents.pdf',
  },
  {
    title: 'Лицензии и разрешения',
    description: 'Мок-лицензии по основным направлениям деятельности компании для демонстрации раздела.',
    note: 'PDF-макет для скачивания',
    fileUrl: '/mock-documents/licenses-and-permits.pdf',
    fileName: 'unique-asia-licenses-and-permits.pdf',
  },
  {
    title: 'Награды и признания',
    description: 'Демонстрационный пакет сертификатов и благодарственных писем в формате мок-документа.',
    note: 'PDF-макет для скачивания',
    fileUrl: '/mock-documents/awards-and-recognition.pdf',
    fileName: 'unique-asia-awards-and-recognition.pdf',
  },
];

export const companyAboutCards: CompanyAboutCard[] = [
  {
    eyebrow: 'Кто мы',
    title: 'Локальная команда с международным фокусом',
    description: 'Unique Asia из Бишкека объединяет туризм, обучение и трудоустройство за рубежом в одном понятном сервисе.',
  },
  {
    eyebrow: 'Как работаем',
    title: 'Собираем маршрут клиента под ключ',
    description: 'Подбираем программу, проверяем документы, объясняем этапы и сопровождаем до поездки, учёбы или выезда на работу.',
  },
  {
    eyebrow: 'Что важно',
    title: 'Делаем сложные процессы спокойнее',
    description: 'Для клиента это означает меньше неопределённости, прозрачные сроки и один ответственный контакт на всём пути.',
  },
];

export const companyGalleryCategories: CompanyGalleryCategory[] = [
  {
    id: 'all',
    label: 'Все фото',
    description: 'Общий обзор направлений, с которыми работает компания.',
  },
  {
    id: 'travel',
    label: 'Поездки',
    description: 'Туры, сопровождение групп и впечатления клиентов в маршрутах.',
  },
  {
    id: 'education',
    label: 'Обучение',
    description: 'Языковые и международные программы, подготовка и адаптация.',
  },
  {
    id: 'team',
    label: 'Команда',
    description: 'Люди и атмосфера, на которых держится сервис Unique Asia.',
  },
];

export const companyGalleryImages: CompanyGalleryImage[] = [
  {
    src: '/work.jpg',
    alt: 'Команда Unique Asia на встрече с клиентами',
    title: 'Работа с клиентами',
    description: 'Показываем процесс сопровождения: консультация, документы и личный контакт.',
    categoryId: 'team',
    featured: true,
    orientation: 'portrait',
  },
  {
    src: '/tourism.jpg',
    alt: 'Туристическая группа в поездке',
    title: 'Групповые маршруты',
    description: 'Организуем поездки с продуманной логистикой и единым координатором.',
    categoryId: 'travel',
    orientation: 'portrait',
  },
  {
    src: '/learn.jpg',
    alt: 'Участники образовательной программы',
    title: 'Подготовка к обучению',
    description: 'Помогаем собрать понятный путь к языковым и академическим программам.',
    categoryId: 'education',
    orientation: 'portrait',
  },
  {
    src: '/work_germany.jpg',
    alt: 'Кандидаты на международную программу трудоустройства',
    title: 'Международные программы',
    description: 'Сопровождаем клиентов на этапах подготовки к выезду и работе за рубежом.',
    categoryId: 'team',
    orientation: 'landscape',
  },
  {
    src: '/tourism_germany.jpg',
    alt: 'Авторский тур с насыщенной программой',
    title: 'Авторские путешествия',
    description: 'Собираем поездки так, чтобы маршрут выглядел цельно и без лишней суеты.',
    categoryId: 'travel',
    featured: true,
    orientation: 'portrait',
  },
  {
    src: '/learn_germany.jpg',
    alt: 'Изучение иностранного языка перед поездкой',
    title: 'Языковая адаптация',
    description: 'Подбираем формат обучения под цели клиента и сроки программы.',
    categoryId: 'education',
    orientation: 'portrait',
  },
  {
    src: '/kyrgyzstan-mountains-hero.png',
    alt: 'Визуальный образ международных возможностей Unique Asia',
    title: 'Масштаб направлений',
    description: 'Работаем на стыке туризма, обучения и международных поездок.',
    categoryId: 'travel',
    orientation: 'landscape',
  },
  {
    src: '/kyrgyzstan-song-kul.png',
    alt: 'Сопровождение и консультация клиентов Unique Asia',
    title: 'Сервис с сопровождением',
    description: 'Остаемся на связи до старта программы, в процессе и после возвращения.',
    categoryId: 'team',
    orientation: 'landscape',
  },
];
