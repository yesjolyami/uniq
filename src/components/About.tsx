import { Award, Building2, CheckCircle2, FileCheck2, Quote, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { companyAwards, companyDocuments, companyHistory, teamMembers } from '../data/aboutContent';
import { useI18n } from '../i18n/I18nContext';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="о компании" className="scroll-mt-20 bg-sand-light py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative min-h-[380px] overflow-hidden rounded-[1.35rem]"
          >
            <img src="/work.jpg" alt={t('Участники программы Unique Asia')} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#65483c]/85 via-[#65483c]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-10">
              <Quote className="mb-4 h-8 w-8 text-[#f5963b]" />
              <p className="max-w-md text-lg font-bold leading-relaxed sm:text-xl">
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
            <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              <Building2 className="h-4 w-4" />
              {t('О компании')}
            </span>
            <h2 className="mb-5 text-3xl font-black leading-tight text-primary sm:text-4xl">
              {t('Компания из Бишкека, которая ведёт поездки и документы с 2019 года')}
            </h2>
            <div className="space-y-3 text-sm leading-6 text-gray-600">
              <p>
                {t('Unique Asia — компания из Бишкека, которая с 2019 года организует туристические, образовательные и международные программы.')}
              </p>
              <p>
                {t('Мы помогаем частным и корпоративным клиентам экономить время: объединяем консультацию, подбор программы, документы и сопровождение в одном месте. Клиент заранее понимает этапы, сроки и стоимость.')}
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                'Ответственный менеджер',
                'Фиксированные этапы работы',
                'Проверенные партнёры',
                'Конфиденциальность данных',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-primary">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                  {t(item)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <div className="mb-10 max-w-2xl">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Как мы развивались')}</span>
            <h3 className="text-2xl font-black text-primary md:text-3xl">{t('История компании')}</h3>
          </div>
          <div className="relative grid gap-0 overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white md:grid-cols-2 lg:grid-cols-4">
            {companyHistory.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06 }}
                className="relative p-7 md:border-r md:border-black/[0.06] md:even:border-r-0 lg:even:border-r lg:last:border-r-0"
              >
                <span className="mb-5 block text-3xl font-black text-brand">{item.year}</span>
                <h4 className="mb-3 text-lg font-black text-primary">{t(item.title)}</h4>
                <p className="text-sm leading-6 text-gray-600">{t(item.description)}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                <Users className="h-4 w-4" />
                {t('Люди, которые рядом')}
              </span>
              <h3 className="text-2xl font-black text-primary md:text-3xl">{t('Наша команда')}</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-600">
              {t('Специалисты по туризму, образованию и сопровождению работают как единая команда.')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[1.2rem] border border-gray-200 bg-slate-50 p-7 text-primary"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white text-lg font-black text-[#f5963b] shadow-sm transition-colors group-hover:bg-brand group-hover:text-white">
                    {member.shortLabel}
                  </span>
                  <Users className="h-6 w-6 text-primary/20" />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f5963b]">{t(member.role)}</p>
                <h4 className="mb-3 text-xl font-black">{t(member.name)}</h4>
                <p className="text-sm leading-6 text-gray-600">{t(member.description)}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.35rem] border border-black/[0.06] bg-white p-8 sm:p-10">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-brand/20 bg-brand-soft text-brand">
              <FileCheck2 className="h-6 w-6" />
            </span>
            <h3 className="mb-6 min-h-14 text-2xl font-black text-primary">{t('Лицензии и документы')}</h3>
            <div className="space-y-4">
              {companyDocuments.map((document) => (
                <article key={document.title} className="border-t border-black/[0.06] pt-5 first:border-0 first:pt-0">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <h4 className="mb-2 text-sm font-black text-primary">{t(document.title)}</h4>
                      <p className="mb-3 text-xs leading-5 text-gray-500">{t(document.description)}</p>
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">{t(document.note)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-gray-200 bg-slate-50 p-8 text-primary sm:p-10">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-brand shadow-sm">
              <Award className="h-6 w-6" />
            </span>
            <h3 className="mb-6 min-h-14 text-2xl font-black">{t('Награды и достижения')}</h3>
            <div className="space-y-4">
              {companyAwards.map((award) => (
                <article key={award.title} className="grid grid-cols-[80px_1fr] gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                  <strong className="text-xl font-black text-[#f5963b]">{t(award.year)}</strong>
                  <div>
                    <h4 className="mb-1 text-sm font-black">{t(award.title)}</h4>
                    <p className="text-xs leading-5 text-gray-600">{t(award.description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
