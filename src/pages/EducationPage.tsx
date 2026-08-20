import { useEffect, useState } from 'react';
import { BookOpenCheck, Globe2, GraduationCap, Languages, NotebookTabs, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';
import KyrgyzOrnament, { KyrgyzMedallion } from '../components/KyrgyzOrnament';

export default function EducationPage() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const text = (value: Parameters<typeof getLocalizedText>[0]) => (
    typeof value === 'string' ? t(value) : value[locale] || t(value.ru)
  );

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  const education = content.education;
  const languageBadges = [t('Английский'), t('Немецкий'), t('Японский'), t('Кыргыз тили')];

  return (
    <main className="page-canvas pt-24 sm:pt-28">
      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="soft-lift overflow-hidden rounded-[1.7rem] border border-[#ead49d] bg-[linear-gradient(135deg,#fff9e8_0%,#ffffff_56%,#eef8f5_100%)] text-[#a66c17]">
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
                <KyrgyzMedallion
                  className="absolute right-4 top-4 h-24 w-24 opacity-80 drop-shadow-[0_12px_24px_rgba(75,52,38,0.16)] sm:h-28 sm:w-28"
                  tone="mixed"
                  variant="rosette"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <KyrgyzOrnament
            className="mb-5 h-16 w-full max-w-sm opacity-45"
            tone="mixed"
            variant="floral"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {education.benefits.map((item, index) => (
              <motion.article
                key={`${item.title.ru}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-[1.35rem] border p-5 shadow-[0_12px_34px_rgba(45,65,56,0.05)] ${
                  index === 0
                    ? 'border-[#ead49d] bg-[#fff9e8] text-[#a66c17]'
                    : index === 1
                      ? 'border-[#b9ddd3] bg-[#f0f9f6] text-[#137f7b]'
                      : 'border-[#edc9bc] bg-[#fff6f1] text-[#d84b3e]'
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  {index === 0 && <Languages className="h-5 w-5 shrink-0 text-brand" />}
                  {index === 1 && <NotebookTabs className="h-5 w-5 shrink-0 text-brand" />}
                  {index === 2 && <UserRoundCheck className="h-5 w-5 shrink-0 text-brand" />}
                  <h2 className="text-lg font-black text-primary">{text(item.title)}</h2>
                </div>
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
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                      <Globe2 className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-6 text-gray-600">
                      {text(education.note)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-1">
              {education.tracks.map((track, index) => (
                <article key={`${track.title.ru}-${index}`} className={`rounded-[1.3rem] border p-5 ${index === 1 ? 'border-brand/15 bg-brand-soft/70 text-brand' : index === 2 ? 'border-[#b9ddd3] bg-[#e8f6f1] text-[#137f7b]' : 'border-[#ead49d] bg-[#fff9e8] text-[#a66c17]'}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <BookOpenCheck className="h-5 w-5 shrink-0 text-brand" />
                    <h2 className="text-lg font-black text-primary">{text(track.title)}</h2>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{text(track.text)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
            {t('Получить консультацию')}
          </Link>
        </div>
      </section>
    </main>
  );
}
