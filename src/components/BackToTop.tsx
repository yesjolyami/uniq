import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-brand md:bottom-10 md:right-10"
          aria-label={t('Наверх')}
        >
          <ArrowUp className="w-6 h-6" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
