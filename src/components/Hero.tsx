import { motion } from 'motion/react';
import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-48 overflow-hidden bg-slate-50 flex items-center min-h-[85vh]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop" 
          alt="Travel Background" 
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent sm:from-white/95 sm:via-white/70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[2.25rem] md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6"
          >
            UNIQUE ASIA — 
            <span className="block mt-2 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f5963b] to-[#e62020]">ваш надежный партнер</span>
            в мире международных
            <span className="block mt-1">возможностей.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[14px] md:text-[16px] text-gray-700 mb-8 leading-relaxed max-w-[460px]"
          >
            С 2019 года мы помогаем людям открывать новые горизонты через путешествия, образование и работу за рубежом.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => document.getElementById('услуги')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#f5963b] to-[#e62020] hover:opacity-90 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              Наши услуги
            </button>
            <button 
              onClick={() => document.getElementById('о компании')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-primary hover:bg-gray-50 text-primary px-8 py-3.5 rounded-full text-sm font-semibold transition-all"
            >
              О компании
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
