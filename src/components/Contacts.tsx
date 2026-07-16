import { Clock3, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

const contactMethods = [
  {
    title: 'Заявки и консультации',
    detail: 'Туризм, обучение, консультации',
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
    title: 'Трудоустройство, курсы и документы',
    detail: 'Языки, подготовка, сопровождение',
    phone: '+996 508 970 047',
    link: 'https://wa.me/996508970047',
  },
];

export default function Contacts() {
  const { t } = useI18n();

  return (
    <section id="контакты" className="overflow-hidden bg-[linear-gradient(145deg,#fffdf8_0%,#f6eee2_48%,#eef8f5_100%)] py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Контакты')}</span>
          </div>
          <h2 className="max-w-4xl text-[clamp(1.7rem,5vw,2.2rem)] font-black leading-tight text-primary">{t('Выберите удобный способ связи')}</h2>
        </div>

        <div className="grid gap-4 overflow-visible md:grid-cols-3">
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
              className={`group flex min-h-36 flex-col justify-between rounded-[1.35rem] border p-4 shadow-[0_14px_38px_rgba(45,65,56,0.06)] transition-all hover:-translate-y-1 sm:p-5 ${
                index === 0
                  ? 'border-[#edc9bc] bg-[#fff6f1] text-[#d84b3e]'
                  : index === 1
                    ? 'border-[#b9ddd3] bg-[#f0f9f6] text-[#137f7b]'
                    : 'border-[#ead49d] bg-[#fff9e8] text-[#a66c17]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#159447]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-black leading-tight text-primary">{t(method.title)}</h3>
                </div>
                <span className="text-[10px] font-black tracking-[0.16em] text-gray-300">0{index + 1}</span>
              </div>
              <div>
                <p className="mb-2 text-xs leading-4 text-gray-500">{t(method.detail)}</p>
                <span className="text-sm font-black text-[#159447] transition-colors group-hover:text-brand">{method.phone}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="soft-lift mt-5 grid overflow-hidden rounded-[1.5rem] border border-[#d8cbb9] bg-white lg:grid-cols-[0.76fr_1.24fr]"
        >
          <div className="flex flex-col justify-between p-4 sm:p-5">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-black text-primary">{t('Офис в Бишкеке')}</h3>
              </div>
              <p className="max-w-sm text-sm leading-5 text-gray-600">{t('Личную консультацию лучше согласовать заранее.')}</p>
            </div>
            <div className="mt-5 space-y-3">
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

          <div className="min-h-[200px] overflow-hidden bg-gray-200 sm:min-h-[220px]">
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
