import React, { useEffect } from 'react';
import { Briefcase, Plane, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import CTA from '../components/CTA';
import KyrgyzOrnament, { KyrgyzMedallion } from '../components/KyrgyzOrnament';
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
    <main className="page-canvas pt-[68px] md:pt-20">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff5eb_0%,#edf8f4_100%)] py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={t(data.title)} className="h-full w-full object-cover opacity-20 mix-blend-multiply" />
        </div>
        <KyrgyzMedallion
          className="absolute right-3 top-4 h-20 w-20 rotate-6 opacity-35 drop-shadow-[0_14px_26px_rgba(65,52,37,0.14)] sm:right-6 sm:h-24 sm:w-24 md:right-[5%] md:top-1/2 md:h-36 md:w-36 md:-translate-y-1/2 md:opacity-65"
          tone={countryId === 'japan' ? 'warm' : 'cool'}
          variant={countryId === 'japan' ? 'rosette' : 'tabak'}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-primary sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-[clamp(2.5rem,12vw,4.5rem)] font-black leading-none md:mb-6 md:text-5xl lg:text-7xl"
          >
            {t(data.title)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-base leading-7 text-gray-600 md:text-xl"
          >
            {t(data.subtitle)}
          </motion.p>
        </div>
      </section>

      <section className="bg-transparent py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KyrgyzOrnament
            className="mx-auto mb-12 h-16 w-full max-w-md opacity-40"
            tone={countryId === 'japan' ? 'warm' : 'cool'}
            variant={countryId === 'japan' ? 'vine' : 'suu'}
          />
          <div className="space-y-16 lg:space-y-24">
            {data.opportunities.map((opp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-7 lg:gap-16`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-white shadow-xl sm:rounded-[2rem] sm:shadow-2xl">
                    <img src={opp.image} alt={t(opp.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4b3830]/55 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white sm:bottom-6 sm:left-6">
                      <div className="rounded-full bg-[#e62020] p-3">
                        <opp.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`w-full rounded-[1.5rem] border p-6 lg:w-1/2 lg:p-8 ${
                  idx === 0
                    ? 'border-[#ead49d] bg-[#fff9e8] text-[#a66c17]'
                    : idx === 1
                      ? 'border-[#b9ddd3] bg-[#f0f9f6] text-[#137f7b]'
                      : 'border-[#edc9bc] bg-[#fff6f1] text-[#d84b3e]'
                }`}>
                  <h2 className="mb-4 text-[clamp(1.75rem,6vw,2rem)] font-bold leading-tight text-primary">{t(opp.title)}</h2>
                  <p className="mb-7 text-base leading-7 text-gray-600 md:text-lg md:leading-relaxed lg:mb-8">{t(opp.description)}</p>
                  <button 
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex w-full items-center justify-center rounded-full bg-cta px-8 py-3.5 font-semibold text-white shadow-md shadow-cta/20 transition-colors hover:bg-cta-hover sm:w-fit"
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
