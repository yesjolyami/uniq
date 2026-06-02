import { CheckCircle2, Globe2, Users, Map, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const benefits = [
  'Опыт и профессионализм с 2019 года',
  'Широкая сеть партнеров в Японии, Германии и других странах',
  'Честные условия и прозрачные процессы',
  'Индивидуальный подход к каждому клиенту',
  'Тысячи успешных историй наших клиентов',
];

const stats = [
  { icon: Globe2, value: '5+', label: 'лет', sublabel: 'успешной работы' },
  { icon: Users, value: '1000+', label: '', sublabel: 'довольных клиентов' },
  { icon: Map, value: '10+', label: 'стран', sublabel: 'наших направлений' },
  { icon: Clock, value: '24/7', label: '', sublabel: 'поддержка клиентов' },
];

export default function WhyUs() {
  return (
    <section id="преимущества" className="relative py-24 overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2948&auto=format&fit=crop" 
          alt="Tokyo Tower" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-6 leading-tight">
              Почему выбирают <span className="block mt-1">UNIQUE ASIA?</span>
            </h2>
            <div className="flex items-center mb-10">
              <div className="h-[1px] w-8 bg-gray-600"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#f5963b] mx-3 shadow-[0_0_8px_rgba(245,150,59,0.8)]"></div>
              <div className="h-[1px] w-8 bg-gray-600"></div>
            </div>
            
            <ul className="space-y-5">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-[22px] h-[22px] text-[#f5963b] shrink-0 mt-[3px]" strokeWidth={2} />
                  <span className="text-gray-100 text-[16px] leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors"
              >
                <stat.icon className="w-10 h-10 text-white mb-4 opacity-90" strokeWidth={1} />
                <div className="text-[2rem] font-bold text-white mb-1 flex items-baseline gap-1">
                  {stat.value}
                  {stat.label && <span className="text-[1.1rem] font-medium">{stat.label}</span>}
                </div>
                <div className="text-gray-300 text-[13px] font-medium tracking-wide uppercase">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
