import { useEffect, useState } from 'react';
import { BadgeCheck, BriefcaseBusiness, FileText, Globe2, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
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
  const supportIntro = employment.supportIntro ?? defaultSiteContent.employment.supportIntro;
  const supportItems = employment.supportItems ?? defaultSiteContent.employment.supportItems;
  const supportOutro = employment.supportOutro ?? defaultSiteContent.employment.supportOutro;
  const checklist = [
    t('Вакансия и требования согласованы до подачи'),
    t('Документы проверены перед отправкой'),
    t('Есть план выезда и контакт менеджера'),
  ];
  const heroStats = [
    { value: '6', label: t('стран') },
    { value: '4', label: t('этапа') },
    { value: '1', label: t('координатор') },
  ];
  const advantageIcons = [ShieldCheck, FileText, Globe2] as const;
  const supportFeatureIcons = [BriefcaseBusiness, FileText, Globe2, BadgeCheck, Stethoscope, ShieldCheck] as const;

  return (
    <main className="bg-[linear-gradient(180deg,#fcfdfd_0%,#f5f9fc_42%,#ffffff_100%)] pt-24 sm:pt-28">
      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-black/[0.05] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbfd_52%,#eef6fb_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.07)]">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative p-5 sm:p-7 lg:p-9">
                <div className="absolute left-0 top-0 h-28 w-28 rounded-br-[2rem] bg-brand/[0.04]" />
                <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-brand/10 bg-white/80 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand backdrop-blur">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {text(employment.intro.eyebrow)}
                </span>
                <h1 className="relative mb-4 max-w-3xl text-[2rem] font-black leading-[1.02] text-primary sm:text-[2.8rem]">
                  {text(employment.intro.title)}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-[15px]">
                  {text(employment.intro.description)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {employment.countries.map((country, index) => (
                    <span
                      key={`${country.ru}-${index}`}
                      className="rounded-full border border-black/8 bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
                    >
                      {text(country)}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-2.5 sm:max-w-xl">
                  {checklist.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-black/[0.04] bg-white/90 px-4 py-3 text-sm font-semibold text-primary shadow-[0_10px_25px_rgba(15,23,42,0.04)]"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/#контакты"
                    className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
                  >
                    {t('Получить консультацию')}
                  </Link>
                  <Link
                    to="/company"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-brand hover:text-brand"
                  >
                    {t('О компании')}
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[320px] lg:min-h-[520px]">
                <img src={employment.intro.image} alt={text(employment.intro.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,39,42,0.06)_0%,rgba(39,39,42,0.2)_45%,rgba(39,39,42,0.72)_100%)]" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/18 bg-[#101828]/72 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">{t('Маршрут выезда')}</p>
                      <p className="text-base font-black leading-tight">{t('Понятная схема до подписания и до выезда')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {heroStats.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 px-3 py-3 text-center">
                        <div className="text-lg font-black">{item.value}</div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/65">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-5 text-white/75">
                    {t('Сначала фиксируем вакансию, документы и сроки, а потом двигаемся по этапам без хаоса и лишних посредников.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                <ShieldCheck className="h-4 w-4" />
                {t('Что важно до старта')}
              </span>
              <h2 className="text-[clamp(1.7rem,4vw,2.2rem)] font-black leading-tight text-primary">
                {t('Снижаем неопределенность еще до первой подачи')}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-600">
              {t('Делаем процесс предсказуемым: от выбора направления и вакансии до проверки документов, логистики и контакта ответственного менеджера.')}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {employment.advantages.map((item, index) => {
              const Icon = advantageIcons[index] ?? ShieldCheck;

              return (
                <motion.article
                  key={`${item.title.ru}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-[1.3rem] border p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ${
                    index === 1
                      ? 'border-brand/15 bg-[linear-gradient(180deg,#fff8f4_0%,#ffffff_100%)]'
                      : 'border-black/[0.05] bg-white'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/[0.05] bg-slate-50 text-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-black text-primary">{text(item.title)}</h2>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-gray-300">{`0${index + 1}`}</span>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{text(item.text)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.05] bg-[linear-gradient(135deg,#fffaf6_0%,#ffffff_46%,#f7fbff_100%)] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_14px_30px_rgba(230,32,32,0.2)]">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{text(employment.processTitle)}</span>
                    <h2 className="text-2xl font-black text-primary">{t('Как выглядит путь кандидата')}</h2>
                  </div>
                </div>
                <p className="text-sm leading-6 text-gray-600">
                  {t('Каждый этап фиксируем заранее: от подбора вакансии и проверки документов до выезда и сопровождения после старта.')}
                </p>
              </div>
              <p className="max-w-lg text-sm leading-6 text-gray-500">
                {t('Секция вынесена отдельно, чтобы путь кандидата читался как единая линия, а не терялся внутри карточек.')}
              </p>
            </div>

            <div className="-mx-1 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-4 px-1">
                {employment.steps.map((step, index) => (
                  <article
                    key={`${text(step)}-${index}`}
                    className="relative w-[16.5rem] shrink-0 rounded-[1.2rem] border border-black/[0.05] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:w-[17.5rem]"
                  >
                    {index < employment.steps.length - 1 ? (
                      <div className="pointer-events-none absolute left-[calc(100%-0.5rem)] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-brand/50 to-transparent lg:block" />
                    ) : null}
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
                        {`0${index + 1}`}
                      </span>
                      <BadgeCheck className="h-5 w-5 shrink-0 text-brand" />
                    </div>
                    <p className="text-sm font-bold leading-6 text-primary">{text(step)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-[linear-gradient(135deg,#fff8f1_0%,#ffffff_52%,#f5f9fd_100%)] shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#f59e0b]/10 blur-3xl" />
                <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:gap-12 lg:p-10">
                  <div className="flex flex-col justify-between lg:w-[34%] lg:shrink-0">
                    <div>
                      <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff8b68]">
                        <Sparkles className="h-4 w-4" />
                        {text(employment.supportTitle)}
                      </span>
                      <h2 className="max-w-md text-[2rem] font-black leading-[1.03] tracking-[-0.03em] text-primary sm:text-[2.65rem]">
                        {t('Трудоустройство под ключ — от вакансии до выезда')}
                      </h2>
                      <div className="mt-5 flex flex-col gap-2.5">
                        {supportIntro.map((item, index) => (
                          <p key={`${text(item)}-${index}`} className="max-w-md text-sm leading-6 text-gray-600 sm:text-[15px]">
                            {text(item)}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-black/10 pt-5">
                      <p className="text-sm font-semibold leading-6 text-primary">
                        {t('Оставьте нам бюрократию — займитесь мечтой.')}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-500">
                        <span>{t('Один менеджер')}</span>
                        <span>{t('Понятные сроки')}</span>
                        <span>{t('Без лишних посредников')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 lg:flex-1">
                    <div className="mb-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8b68]">{t('В пакет входит')}</p>
                        <p className="mt-1 text-xl font-black text-primary">{t('Всё необходимое для старта')}</p>
                      </div>
                      <Stethoscope className="hidden h-7 w-7 text-primary/15 sm:block" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {supportItems.map((item, index) => {
                        const Icon = supportFeatureIcons[index] ?? BadgeCheck;

                        return (
                          <article
                            key={`${text(item)}-${index}`}
                            className="group basis-full rounded-[1.2rem] border border-black/[0.06] bg-white/75 p-4 transition-colors duration-200 hover:border-brand/30 hover:bg-white sm:basis-[calc(50%-0.375rem)]"
                          >
                            <div className="mb-5 flex items-center justify-between">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff765c] text-white shadow-[0_8px_20px_rgba(255,118,92,0.2)]">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <span className="text-xs font-black text-gray-300">{`0${index + 1}`}</span>
                            </div>
                            <p className="text-sm font-semibold leading-5 text-primary">{text(item)}</p>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="relative border-t border-black/[0.06] px-6 py-4 sm:px-8 lg:px-10">
                  <p className="max-w-4xl text-sm leading-6 text-gray-600">
                    {t('Без беготни по переводчикам, страховщикам и случайным посредникам: пакет собирается внутри одного процесса и под контролем одного ответственного менеджера.')}
                  </p>
                  {supportOutro.length > 0 ? (
                    <p className="mt-1 text-xs font-semibold text-gray-400">
                      {supportOutro.map((item, index) => `${text(item)}${index < supportOutro.length - 1 ? ' ' : ''}`)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="relative min-h-[240px] overflow-hidden rounded-[1.35rem] border border-black/[0.06]">
                <img src={employment.supportImage} alt={t('Подготовка к выезду')} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.22)_35%,rgba(17,24,39,0.78)_100%)]" />
                <div className="absolute bottom-4 left-4 right-4 rounded-[1.2rem] border border-white/15 bg-black/25 p-4 text-white backdrop-blur-md">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{t('Подготовка к выезду')}</p>
                  <p className="text-base font-black leading-6">{t('Разбираем интервью, медосмотр, логистику и документы до отъезда')}</p>
                  <p className="mt-2 max-w-md text-sm leading-5 text-white/78">
                    {t('Кандидат заранее понимает, что брать с собой, как проходит выезд и кто остается на связи в критичных точках маршрута.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.4rem] border border-brand/10 bg-[linear-gradient(135deg,#fff8f3_0%,#ffffff_60%,#f9fbfd_100%)] p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand shadow-sm">
                  {t('Следующий шаг')}
                </span>
                <h2 className="text-2xl font-black leading-tight text-primary sm:text-[2rem]">
                  {t('Если нужен понятный сценарий переезда, начинаем с консультации и проверки исходных данных')}
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
                  {t('Получить консультацию')}
                </Link>
                <Link to="/company" className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-brand hover:text-brand">
                  {t('О компании')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
