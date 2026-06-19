import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { languages, useI18n } from '../i18n/I18nContext';

export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLocale, t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${mobile ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('Выбрать язык')}
        className={`flex h-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white text-xs font-bold text-primary transition-colors hover:border-brand/30 ${
          mobile ? 'w-full px-4' : 'w-[100px] px-3'
        }`}
      >
        <span className="text-base leading-none" aria-hidden="true">{language.flag}</span>
        <span className="w-7 text-center">{language.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="listbox"
            aria-label={t('Язык сайта')}
            className={`absolute z-[60] mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_18px_50px_rgba(39,39,42,0.16)] ${
              mobile ? 'left-0 right-0' : 'right-0 w-56'
            }`}
          >
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={item.code === language.code}
                onClick={() => {
                  setLocale(item.code);
                  setIsOpen(false);
                }}
                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition-colors ${
                  item.code === language.code ? 'bg-brand-soft font-bold text-primary' : 'text-gray-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-6 text-center text-lg" aria-hidden="true">{item.flag}</span>
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                {item.code === language.code && <Check className="h-4 w-4 shrink-0 text-brand" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
