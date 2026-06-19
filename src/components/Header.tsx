import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n/I18nContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: 'О компании', target: 'о компании' },
    { label: 'Услуги', target: 'услуги' },
    { label: 'Трудоустройство', target: 'трудоустройство' },
    { label: 'Обучение', target: 'обучение' },
    { label: 'Новости', target: 'новости' },
    { label: 'Контакты', target: 'контакты' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id.toLowerCase()}`);
    } else {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="relative z-50 mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white font-black text-sm tracking-tighter shadow-sm">
              <span className="text-[#f5963b]">U</span>
              <span className="text-brand">K</span>
              <span className="text-brand">G</span>
            </div>
            <span className="hidden text-[11px] font-black uppercase tracking-[0.18em] text-primary sm:block">Unique Asia</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <button 
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="max-w-[128px] whitespace-nowrap text-[11px] font-bold text-gray-700 transition-colors hover:text-brand xl:text-[12px]"
              >
                {t(item.label)}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <a
              href="https://wa.me/996508979747"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-[12px] font-bold text-primary transition-colors hover:border-[#25D366]/50 hover:text-[#159447]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
            <button 
              onClick={() => scrollToSection('cta')}
              className="rounded-full bg-primary px-5 py-3 text-[12px] font-bold text-white shadow-md transition-colors hover:bg-brand"
            >
              {t('Оставить заявку')}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://wa.me/996508979747"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full bg-[#25D366] p-2.5 text-white shadow-sm transition-colors hover:bg-[#20bd5a]"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            <button 
              className="p-1 text-primary"
              onClick={toggleMenu}
              aria-label={t('Открыть или закрыть меню')}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 top-[76px] z-40 max-h-[80vh] w-full overflow-y-auto border-b border-gray-100 bg-white shadow-xl lg:hidden"
            >
              <nav className="flex flex-col px-4 py-6 gap-2">
                {navLinks.map((item) => (
                  <button 
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                  className="border-b border-black/[0.05] p-3 text-left text-lg font-bold text-gray-800 transition-colors hover:text-brand"
                  >
                    {t(item.label)}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="mt-4 rounded-full bg-primary px-6 py-4 text-center font-bold text-white transition-colors hover:bg-brand"
                >
                  {t('Оставить заявку')}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
