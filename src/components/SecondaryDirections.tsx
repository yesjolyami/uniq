import { BriefcaseBusiness, ChevronRight, GraduationCap, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const items = [
  {
    id: 'трудоустройство',
    href: '/employment',
    icon: BriefcaseBusiness,
    title: 'Трудоустройство',
    text: 'Контракт, документы, страховка и подготовка к выезду.',
  },
  {
    id: 'обучение',
    href: '/education',
    icon: GraduationCap,
    title: 'Обучение',
    text: 'Языковые программы и курсы для туризма и международных поездок.',
  },
  {
    id: 'корпоративные поездки',
    href: '/#контакты',
    icon: Handshake,
    title: 'Корпоративные поездки',
    text: 'Командировки, группы, мероприятия и единый координатор.',
  },
];

export default function SecondaryDirections() {
  const { t } = useI18n();

  return (
    <section className="border-b border-black/[0.04] bg-[#fffaf5] py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{t('Вторым планом')}</span>
            <h2 className="text-[clamp(1.4rem,4vw,1.9rem)] font-black leading-tight text-primary">
              {t('Трудоустройство и обучение')}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-5 text-gray-600">
            {t('Дополнительные направления показаны компактно и не перегружают главную страницу.')}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              id={item.id}
              to={item.href}
              className="group scroll-mt-24 flex items-start justify-between gap-3 rounded-[1.1rem] border border-black/[0.05] bg-white px-4 py-3 text-left transition-colors hover:border-brand/25"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-brand">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-primary">{t(item.title)}</h3>
                  <p className="mt-1 text-xs leading-4 text-gray-600">{t(item.text)}</p>
                </div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary/35 transition-colors group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
