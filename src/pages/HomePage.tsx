import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Hero, { HeroDirectionButtons } from '../components/Hero';
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
      <NewsGallery />
      <Testimonials />
      <Contacts />
    </main>
  );
}
