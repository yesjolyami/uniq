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

export type SiteContent = {
  hero: HeroContent;
  videos: VideoSlot[];
  gallery: GalleryImage[];
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
};
