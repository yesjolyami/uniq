import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative flex items-center min-h-[100svh] md:min-h-[85vh] pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <img 
          src="hero.png" 
          alt="Travel Background" 
          fetchPriority="high"
          className="w-full h-full object-cover object-center md:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent md:bg-gradient-to-r md:from-white/75 md:via-white/30 md:to-transparent"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6"
          >
            UNIQUE ASIA — 
            <span className="block py-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f5963b] to-[#e62020]">
              ваш надежный партнер
            </span>
            в мире международных возможностей.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-900 mb-8 sm:mb-10 leading-relaxed max-w-[500px]"
          >
            С 2019 года мы помогаем людям открывать новые горизонты через путешествия, образование и работу за рубежом.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => document.getElementById('услуги')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-gradient-to-r from-[#f5963b] to-[#e62020] hover:opacity-90 active:scale-[0.98] text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Наши услуги
            </button>
            <button 
              onClick={() => document.getElementById('о компании')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white/30 backdrop-blur-sm sm:bg-transparent border border-slate-500 sm:border-slate-800 hover:bg-slate-50 hover:border-slate-900 text-slate-900 px-8 py-3.5 rounded-full text-base font-semibold transition-all active:scale-[0.98]"
            >
              О компании
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}