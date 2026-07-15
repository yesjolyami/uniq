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
  const packageItems = [
    {
      icon: Plane,
      title: t('Перелёт и логистика'),
      text: t('Подбираем авиабилеты, стыковки, трансферы и темп маршрута без лишних пересадок и случайных решений.'),
    },
    {
      icon: Hotel,
      title: t('Проживание и комфорт'),
      text: t('Собираем размещение под сценарий поездки: городской ритм, семейный отдых, природа или групповая программа.'),
    },
    {
      icon: Compass,
      title: t('Маршрут и впечатления'),
      text: t('Формируем программу с экскурсиями, природными точками, локальными локациями и временем на отдых.'),
    },
    {
      icon: Users,
      title: t('Сопровождение группы'),
      text: t('Подключаем координатора, гидов, переводчиков и организацию групповых выездов, если это нужно формату поездки.'),
    },
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
                  <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]  px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0284c7]">
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
                </div>
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.15rem]">
                  <img src="/hero.png" alt={t('Природное направление')} className="absolute inset-0 h-full w-full object-cover" />
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
                  <h3 className="mb-1 text-sm font-black text-primary">{t('Организация под ключ')}</h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {t('Все этапы и расходы прозрачны. Организация поездки выполняется под ключ.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-black/[0.06] bg-[linear-gradient(135deg,#fff8f1_0%,#ffffff_42%,#f6f9fc_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative overflow-hidden p-5 sm:p-6 lg:p-8">
                <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-brand/8 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#f5963b]/10 blur-3xl" />
                <div className="relative">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/12 bg-white/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand shadow-sm">
                    <MapPin className="h-4 w-4" />
                    {t('В пакет входит')}
                  </span>
                  <h2 className="max-w-xl text-[1.9rem] font-black leading-[1.04] text-primary sm:text-[2.25rem]">
                    {t('Поездка собирается как цельный маршрут, а не набор случайных бронирований')}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-[15px]">
                    {t('Мы соединяем логистику, проживание, впечатления и сопровождение в одну внятную программу, которая выглядит аккуратно и ощущается спокойно ещё до выезда.')}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {tourism.highlights.map((item, index) => (
                      <div key={`${item.ru}-${index}`} className="rounded-[1.15rem] border border-black/[0.05] bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                        <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-brand">
                          0{index + 1}
                        </span>
                        <p className="text-sm font-semibold leading-5 text-primary">{text(item)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-black/[0.05] bg-white/70 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {packageItems.map((item) => (
                    <article
                      key={item.title}
                      className="group rounded-[1.3rem] border border-black/[0.05] bg-[#fcfaf7] p-4 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-black text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.3rem] border border-dashed border-brand/20 bg-brand/[0.03] p-4 sm:p-5">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                    {text(tourism.formatsTitle)}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {text(tourism.formatsLead)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tourism.formats.map((item, index) => (
                      <span
                        key={`${item.ru}-${index}`}
                        className="rounded-full border border-black/[0.05] bg-white px-3.5 py-2 text-xs font-bold text-primary shadow-sm"
                      >
                        {text(item)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
