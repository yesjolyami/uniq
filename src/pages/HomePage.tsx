import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero, { HeroDirectionButtons } from '../components/Hero';
import HomeOverview from '../components/HomeOverview';
import NewsGallery from '../components/NewsGallery';
import Testimonials from '../components/Testimonials';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(decodeURIComponent(id));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <HeroDirectionButtons />
      <HomeOverview />
      <NewsGallery />
      <Testimonials />
    </main>
  );
}
