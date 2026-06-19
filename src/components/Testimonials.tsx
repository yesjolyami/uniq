import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

const testimonials = [
  {
    category: 'Образование',
    name: 'Арген',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    quote: 'Начал изучать японский язык с нуля. За три месяца дошёл до уровня N4. Преподаватели объясняют понятно и профессионально.',
    rating: 5,
  },
  {
    category: 'Языковые курсы',
    name: 'Гулиза',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    quote: 'Учусь третий месяц и уже вижу уверенный прогресс. Особенно ценю спокойную атмосферу и поддержку преподавателей.',
    rating: 5,
  },
  {
    category: 'Туризм',
    name: 'Аманкул',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=400&auto=format&fit=crop',
    quote: 'Поездка была организована чётко: маршрут, документы и связь с координатором. Можно было просто наслаждаться путешествием.',
    rating: 5,
  },
  {
    category: 'Оформление виз',
    name: 'Камилла',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    quote: 'Получила понятный список документов и помощь на каждом этапе. Не пришлось самостоятельно разбираться во всех деталях.',
    rating: 5,
  },
  {
    category: 'Сопровождение',
    name: 'Гамзат',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    quote: 'Помимо языка узнал много о культуре и подготовке к поездке. Команда всегда была на связи и отвечала по существу.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const { t } = useI18n();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);
  const nextSlide = () => setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
  const prevSlide = () => setCurrentIndex((index) => (index <= 0 ? maxIndex : index - 1));

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  return (
    <section id="отзывы" className="overflow-hidden border-b border-gray-100 bg-white py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{t('Истории клиентов')}</span>
            <h2 className="text-3xl font-black leading-tight text-primary md:text-5xl">
              {t('Опыт людей говорит')} <span className="text-brand">{t('лучше рекламы')}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={prevSlide} aria-label={t('Предыдущие отзывы')} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-primary transition-colors hover:border-brand hover:text-brand">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={nextSlide} aria-label={t('Следующие отзывы')} className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-brand">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -50) nextSlide();
              else if (offset.x > 50) prevSlide();
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3">
                <article className={`flex h-full min-h-[310px] flex-col justify-between rounded-[1.5rem] border p-7 ${
                  index % 3 === 1 ? 'border-[#dfc4ad] bg-cream text-primary' : 'border-gray-200 bg-slate-50 text-primary'
                }`}>
                  <div>
                    <div className="mb-8 flex items-center justify-between">
                      <Quote className="h-8 w-8 text-brand" />
                      <div className="flex gap-1" aria-label={`${testimonial.rating} ${t('из 5')}`}>
                        {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                          <Star key={starIndex} className="h-3.5 w-3.5 fill-[#f5963b] text-[#f5963b]" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-[15px] font-medium leading-7 text-gray-600">
                      «{t(testimonial.quote)}»
                    </blockquote>
                  </div>
                  <div className="mt-8 flex items-center gap-4 border-t border-black/[0.07] pt-5">
                    <img
                      src={testimonial.image}
                      alt={`${t('Фото клиента')}: ${testimonial.name}`}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <div>
                      <cite className="not-italic text-base font-black">{testimonial.name}</cite>
                      <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                        {t(testimonial.category)}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`${t('Перейти к отзывам')} ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-10 bg-brand' : 'w-4 bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
