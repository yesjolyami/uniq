import { Clock3, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

const contactMethods = [
  {
    title: 'Заявки и консультации',
    detail: 'Туризм, обучение, трудоустройство',
    phone: '+996 508 97-97-47',
    link: 'https://wa.me/996508979747',
  },
  {
    title: 'Авиабилеты и отели',
    detail: 'Бронирование, маршруты, визы',
    phone: '+996 701 979 747',
    link: 'https://wa.me/996701979747',
  },
  {
    title: 'Курсы и документы',
    detail: 'Языки, подготовка, сопровождение',
    phone: '+996 508 970 047',
    link: 'https://wa.me/996508970047',
  },
];

export default function Contacts() {
  const { t } = useI18n();

  return (
    <section id="контакты" className="bg-white py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Контакты')}</span>
          <h2 className="max-w-4xl text-[clamp(2rem,6vw,2.5rem)] font-black leading-tight text-primary md:text-4xl">{t('Выберите удобный способ связи')}</h2>
        </div>

        <div className="grid gap-5 overflow-visible md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.phone}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group flex min-h-44 flex-col justify-between rounded-[1.25rem] border border-gray-200 bg-white p-5 transition-colors hover:bg-slate-50 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-[#159447]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-black tracking-[0.16em] text-gray-300">0{index + 1}</span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-black text-primary">{t(method.title)}</h3>
                <p className="mb-3 text-xs leading-5 text-gray-500">{t(method.detail)}</p>
                <span className="text-base font-black text-[#159447] transition-colors group-hover:text-brand">{method.phone}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid overflow-hidden rounded-[1.25rem] border border-gray-200 bg-slate-50 lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div className="flex flex-col justify-between p-5 sm:p-10">
            <div>
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mb-3 min-h-8 text-2xl font-black text-primary">{t('Офис в Бишкеке')}</h3>
              <p className="max-w-sm text-sm leading-6 text-gray-600">{t('Приходите на личную консультацию. Перед визитом рекомендуем согласовать время.')}</p>
            </div>
            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-3 text-sm font-bold text-primary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {t('г. Бишкек, ул. Московская 164, 720017')}
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>@unique_travel_kg / @unique_job_kg</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {t('Пн–Пт, 10:00–18:00')}
              </div>
            </div>
          </div>

          <div className="min-h-[280px] overflow-hidden bg-gray-200 sm:min-h-[320px]">
            <iframe
              src="https://maps.google.com/maps?q=Moskovskaya%20164,%20Bishkek,%20Kyrgyzstan&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('Расположение офиса Unique Asia')}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
