import React, { useEffect } from 'react';
import { Briefcase, Plane, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import CTA from '../components/CTA';
import { useI18n } from '../i18n/I18nContext';

interface CountryInfo {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  opportunities: {
    title: string;
    description: string;
    icon: any;
    image: string;
  }[];
}

const countriesData: Record<string, CountryInfo> = {
  japan: {
    id: 'japan',
    title: 'Япония',
    subtitle: 'Страна восходящего солнца, передовых технологий и уникальных возможностей',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
    opportunities: [
      {
        title: 'Учеба в Японии',
        description: 'Откройте для себя престижные языковые школы и университеты. Погружение в культуру и язык в идеальной среде для академического роста.',
        icon: GraduationCap,
        image: 'learn.jpg'
      },
      {
        title: 'Работа в Японии',
        description: 'Легальное трудоустройство в стране с высочайшим уровнем жизни. Вакансии для специалистов и начинающих.',
        icon: Briefcase,
        image: 'tourism.jpg'
      },
      {
        title: 'Туризм и отдых',
        description: 'Незабываемые впечатления от древних храмов Киото до неоновых улиц Токио. Индивидуальные и групповые туры.',
        icon: Plane,
        image: 'work.jpg'
      }
    ]
  },
  germany: {
    id: 'germany',
    title: 'Германия',
    subtitle: 'Центр Европы с сильной экономикой, качественным образованием и стабильностью',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop',
    opportunities: [
      {
        title: 'Учеба в Германии',
        description: 'Бесплатное высшее образование или недорогие языковые курсы. Дипломы, которые признаются во всем мире.',
        icon: GraduationCap,
        image: 'learn_germany.jpg'
      },
      {
        title: 'Работа в Германии',
        description: 'Востребованные профессии, высокие зарплаты и возможность получить Голубую карту ЕС.',
        icon: Briefcase,
        image: 'work_germany.jpg'
      },
      {
        title: 'Туризм и отдых',
        description: 'От замков Баварии до современного Берлина. Мы подберем для вас лучший тур.',
        icon: Plane,
        image: 'tourism_germany.jpg'
      }
    ]
  }
};

export default function DirectionPage({ countryId }: { countryId: 'japan' | 'germany' }) {
  const data = countriesData[countryId];
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!data) return null;

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={t(data.title)} className="h-full w-full object-cover opacity-25 mix-blend-multiply" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-primary sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6"
          >
            {t(data.title)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl"
          >
            {t(data.subtitle)}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {data.opportunities.map((opp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                    <img src={opp.image} alt={t(opp.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4b3830]/55 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                      <div className="bg-[#e62020] p-3 rounded-full">
                        <opp.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-primary mb-4">{t(opp.title)}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{t(opp.description)}</p>
                  <button 
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center w-fit bg-gradient-to-r from-[#f5963b] to-[#e62020] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-md"
                  >
                    {t('Узнать больше')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
