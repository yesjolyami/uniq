import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';
import Contacts from '../components/Contacts';
import GallerySection from '../components/GallerySection';
import Hero from '../components/Hero';
import NewsGallery from '../components/NewsGallery';
import SecondaryDirections from '../components/SecondaryDirections';
import Services from '../components/Services';

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
      <NewsGallery />
      <Services />
      <About />
      <SecondaryDirections />
      <GallerySection />
      <Contacts />
    </main>
  );
}
