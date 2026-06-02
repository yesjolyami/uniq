import { ShieldCheck, UserCheck, Headset } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export default function Features() {
  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col items-start"
          >
            <ShieldCheck className="w-10 h-10 text-[#e62020] mb-5" strokeWidth={1.5} />
            <h3 className="font-bold text-[17px] text-primary mb-3 leading-tight">Надежность</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Прозрачность и безопасность на каждом этапе</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col items-start"
          >
            <UserCheck className="w-10 h-10 text-[#e62020] mb-5" strokeWidth={1.5} />
            <h3 className="font-bold text-[17px] text-primary mb-3 leading-tight">Индивидуальный подход</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Решения, созданные именно для вас</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow flex flex-col items-start"
          >
            <Headset className="w-10 h-10 text-[#e62020] mb-5" strokeWidth={1.5} />
            <h3 className="font-bold text-[17px] text-primary mb-3 leading-tight">Поддержка 24/7</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Мы всегда рядом и готовы помочь</p>
          </motion.div>

      </div>
    </section>
  );
}
