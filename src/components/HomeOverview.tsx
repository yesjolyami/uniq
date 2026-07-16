import { ArrowRight, BriefcaseBusiness, Building2, CheckCheck, Compass, GraduationCap, Sparkles } from 'lucide-react';
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
  }}