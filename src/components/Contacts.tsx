import { motion } from 'motion/react';

const contactMethods = [
  {
    title: 'ОБУЧЕНИЕ • ТРУДОУСТРОЙСТВО • АВИАБИЛЕТЫ',
    phone: '+996 551 300 017',
    link: 'https://wa.me/996551300017'
  },
  {
    title: 'ГОРЯЩИЕ ТУРЫ • ТУРЫ • БРОНЬ ОТЕЛЕЙ',
    phone: '+996 507 970 047',
    link: 'https://wa.me/996507970047'
  },
  {
    title: 'КУРСЫ • ТРУДОУСТРОЙСТВО • ВИЗЫ',
    phone: '+996 504 140 504',
    link: 'https://wa.me/996504140504'
  }
];

export default function Contacts() {
  return (
    <section id="контакты" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2rem] md:text-[2.5rem] font-bold text-primary mb-3"
          >
            СПОСОБЫ СВЯЗИ
          </motion.h2>
          <div className="flex items-center justify-center mt-5">
            <div className="h-[1px] w-8 bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#e62020] mx-3"></div>
            <div className="h-[1px] w-8 bg-gray-300"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] transition-all flex flex-col items-center text-center h-full"
            >
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200/50">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </div>
              <h3 className="text-[12px] font-bold text-gray-800 mb-6 tracking-wider leading-[1.6] flex-grow flex items-start max-w-[240px]">
                {method.title}
              </h3>
              <a 
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-row items-center justify-center gap-2 bg-white border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-5 py-3 rounded-full transition-all w-full"
              >
                <span className="font-bold text-[17px] tracking-wide">{method.phone}</span>
                <span className="text-[11px] font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 mt-0.5">W/A</span>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-slate-50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary mb-4">Наш офис</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Мы с радостью ждем вас в гости для личной консультации:
            </p>
            <div className="flex flex-col gap-2 mb-6 md:mb-0">
              <span className="font-semibold text-xl text-[#f5963b]">
                ул. Московская, 192/1
              </span>
              <span className="text-gray-600 font-medium">
                Бишкек, Кыргызстан 720000
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Режим работы:<br />
                Пн - Пт: 10:00 - 18:00
              </span>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-inner bg-gray-200 border border-gray-200">
            <iframe 
              src="https://maps.google.com/maps?q=Moskovskaya%20st,%20192/1,%20Bishkek,%20Kyrgyzstan&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UNIQUE ASIA Office Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
