import { useEffect, useState } from 'react';
import { BadgeCheck, BriefcaseBusiness, FileText, Globe2, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

export default function EmploymentPage() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  const employment = content.employment;
  const checklist = [
    t('Вакансия и требования согласованы до подачи'),
    t('Документы проверены перед отправкой'),
    t('Есть план выезда и контакт менеджера'),
  ];

  return (
    <main className="bg-[#fbfcfd] pt-24 sm:pt-28">
      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.35rem] border border-black/[0.05] bg-white">
            <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
              <div className="p-5 sm:p-7 lg:p-8">
                <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {text(employment.intro.eyebrow)}
                </span>
                <h1 className="mb-4 text-[2rem] font-black leading-[1.02] text-primary sm:text-[2.6rem]">
                  {text(employment.intro.title)}
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-gray-600">
                  {text(employment.intro.description)}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {employment.countries.map((country, index) => (
                    <span key={`${country.ru}-${index}`} className="rounded-full border border-black/10 bg-sand px-3 py-1.5 text-xs font-bold text-primary">
                      {text(country)}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-2 sm:max-w-xl">
                  {checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-primary">
                      <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[260px] lg:min-h-[420px]">
                <img src={employment.intro.image} alt={text(employment.intro.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 rounded-[1.15rem] border border-white/20 bg-[#27272a]/70 p-3 text-white backdrop-blur">
                  {[
                    { value: '6', label: t('стран') },
                    { value: '4', label: t('этапа') },
                    { value: '1', label: t('координатор') },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-lg font-black">{item.value}</div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/65">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {employment.advantages.map((item, index) => (
              <motion.article
                key={`${item.title.ru}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.2rem] border border-black/[0.05] bg-white p-5"
              >
                {index === 0 && <ShieldCheck className="mb-4 h-5 w-5 text-brand" />}
                {index === 1 && <FileText className="mb-4 h-5 w-5 text-brand" />}
                {index === 2 && <Globe2 className="mb-4 h-5 w-5 text-brand" />}
                <h2 className="mb-2 text-lg font-black text-primary">{text(item.title)}</h2>
                <p className="text-sm leading-6 text-gray-600">{text(item.text)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[1.2rem] border border-black/[0.06] bg-white p-5">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{text(employment.processTitle)}</span>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {employment.steps.map((step, index) => (
                  <article key={step} className="rounded-[1.1rem] border border-black/[0.05] bg-slate-50 p-4">
                    <BadgeCheck className="mb-4 h-5 w-5 text-brand" />
                    <span className="mb-2 block text-xs font-black text-gray-300">0{index + 1}</span>
                    <p className="text-sm font-bold leading-6 text-primary">{text(step)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.2rem] border border-brand/15 bg-brand-soft/55 p-5">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                  <Stethoscope className="h-5 w-5" />
                </span>
                <h2 className="mb-3 text-xl font-black text-primary">{text(employment.supportTitle)}</h2>
                <div className="grid gap-3">
                  {employment.supportItems.map((item, index) => (
                    <div key={`${item.ru}-${index}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-5 text-primary">
                      {text(item)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-[1.2rem] border border-black/[0.06]">
                <img src="/work.jpg" alt={t('Подготовка к выезду')} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-black/20 p-4 text-white backdrop-blur">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{t('Подготовка к выезду')}</p>
                  <p className="text-sm font-bold leading-5">{t('Разбираем интервью, медосмотр, логистику и документы до отъезда')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand">
            {t('Получить консультацию')}
          </Link>
        </div>
      </section>
    </main>
  );
}
