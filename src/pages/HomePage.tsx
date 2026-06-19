import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contacts from '../components/Contacts';
import NewsGallery from '../components/NewsGallery';
import About from '../components/About';
import VideoStories from '../components/VideoStories';

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
      <Features />
      <About />
      <VideoStories />
      <Services />
      <NewsGallery />
      <Testimonials />
      <CTA />
      <Contacts />
    </main>
  );
}
