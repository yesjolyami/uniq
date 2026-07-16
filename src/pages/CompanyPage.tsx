import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Building2, CheckCircle2, Download, FileCheck2, ImageUp, Quote, ShieldCheck, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { companyAboutCards, companyDocuments, companyGalleryCategories, companyGalleryImages, companyHistory } from '../data/aboutContent';
import { useI18n } from '../i18n/I18nContext';
import KyrgyzOrnament, { KyrgyzMedallion } from '../components/KyrgyzOrnament';

export default function CompanyPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleImages = useMemo(() => {
    if (activeCategory === 'all') {
      return companyGalleryImages;
    }

    return companyGalleryImages.filter((image) => image.categoryId === activeCategory);
  }, [activeCategory]);

  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex] ?? null;

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current + 1) % visibleImages.length;
        });
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current - 1 + visibleImages.length) % visibleImages.length;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, visibleImages.length]);

  const showPreviousImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current - 1 + visibleImages.length) % visibleImages.length;
    });
  };

  const showNextImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current + 1) % visibleImages.length;
    });
  };

  return (
    <main className="page-canvas pt-24 sm:pt-28">
      <section className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="soft-lift grid gap-6 rounded-[1.7rem] border border-[#e7c9b7] bg-[linear-gradient(135deg,#fff7ef_0%,#ffffff_52%,#edf8f5_100%)] p-5 text-brand sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="relative min-h-[260px] overflow-hidden rounded-[1.2rem] sm:min-h-[320px] lg:h-full">
              <img src="/work.jpg" alt={t('Участники программы Unique Asia')} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#65483c]/85 via-[#65483c]/10 to-transparent" />
              <KyrgyzMedallion
                className="absolute right-4 top-4 h-24 w-24 opacity-80 drop-shadow-[0_12px_24px_rgba(75,52,38,0.18)]"
                tone="warm"
                variant="rosette"
              />
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
              <h1 className="mb-4 text-[clamp(1.8rem,5vw,2.1rem)] font-black leading-tight">
                {t('Unique Asia — компания из Бишкека, которая с 2019 года организует туристические, образовательные и международные программы.')}
              </h1>
              <div className="space-y-3 text-sm leading-6 text-gray-600">
                <p>{t('Мы помогаем частным и корпоративным клиентам экономить время: объединяем консультацию, подбор программы, оформление документов и сопровождение в одном месте.')}</p>
                <p>{t('Клиент заранее понимает этапы работы, сроки и стоимость услуг.')}</p>
                <p>{t('Компания «Юник Азия» — лицензированный партнёр, который работает на стыке туризма, образования и трудовой миграции.')}</p>
                <p>{t('Нас выбрали уже сотни частных клиентов и компаний, потому что мы предоставляем гарантии, подкреплённые документами.')}</p>
                <p>{t('Наша работа — высококачественное обслуживание клиентов по всем направлениям деятельности компании.')}</p>
                <p>{t('Наша цель — сделать ваше путешествие, поездку, обучение или трудовую миграцию приятными, запоминающимися и плодотворными.')}</p>
                <p><strong>{t('Дата создания компании: 06.08.2019.')}</strong></p>
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
          <KyrgyzOrnament
            className="mb-5 h-16 w-full max-w-sm opacity-40"
            tone="warm"
            variant="palmette"
          />
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

      <section id="docs" className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[1.25rem] border border-black/[0.06] bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-brand-soft text-brand">
                <FileCheck2 className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-black text-primary">{t('Лицензии и документы')}</h2>
            </div>
            <div className="space-y-4">
              {companyDocuments.map((document) => (
                <article key={document.title} className="border-t border-black/[0.06] pt-4 first:border-0 first:pt-0">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div className="flex-1">
                      <h3 className="mb-1.5 text-sm font-black text-primary">{t(document.title)}</h3>
                      <p className="mb-3 text-xs leading-5 text-gray-500">{t(document.description)}</p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">{t(document.note)}</span>
                        <a
                          href={document.fileUrl}
                          download={document.fileName}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
                          aria-label={t(`Скачать ${document.title}`)}
                        >
                          <Download className="h-4 w-4" aria-hidden="true" />
                          {t('Скачать')}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="awards" className="rounded-[1.25rem] border border-gray-200 bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-sand text-brand">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <h2 className="mb-2 text-2xl font-black text-primary">{t('Коротко о нас')}</h2>
                <p className="max-w-xl text-sm leading-6 text-gray-600">
                  {t('Не про цифры, а про то, как мы выстраиваем работу с клиентом и за что нас выбирают.')}
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {companyAboutCards.map((card, index) => (
                <article
                  key={card.title}
                  className="rounded-[1.1rem] border border-primary/10 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                      {`0${index + 1}`}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{t(card.eyebrow)}</span>
                  </div>
                  <h3 className="mb-2 text-base font-black leading-snug text-primary">{t(card.title)}</h3>
                  <p className="text-sm leading-6 text-gray-600">{t(card.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="company-gallery" className="pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-black/[0.06] bg-[linear-gradient(180deg,#fff9f5_0%,#ffffff_55%,#f9fafb_100%)] p-5 sm:p-7">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                  <ImageUp className="h-4 w-4" />
                  {t('Фотогалерея')}
                </span>
                <h2 className="mb-3 text-[clamp(1.7rem,4vw,2.3rem)] font-black leading-tight text-primary">
                  {t('Как выглядит работа Unique Asia в деталях')}
                </h2>
                <p className="text-sm leading-6 text-gray-600">
                  {t('Собрали фотографии по направлениям: поездки, обучение и команда. Любую карточку можно открыть крупно и переключать дальше без выхода из галереи.')}
                </p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-gray-500">
                {t(companyGalleryCategories.find((category) => category.id === activeCategory)?.description ?? '')}
              </p>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {companyGalleryCategories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                      isActive
                        ? 'border-primary bg-primary text-white'
                        : 'border-black/10 bg-white text-primary hover:border-brand/40 hover:text-brand'
                    }`}
                    aria-pressed={isActive}
                  >
                    {t(category.label)}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {visibleImages.map((image, index) => (
                <button
                  key={`${image.src}-${activeCategory}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative min-h-[240px] overflow-hidden rounded-[1.3rem] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:min-h-[280px] lg:min-h-[340px]"
                  aria-label={`${t('Открыть фото')}: ${t(image.title)}`}
                >
                  <img
                    src={image.src}
                    alt={t(image.alt)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,39,42,0.04)_0%,rgba(39,39,42,0.18)_38%,rgba(39,39,42,0.82)_100%)]" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {t(companyGalleryCategories.find((category) => category.id === image.categoryId)?.label ?? '')}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <span className="mb-1 block text-lg font-black leading-tight">{t(image.title)}</span>
                    <span className="block max-w-xl text-sm leading-5 text-white/85">{t(image.description)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/#контакты" className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover">
            {t('Связаться с нами')}
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#171717]/92 p-3 sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label={t(selectedImage.title)}
            onClick={() => setSelectedIndex(null)}
          >
            <div className="flex h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative grid w-full max-w-6xl gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-black/40 shadow-2xl">
                  <img
                    src={selectedImage.src}
                    alt={t(selectedImage.alt)}
                    className="h-[48vh] w-full object-cover sm:h-[60vh] lg:h-[78vh] lg:object-contain"
                  />
                  {visibleImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-brand"
                        aria-label={t('Предыдущее фото')}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-brand"
                        aria-label={t('Следующее фото')}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                <aside className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/8 p-5 text-white backdrop-blur-md">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <span className="mb-2 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                        {t(companyGalleryCategories.find((category) => category.id === selectedImage.categoryId)?.label ?? '')}
                      </span>
                      <h3 className="text-2xl font-black leading-tight">{t(selectedImage.title)}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
                      aria-label={t('Закрыть фотографию')}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-white/80">{t(selectedImage.description)}</p>
                  <p className="mb-5 text-xs uppercase tracking-[0.16em] text-white/55">
                    {`${String((selectedIndex ?? 0) + 1).padStart(2, '0')} / ${String(visibleImages.length).padStart(2, '0')}`}
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {visibleImages.map((image, index) => {
                      const isCurrent = index === selectedIndex;

                      return (
                        <button
                          key={`${image.src}-thumb-${index}`}
                          type="button"
                          onClick={() => setSelectedIndex(index)}
                          className={`overflow-hidden rounded-2xl border transition-all ${
                            isCurrent ? 'border-brand shadow-[0_0_0_1px_rgba(230,32,32,0.35)]' : 'border-white/10 opacity-70 hover:opacity-100'
                          }`}
                          aria-label={`${t('Открыть фото')}: ${t(image.title)}`}
                        >
                          <img src={image.src} alt={t(image.alt)} className="h-16 w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </aside>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
