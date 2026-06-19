export type TourPackage = {
  title: string;
  location: string;
  duration: string;
  dates: string;
  price: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  category: 'Туризм' | 'Обучение' | 'Компания';
  date: string;
  image: string;
  published: boolean;
  order: number;
};

export const tourPackages: TourPackage[] = [
  {
    title: 'Иссык-Куль: перезагрузка',
    location: 'Иссык-Куль',
    duration: '4 дня / 3 ночи',
    dates: 'Каждый четверг',
    price: 'от 18 900 сом',
    image: '/tourism.jpg',
    tags: ['Отель', 'Трансфер', 'Экскурсии'],
    featured: true,
  },
  {
    title: 'Сон-Куль и кочевая культура',
    location: 'Нарынская область',
    duration: '3 дня / 2 ночи',
    dates: '14–16 и 28–30 июня',
    price: 'от 15 500 сом',
    image: '/hero.png',
    tags: ['Юрты', 'Питание', 'Гид'],
  },
  {
    title: 'Южный маршрут',
    location: 'Ош — Арсланбоб',
    duration: '5 дней / 4 ночи',
    dates: 'По запросу',
    price: 'от 29 900 сом',
    image: '/cta.png',
    tags: ['Авиаперелёт', 'Отель', 'Маршрут'],
  },
];

// Для обновления ленты измените данные ниже. Элементы с published: false
// не отображаются на сайте, а order управляет порядком публикаций.
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Открыта запись на летние туры по Кыргызстану',
    excerpt: 'Собрали короткие маршруты для семей, компаний и индивидуальных путешественников.',
    category: 'Туризм',
    date: '2026-06-08',
    image: '/tourism.jpg',
    published: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Новый набор на языковые курсы в Германии',
    excerpt: 'Программы от двух недель до учебного года с подбором школы и визовым сопровождением.',
    category: 'Обучение',
    date: '2026-05-27',
    image: '/learn_germany.jpg',
    published: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Групповая поездка в Японию: осенний сезон',
    excerpt: 'Маршрут Токио — Киото — Осака, небольшая группа и русскоязычный координатор.',
    category: 'Туризм',
    date: '2026-05-14',
    image: '/tourism_germany.jpg',
    published: true,
    order: 3,
  },
  {
    id: 4,
    title: 'Unique Asia расширяет консультационную команду',
    excerpt: 'Теперь больше встреч доступно в вечернее время и по видеосвязи.',
    category: 'Компания',
    date: '2026-04-30',
    image: '/work.jpg',
    published: true,
    order: 4,
  },
];

export const galleryImages = [
  { src: '/tourism.jpg', alt: 'Путешествие по горным маршрутам Кыргызстана' },
  { src: '/learn.jpg', alt: 'Участники образовательной программы' },
  { src: '/tourism_germany.jpg', alt: 'Городской тур по Германии' },
  { src: '/work_germany.jpg', alt: 'Групповая поездка с Unique Asia' },
  { src: '/learn_germany.jpg', alt: 'Языковая программа за рубежом' },
  { src: '/work.jpg', alt: 'Сопровождение участников программы' },
];
