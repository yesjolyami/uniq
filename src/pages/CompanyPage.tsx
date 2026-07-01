import { Award, Building2, CheckCircle2, FileCheck2, Quote, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { companyAwards, companyDocuments, companyHistory, teamMembers } from '../data/aboutContent';
import { useI18n } from '../i18n/I18nContext';

export default function CompanyPage() {
  const { t } = useI18n();

  return (
    <main className="bg-sand-light pt-24 sm:pt-28">
      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[1.4rem] border border-black/[0.05] bg-white p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="relative min-h-[260px] overflow-hidden rounded-[1.2rem] sm:min-h-[320px] lg:h-full">
              <img src="/work.jpg" alt={t('Участники программы Unique Asia')} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#65483c]/85 via-[#65483c]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <Quote className="mb-3 h-7 w-7 text-[#f5963b]" />
                <p className="max-w-md text-lg font-bold leading-relaxed">
                  {t('Туризм, обучение и работа за рубежом требуют одного: чтобы документы, сроки и ответственность были понятны до старта.')}
                </p>
              </div>
            </div>

            <div className="text-primary">
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                <Building2 className="h-4 w-4" />
                {t('О компании')}
              </span>
              <h1 className="mb-4 text-[clamp(1.8rem,5vw,2.7rem)] font-black leading-tight">
                {t('Компания из Бишкека, которая ведёт поездки и документы с 2019 года')}
              </h1>
              <div className="space-y-3 text-sm leading-6 text-gray-600">
                <p>{t('Unique Asia — компания из Бишкека, которая с 2019 года организует туристические, образовательные и международные программы.')}</p>
                <p>{t('Мы помогаем частным и корпоративным клиентам экономить время: объединяем консультацию, подбор программы, документы и сопровождение в одном месте. Клиент заранее понимает этапы, сроки и стоимость.')}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Ответственный менеджер',
                  'Фиксированные этапы работы',
                  'Проверенные партнёры',
                  'Конфиденциальность данных',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 max-w-2xl">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Как мы развивались')}</span>
            <h2 className="text-2xl font-black text-primary md:text-3xl">{t('История компании')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {companyHistory.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[1.2rem] border border-black/[0.06] bg-white p-5"
              >
                <span className="mb-4 block text-3xl font-black text-brand">{item.year}</span>
                <h3 className="mb-2 text-lg font-black text-primary">{t(item.title)}</h3>
                <p className="text-sm leading-6 text-gray-600">{t(item.description)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                <Users className="h-4 w-4" />
                {t('Люди, которые рядом')}
              </span>
              <h2 className="text-2xl font-black text-primary md:text-3xl">{t('Наша команда')}</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-600">{t('Специалисты по туризму, образованию и сопровождению работают как единая команда.')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.04 }}
                className="rounded-[1.2rem] border border-gray-200 bg-white p-5"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-sand text-sm font-black text-[#f5963b]">
                    {member.shortLabel}
                  </span>
                  <Users className="h-5 w-5 text-primary/20" />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f5963b]">{t(member.role)}</p>
                <h3 className="mb-2 text-lg font-black text-primary">{t(member.name)}</h3>
                <p className="text-sm leading-6 text-gray-600">{t(member.description)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[1.25rem] border border-black/[0.06] bg-white p-5 sm:p-7">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-brand/20 bg-brand-soft text-brand">
              <FileCheck2 className="h-6 w-6" />
            </span>
            <h2 className="mb-5 text-2xl font-black text-primary">{t('Лицензии и документы')}</h2>
            <div className="space-y-4">
              {companyDocuments.map((document) => (
                <article key={document.title} className="border-t border-black/[0.06] pt-4 first:border-0 first:pt-0">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <h3 className="mb-1.5 text-sm font-black text-primary">{t(document.title)}</h3>
                      <p className="mb-2 text-xs leading-5 text-gray-500">{t(document.description)}</p>
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">{t(document.note)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="awards" className="rounded-[1.25rem] border border-gray-200 bg-white p-5 sm:p-7">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-sand text-brand">
              <Award className="h-6 w-6" />
            </span>
            <h2 className="mb-5 text-2xl font-black text-primary">{t('Награды и достижения')}</h2>
            <div className="space-y-4">
              {companyAwards.map((award) => (
                <article key={award.title} className="grid gap-2 border-b border-primary/10 pb-4 last:border-0 last:pb-0 min-[420px]:grid-cols-[80px_1fr] min-[420px]:gap-4">
                  <strong className="text-xl font-black text-[#f5963b]">{t(award.year)}</strong>
                  <div>
                    <h3 className="mb-1 text-sm font-black text-primary">{t(award.title)}</h3>
                    <p className="text-xs leading-5 text-gray-600">{t(award.description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand">
            {t('Связаться с нами')}
          </Link>
        </div>
      </section>
    </main>
  );
}
