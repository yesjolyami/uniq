import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = ['О компании', 'Услуги', 'Преимущества', 'Отзывы', 'Контакты'];

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
      <header className="fixed w-full top-0 bg-white z-50 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50 bg-white">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <div className="flex items-center justify-center w-11 h-11 bg-white border border-gray-100 rounded-full font-black text-lg tracking-tighter shadow-md">
              <span className="text-[#f5963b]">U</span>
              <span className="text-[#e62020]">K</span>
              <span className="text-[#e62020]">G</span>
            </div>
            <div className="flex flex-col justify-center translate-y-0.5">
              <span className="font-bold text-xl leading-none text-primary tracking-wide">UNIQUE ASIA</span>
              <span className="text-[0.55rem] text-primary/70 font-medium uppercase tracking-[0.2em] leading-tight mt-1">
                Международные возможности
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item)}
                className="text-[13px] font-bold text-gray-800 hover:text-[#e62020] transition-colors"
              >
                {item}
              </button>
            ))}
            
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[13px] font-bold text-gray-800 hover:text-[#e62020] transition-colors py-2">
                Направления <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 py-2 w-48 overflow-hidden"
                  >
                    <Link to="/japan" className="block px-5 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-[#e62020]">
                      Япония
                    </Link>
                    <Link to="/germany" className="block px-5 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-[#e62020]">
                      Германия
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/996551300017"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#20bd5a] transition-colors shadow-md"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
            <button 
              onClick={() => scrollToSection('cta')}
              className="bg-gradient-to-r from-[#f5963b] to-[#e62020] hover:opacity-90 text-white px-7 py-3 rounded-full text-[13px] font-semibold transition-all shadow-md"
            >
              Оставить заявку
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://wa.me/996551300017"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#25D366] text-white p-2.5 rounded-full shadow-md hover:bg-[#20bd5a] transition-colors"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            <button 
              className="p-1 text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
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
              className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl z-40 max-h-[80vh] overflow-y-auto"
            >
              <nav className="flex flex-col px-4 py-6 gap-2">
                {navLinks.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollToSection(item)}
                    className="text-lg font-bold text-gray-800 hover:text-[#e62020] p-3 transition-colors border-b border-gray-50 text-left"
                  >
                    {item}
                  </button>
                ))}
                
                <div className="py-2">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Направления</div>
                  <Link 
                    to="/japan" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold text-gray-800 hover:text-[#e62020] p-3 transition-colors border-b border-gray-50"
                  >
                    Япония
                  </Link>
                  <Link 
                    to="/germany" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold text-gray-800 hover:text-[#e62020] p-3 transition-colors border-b border-gray-50"
                  >
                    Германия
                  </Link>
                </div>

                <button 
                  onClick={() => scrollToSection('cta')}
                  className="bg-gradient-to-r from-[#f5963b] to-[#e62020] shadow-md text-white px-6 py-4 rounded-full text-center font-semibold mt-4 transition-all hover:opacity-90"
                >
                  Оставить заявку
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
