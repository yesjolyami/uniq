import { Briefcase, Plane, FileText, Ticket, GraduationCap, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop',
    title: 'Трудоустройство\nв Японии и Германии',
    description: 'Помогаем найти официальную работу за рубежом с полным сопровождением на всех этапах.',
  },
  {
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop',
    title: 'Туристические поездки',
    description: 'Организуем незабываемые путешествия в разные уголки мира с учетом ваших желаний и бюджета.',
  },
  {
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop',
    title: 'Оформление виз',
    description: 'Помогаем быстро и правильно оформить визы в различные страны с высокой вероятностью одобрения.',
  },
  {
    icon: Ticket,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2948&auto=format&fit=crop',
    title: 'Подбор авиабилетов',
    description: 'Находим лучшие варианты перелетов по оптимальным ценам.',
  },
  {
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop',
    title: 'Языковые программы',
    description: 'Подбираем языковые курсы за рубежом для учебы, работы и личного развития.',
  },
  {
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2940&auto=format&fit=crop',
    title: 'Поддержка и сопровождение',
    description: 'Сопровождаем клиентов на каждом этапе пути: от консультации до возвращения домой.',
  },
];

export default function Services() {
  return (
    <section id="услуги" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2rem] md:text-[2.5rem] font-bold text-primary mb-5"
          >
            Наши направления и услуги
          </motion.h2>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-8 bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#e62020] mx-3"></div>
            <div className="h-[1px] w-8 bg-gray-300"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full border border-gray-100"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 relative flex flex-col flex-grow">
                <div className="absolute -top-7 left-8 bg-white w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgb(0,0,0,0.08)] border border-gray-50">
                  <service.icon className="w-6 h-6 text-[#e62020]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-primary mt-3 mb-3 whitespace-pre-line leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-2 flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
