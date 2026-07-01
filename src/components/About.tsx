import { Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { companyAwards } from '../data/aboutContent';
import { useI18n } from '../i18n/I18nContext';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="о компании" className="scroll-mt-20 bg-sand-light py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[1.25rem] border border-black/[0.05] bg-white p-4 sm:p-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative min-h-[220px] overflow-hidden rounded-[1.1rem] sm:min-h-[260px]"
          >
            <img src="/work.jpg" alt={t('Участники программы Unique Asia')} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#65483c]/85 via-[#65483c]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
              <p className="max-w-md text-base font-bold leading-relaxed sm:text-lg">
                {t('Туризм, обучение и работа за рубежом требуют одного: чтобы документы, сроки и ответственность были понятны до старта.')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              <Building2 className="h-4 w-4" />
              {t('О компании')}
            </span>
            <h2 className="mb-3 text-[clamp(1.65rem,5vw,2.15rem)] font-black leading-tight text-primary">
              {t('Компания из Бишкека, которая ведёт поездки и документы с 2019 года')}
            </h2>
            <div className="space-y-2 text-sm leading-5 text-gray-600">
              <p>
                {t('Unique Asia с 2019 года организует поездки, образовательные и международные программы, объединяя консультацию, документы и сопровождение в одном процессе.')}
              </p>
            </div>
      
            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {companyAwards.map((award) => (
                <article key={award.title} className="rounded-2xl bg-sand p-3.5 text-primary">
                  <strong className="block text-xl font-black text-[#f5963b]">{t(award.year)}</strong>
                  <h3 className="mt-1.5 text-sm font-black">{t(award.title)}</h3>
                  <p className="mt-1 text-[11px] leading-4 text-gray-600">{t(award.description)}</p>
                </article>
              ))}
            </div>
            <Link to="/company" className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-brand hover:text-brand">
              {t('Подробнее')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
