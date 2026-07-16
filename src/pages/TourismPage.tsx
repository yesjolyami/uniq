import { useEffect, useState } from 'react';
import { ArrowRight, Compass, Globe2, Hotel, MapPin, Mountain, Plane, Route, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { siteContentApi } from '../api/siteContent';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types/localized';
import { defaultSiteContent, type SiteContent } from '../types/siteContent';

export default function TourismPage() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);

  useEffect(() => {
    siteContentApi.getPublic().then(setContent).catch(() => undefined);
  }, []);

  const tourism = content.tourism;
  const travelDirections = [
    { ...tourism.routeSteps[0], icon: Mountain, iconClassName: 'bg-emerald-50 text-emerald-700' },
    { ...tourism.routeSteps[1], icon: Globe2, iconClassName: 'bg-sky-50 text-sky-700' },
    { ...tourism.routeSteps[2], icon: Route, iconClassName: 'bg-orange-50 text-orange-700' },
  ];
  const packageItems = [
    { ...tourism.packageItems[0], icon: Plane },
    { ...tourism.packageItems[1], icon: Hotel },
    { ...tourism.packageItems[2], icon: Compass },
    { ...tourism.packageItems[3], icon: Users },
  ];

  return (
    <main className="bg-[#fbfcfd] pt-24 sm:pt-28">
      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.4rem] border border-black/[0.05] bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="flex min-w-0 flex-col justify-center p-5 text-primary sm:p-7 lg:p-8">
                <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  <Plane className="h-4 w-4" />
                  {text(tourism.intro.eyebrow)}
                </span>
                <h1 className="mb-4 text-[2rem] font-black leading-[1.02] sm:text-[2.6rem]">
                  {text(tourism.intro.title)}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-gray-600">
                  {text(tourism.intro.description)}
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                  {tourism.highlights.map((item, index) => (
                    <div key={`${item.ru}-${index}`} className="rounded-2xl bg-sand px-3.5 py-3 text-sm font-semibold leading-5 text-primary">
                      {text(item)}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
                    {t('Получить консультацию')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[260px] lg:min-h-[420px]">
                <img src={tourism.intro.image} alt={text(tourism.intro.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/30 via-transparent to-transparent" />

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {tourism.benefits.map((item, index) => (
              <motion.article
                key={`${item.title.ru}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.2rem] border border-black/[0.05] bg-white p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  {index === 0 && <Compass className="h-5 w-5 shrink-0 text-brand" />}
                  {index === 1 && <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />}
                  {index === 2 && <Users className="h-5 w-5 shrink-0 text-brand" />}
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
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.15rem] border border-black/[0.05] bg-[#fff9f4] p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                <h2 className="text-base font-black text-primary">{text(tourism.routeTitle)}</h2>
              </div>
              <div className="grid gap-3">
                {travelDirections.map((item, index) => (
                  <article
                    key={`${item.title.ru}-${index}`}
                    className="group rounded-2xl border border-black/[0.05] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconClassName}`}>
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="mb-1 text-sm font-black text-primary">{text(item.title)}</h3>
                        <p className="text-sm leading-6 text-gray-600">{text(item.text)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem]">
                  <img src={tourism.cityImage} alt={t('Городское направление')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/55 via-transparent to-transparent" />
                </div>
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem]">
                  <img src={tourism.natureImage} alt={t('Природное направление')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/55 via-transparent to-transparent" />
                </div>
              </div>
              <div className="rounded-[1.15rem] border border-black/[0.05] bg-white p-5">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{text(tourism.formatsTitle)}</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tourism.formats.map((item, index) => (
                    <div key={`${item.ru}-${index}`} className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold leading-5 text-primary">
                      {text(item)}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-black/[0.05] bg-[#fff9f4] p-4">
                  <h3 className="mb-1 text-sm font-black text-primary">{text(tourism.packageNoteTitle)}</h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {text(tourism.packageNoteText)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
