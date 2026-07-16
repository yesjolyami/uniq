import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { label: 'О компании', kind: 'route', value: '/company' },
  { label: 'Туризм', kind: 'route', value: '/tourism' },
  { label: 'Трудоустройство', kind: 'route', value: '/employment' },
  { label: 'Обучение', kind: 'route', value: '/education' },
  { label: 'Контакты', kind: 'section', value: 'контакты' },
] as const;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id.toLowerCase()}`);
      return;
    }

    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (item: (typeof navLinks)[number]) => {
    setIsMobileMenuOpen(false);

    if (item.kind === 'route') {
      navigate(item.value);
      window.scrollTo(0, 0);
      return;
    }

    scrollToSection(item.value);
  };

  const isActiveLink = (item: (typeof navLinks)[number]) => (
    item.kind === 'route' && location.pathname === item.value
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#eadfd2] bg-[rgba(255,253,249,0.96)] shadow-[0_6px_22px_rgba(53,43,31,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 md:h-[76px] lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => {
            setIsMobileMenuOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#ebdfd2] bg-white text-sm font-black tracking-tighter shadow-sm shadow-[#725447]/10">
            <span className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,#d84b3e_0_33%,#e6a23c_33%_66%,#137f7b_66%)]" />
            <span className="text-[#f5963b]">U</span>
            <span className="text-brand">K</span>
            <span className="text-brand">G</span>
          </div>
          <span className="hidden text-[11px] font-black uppercase tracking-[0.18em] text-primary sm:block">
            Unique Asia
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-1 xl:flex" aria-label={t('Основная навигация')}>
          {navLinks.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleNavClick(item)}
              aria-current={isActiveLink(item) ? 'page' : undefined}
              className={`relative whitespace-nowrap rounded-full px-3 py-2.5 text-[11px] font-bold transition-colors ${
                isActiveLink(item)
                  ? 'bg-brand-soft text-brand'
                  : 'text-primary/70 hover:bg-[#f7f1e9] hover:text-brand'
              }`}
            >
              {t(item.label)}
            </button>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <a
            href="https://wa.me/996508979747"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#25D366]/25 bg-[#eaf9ef] px-4 text-[12px] font-bold text-[#168a43] transition-colors hover:border-[#25D366]/45 hover:bg-[#dff6e7]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => scrollToSection('контакты')}
            className="inline-flex h-10 items-center rounded-full bg-cta px-5 text-[12px] font-bold text-white shadow-md shadow-cta/15 transition-colors hover:bg-cta-hover"
          >
            {t('Оставить заявку')}
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <a
            href="https://wa.me/996508979747"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#20bd5a] min-[390px]:flex"
            aria-label="WhatsApp"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5d8c8] bg-white text-primary shadow-sm transition-colors hover:border-brand/30 hover:bg-brand-soft"
            aria-label={t('Открыть или закрыть меню')}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-[68px] max-h-[calc(100svh-68px)] overflow-y-auto border-b border-[#eadfd2] bg-[rgba(255,253,249,0.99)] shadow-[0_18px_40px_rgba(53,43,31,0.1)] md:top-[76px] md:max-h-[calc(100svh-76px)] xl:hidden"
          >
            <nav className="mx-auto grid max-w-2xl gap-2 px-4 py-5 sm:px-6" aria-label={t('Мобильная навигация')}>
              {navLinks.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  aria-current={isActiveLink(item) ? 'page' : undefined}
                  className={`rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-colors ${
                    isActiveLink(item)
                      ? 'bg-brand-soft text-brand'
                      : 'bg-white text-primary hover:bg-[#f7f1e9] hover:text-brand'
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection('контакты')}
                className="mt-2 rounded-2xl bg-cta px-5 py-4 text-center text-sm font-bold text-white transition-colors hover:bg-cta-hover"
              >
                {t('Оставить заявку')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent_0%,#d84b3e_22%,#d84b3e_40%,#e6a23c_50%,#137f7b_60%,#137f7b_78%,transparent_100%)] opacity-55" />
    </header>
  );
}
