import { useEffect, useState } from 'react';
import { BookOpenCheck, Globe2, GraduationCap, Languages, NotebookTabs, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

export default function EducationPage() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  const education = content.education;
  const languageBadges = ['English', 'Deutsch', 'Japanese', t('Кыргызский')];

  return (
    <main className="bg-sand-light pt-24 sm:pt-28">
      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.35rem] border border-black/[0.05] bg-white">
            <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
              <div className="p-5 sm:p-7 lg:p-8">
                <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  <GraduationCap className="h-4 w-4" />
                  {text(education.intro.eyebrow)}
                </span>
                <h1 className="mb-4 text-[2rem] font-black leading-[1.02] text-primary sm:text-[2.6rem]">
                  {text(education.intro.title)}
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-gray-600">
                  {text(education.intro.description)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {languageBadges.map((item) => (
                    <span key={item} className="rounded-full border border-brand/15 bg-brand-soft px-3 py-1.5 text-xs font-bold text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[260px] lg:min-h-[420px]">
                <img src={education.intro.image} alt={text(education.intro.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/28 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.15rem] border border-white/40 bg-white/92 p-4 shadow-sm sm:max-w-sm">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t('Формат')}</p>
                  <p className="text-sm font-bold leading-5 text-primary">{t('Языки, туристические профессии и подготовка под конкретную цель')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {education.benefits.map((item, index) => (
              <motion.article
                key={`${item.title.ru}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.2rem] border border-black/[0.05] bg-white p-5"
              >
                {index === 0 && <Languages className="mb-4 h-5 w-5 text-brand" />}
                {index === 1 && <NotebookTabs className="mb-4 h-5 w-5 text-brand" />}
                {index === 2 && <UserRoundCheck className="mb-4 h-5 w-5 text-brand" />}
                <h2 className="mb-2 text-lg font-black text-primary">{text(item.title)}</h2>
                <p className="text-sm leading-6 text-gray-600">{text(item.text)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[200px] overflow-hidden rounded-[1.2rem] border border-black/[0.05]">
                  <img src="/learn.jpg" alt={t('Учебный процесс')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">{t('Занятия')}</p>
                    <p className="mt-1 text-base font-black text-white">{t('Групповой и индивидуальный формат без перегруженной программы')}</p>
                  </div>
                </div>
                <div className="relative min-h-[200px] overflow-hidden rounded-[1.2rem] border border-black/[0.05]">
                  <img src="/learn_germany.jpg" alt={t('Языковая практика')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">{t('Практика')}</p>
                    <p className="mt-1 text-base font-black text-white">{t('Язык, адаптация и прикладные темы под работу и поездки')}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.2rem] border border-black/[0.05] bg-white p-5">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{text(education.formatsTitle)}</span>
                <h2 className="mb-4 text-xl font-black text-primary">{text(education.formatsLead)}</h2>
                <div className="grid gap-3">
                  {education.formats.map((item, index) => (
                    <div key={`${item.ru}-${index}`} className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold leading-5 text-primary">
                      {text(item)}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-black/[0.05] bg-slate-50 p-4">
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-6 text-gray-600">
                    {text(education.note)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-1">
              {education.tracks.map((track, index) => (
                <article key={`${track.title.ru}-${index}`} className={`rounded-[1.2rem] border p-5 ${index === 1 ? 'border-brand/15 bg-brand-soft/55' : index === 2 ? 'border-black/[0.08] bg-[#27272a] text-white' : 'border-black/[0.05] bg-white'}`}>
                  <BookOpenCheck className="mb-4 h-5 w-5 text-brand" />
                  <h2 className={`mb-2 text-lg font-black ${index === 2 ? 'text-white' : 'text-primary'}`}>{text(track.title)}</h2>
                  <p className={`text-sm leading-6 ${index === 2 ? 'text-white/72' : 'text-gray-600'}`}>{text(track.text)}</p>
                </article>
              ))}
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
