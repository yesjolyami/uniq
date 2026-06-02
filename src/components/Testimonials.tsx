import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    category: 'Трудоустройство',
    name: 'Алексей',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    quote: 'Благодаря UNIQUE ASIA, нашел работу в Токио!',
  },
  {
    category: 'Образование',
    name: 'Оразаания',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop',
    quote: 'Благодаря UNIQUE ASIA я нашел работу в Токио!',
  },
  {
    category: 'Туризм и Визы',
    name: 'Бремипу',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=2764&auto=format&fit=crop',
    quote: 'Благодаря UNIQUE ASIA я начал учебу своей мечты в зарубежном университете!',
  },
  {
    category: 'Оформление виз',
    name: 'Алина',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop',
    quote: 'Получила шенгенскую визу за считанные дни. Отличный сервис и поддержка на каждом этапе.',
  },
  {
    category: 'Трудоустройство',
    name: 'Максим',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
    quote: 'Переезд в Германию прошел гладко. UNIQUE ASIA взяли на себя всю бумажную волокиту.',
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="отзывы" className="relative py-32 bg-[#f4f7fa] overflow-hidden z-0">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")', 
          backgroundSize: '120% auto', 
          backgroundPosition: 'center top', 
          backgroundRepeat: 'no-repeat' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-28 text-left md:text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.2rem] md:text-[3.25rem] font-bold text-primary mb-3 leading-tight"
          >
            Наши клиенты уже открыли мир с <br className="hidden md:block"/>UNIQUE ASIA
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-700 text-lg md:text-xl font-medium tracking-wide"
          >
            Ваш путь к успеху: вдохновляющие истории
          </motion.p>
        </div>

        <div className="relative mt-8 max-w-5xl mx-auto">
          
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-primary hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-primary hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-[2px] border-t-2 border-dotted border-yellow-400 z-0 opacity-80"></div>

          <div className="overflow-hidden px-4 py-8 -my-8">
            <motion.div 
              className="flex gap-6 lg:gap-12"
              animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * (window.innerWidth < 1024 ? 24 : 48)}px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-32px)] shrink-0 pt-12 relative"
                >
                  <article className={`h-full min-h-[260px] max-w-[320px] mx-auto relative bg-white rounded-2xl p-6 pt-12 shadow-[0_10px_40px_rgb(0,0,0,0.06)] flex flex-col justify-between text-center border border-white/60`}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                      <div className="p-1 bg-white rounded-full shadow-[0_4px_12px_rgb(0,0,0,0.08)]">
                        <img 
                          src={testimonial.image} 
                          alt={`Фото клиента: ${testimonial.name}`} 
                          className="w-[72px] h-[72px] rounded-full object-cover border-4 border-white shadow-[0_0_0_2px_#f5963b]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-[15px] text-primary mb-2 mt-2">
                      {testimonial.category}
                    </h4>
                    
                    <blockquote className="text-gray-700 text-[13px] leading-relaxed flex-grow font-medium px-1 line-clamp-4">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="font-semibold text-gray-500 text-xs mt-3 block">
                      <cite className="not-italic">{testimonial.name}</cite>
                    </div>

                    <div className="flex justify-center gap-1.5 mt-4" aria-hidden="true">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#f5963b]"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-16 md:mt-20">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#e62020]' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
