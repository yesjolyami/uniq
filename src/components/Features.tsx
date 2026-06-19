import { FileCheck2, Headset, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

const features = [
  {
    icon: ShieldCheck,
    number: '01',
    title: 'Проверка до подачи',
    description: 'Список документов, сроки, слабые места заявки и ответственный менеджер фиксируются заранее.',
  },
  {
    icon: FileCheck2,
    number: '02',
    title: 'Контракт и маршрут',
    description: 'Для работы — контракт и работодатель. Для поездки — маршрут, билеты, проживание и бюджет.',
  },
  {
    icon: Headset,
    number: '03',
    title: 'Связь 24 часа',
    description: 'Клиент знает, кому писать по документам, выезду, заселению, собеседованию или учебной программе.',
  },
];

export default function Features() {
  const { t } = useI18n();

  return (
    <section className="relative z-20 mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:mt-16 lg:px-8">
      <div className="grid overflow-hidden rounded-[1.35rem] border border-black/[0.05] bg-white/90 shadow-sm md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group relative p-6 sm:p-8 md:border-r md:border-black/[0.06] md:last:border-r-0"
          >
            <div className="mb-5 flex items-center justify-between">
              <feature.icon className="h-6 w-6 text-brand" strokeWidth={1.7} />
              <span className="text-[11px] font-black tracking-[0.16em] text-black/20">{feature.number}</span>
            </div>
            <h3 className="mb-2 min-h-6 text-base font-black text-primary">{t(feature.title)}</h3>
            <p className="max-w-xs text-xs leading-5 text-gray-500">{t(feature.description)}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
