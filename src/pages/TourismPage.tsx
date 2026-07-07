import { useEffect, useState } from 'react';
import { ArrowRight, Compass, Hotel, MapPin, Plane, ShieldCheck, Sparkles, Users } from 'lucide-react';
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
  const routeSteps = [
    { title: t('Бриф'), text: t('Формируем задачу поездки, состав группы и ожидания по темпу.') },
    { title: t('Подбор'), text: t('Собираем маршрут, билеты, проживание и точки программы.') },
    { title: t('Подтверждение'), text: t('Фиксируем бюджет, документы, логистику и контакт на сопровождение.') },
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
                  <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand">
                    {t('Получить консультацию')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[260px] lg:min-h-[420px]">
                <img src={tourism.intro.image} alt={text(tourism.intro.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:max-w-md sm:grid-cols-2">
                  <div className="rounded-[1.15rem] border border-white/50 bg-white/90 p-4 shadow-sm">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">{t('После консультации')}</p>
                    <p className="text-sm font-bold leading-5 text-primary">{t('Вы получите маршрут, бюджет и список документов')}</p>
                  </div>
                  <div className="rounded-[1.15rem] border border-white/30 bg-[#27272a]/80 p-4 text-white shadow-sm backdrop-blur">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-white/70">{t('Фокус')}</p>
                    <p className="text-sm font-bold leading-5">{t('Не шаблонный тур, а поездка под конкретный сценарий')}</p>
                  </div>
                </div>
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
                {index === 0 && <Compass className="mb-4 h-5 w-5 text-brand" />}
                {index === 1 && <ShieldCheck className="mb-4 h-5 w-5 text-brand" />}
                {index === 2 && <Users className="mb-4 h-5 w-5 text-brand" />}
                <h2 className="mb-2 text-lg font-black text-primary">{text(item.title)}</h2>
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
                <h2 className="text-base font-black text-primary">{t('Как собираем поездку')}</h2>
              </div>
              <div className="grid gap-3">
                {routeSteps.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-black/[0.05] bg-white p-4">
                    <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.14em] text-brand">0{index + 1}</span>
                    <h3 className="mb-1 text-sm font-black text-primary">{item.title}</h3>
                    <p className="text-sm leading-6 text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem]">
                  <img src="/tourism_germany.jpg" alt={t('Городское направление')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{t('Городской сценарий')}</p>
                    <p className="mt-1 text-base font-black text-white">{t('Перелёт, проживание, ритм дня и логистика без перегруза')}</p>
                  </div>
                </div>
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem]">
                  <img src="/hero.png" alt={t('Природное направление')} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27272a]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{t('Природный сценарий')}</p>
                    <p className="mt-1 text-base font-black text-white">{t('Маршруты по регионам, сезонность и активный формат отдыха')}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.15rem] border border-black/[0.05] bg-white p-5">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{text(tourism.formatsTitle)}</span>
                <h2 className="mb-4 text-xl font-black text-primary">{text(tourism.formatsLead)}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tourism.formats.map((item, index) => (
                    <div key={`${item.ru}-${index}`} className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold leading-5 text-primary">
                      {text(item)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.3rem] border border-black/[0.06] bg-[#27272a] p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                  <MapPin className="h-4 w-4" />
                  {t('Что входит в сопровождение')}
                </span>
                <h2 className="max-w-xl text-2xl font-black leading-tight text-white">
                  {t('Помогаем собрать поездку от идеи до выезда без разрозненных подрядчиков')}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Plane, title: t('Авиабилеты и стыковки') },
                  { icon: Hotel, title: t('Отели и размещение') },
                  { icon: Users, title: t('Сценарии для групп') },
                  { icon: Compass, title: t('Маршрут и координация') },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-white backdrop-blur">
                    <item.icon className="mb-3 h-5 w-5 text-brand" />
                    <p className="text-sm font-bold leading-5">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
