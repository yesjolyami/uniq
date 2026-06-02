import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    category: 'Трудоустройство',
    name: 'Арген',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop',

    quote: 'Начал изучать японский язык с нуля в Unique Asia. За 3 месяца дошёл до уровня N4. Очень доволен обучением, преподаватели объясняют всё понятно и профессионально.',
    rating: 5,
  },
  {
    category: 'Образование',
    name: 'Гулиза',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',

    quote: 'Учусь в Unique Asia уже третий месяц. За это время смогла достичь уровня N5 по японскому языку. Рекомендую всем, кто хочет изучать японский в комфортной атмосфере.',
    rating: 5,
  },
  {
    category: 'Туризм и Визы',
    name: 'Аманкул',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=2764&auto=format&fit=crop',
    quote: 'Незабываемый тур по Азии! Все было организовано на высшем уровне, без задержек и проблем.',
    rating: 4,
  },
  {
    category: 'Оформление виз',
    name: 'Камилла',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop',
    quote: 'Обучаюсь здесь уже 4 месяца и очень довольна курсом. Занятия интересные, преподаватели поддерживают и помогают достигать хороших результатов.',
    rating: 5,
  },
  {
    category: 'Трудоустройство',
    name: 'Гамзат',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
    quote: 'В Unique Asia я не только изучил японский язык, но и узнал много нового о культуре, традициях и достопримечательностях Японии. Также нашёл много новых друзей.',
    rating: 5,
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  const maxIndex = testimonials.length - itemsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section 
      id="отзывы" 
      className="relative min-h-screen py-20 lg:py-32 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] overflow-hidden flex flex-col justify-center"
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Наши клиенты уже открыли мир с <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              UNIQUE ASIA
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl font-medium"
          >
            Вдохновляющие истории успеха, карьерного роста и незабываемых путешествий.
          </motion.p>
        </div>

        <div className="relative group">
          
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute -left-5 lg:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur w-14 h-14 rounded-full items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 text-gray-700 hover:text-orange-500 hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-7 h-7 ml-[-2px]" />
          </button>

          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute -right-5 lg:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur w-14 h-14 rounded-full items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 text-gray-700 hover:text-orange-500 hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-7 h-7 mr-[-2px]" />
          </button>

          <div className="overflow-hidden px-2 py-10 -my-10">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) nextSlide();
                else if (swipe > 50) prevSlide();
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 md:px-4 pt-10"
                >
                  <article className="group/card h-full relative bg-white rounded-3xl p-8 pt-14 shadow-[0_10px_40px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(249,115,22,0.1)] border border-gray-100 transition-all duration-300 flex flex-col justify-between">
                    
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 rotate-180 transition-colors group-hover/card:text-orange-50" />

                    <div className="absolute -top-10 left-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-40 group-hover/card:opacity-70 transition-opacity duration-300"></div>
                        <img 
                          src={testimonial.image} 
                          alt={`Фото клиента: ${testimonial.name}`} 
                          className="relative w-20 h-20 rounded-full object-cover border-[4px] border-white z-10"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>

                      <blockquote className="text-gray-700 text-[15px] leading-relaxed font-medium mb-6 relative z-10">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <cite className="not-italic font-bold text-gray-900 block text-lg">
                        {testimonial.name}
                      </cite>
                      <span className="text-orange-500 font-semibold text-sm">
                        {testimonial.category}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-12">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex 
                  ? 'bg-orange-500 w-8 h-2.5' 
                  : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
              }`}
              aria-label={`Перейти к отзыву ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}