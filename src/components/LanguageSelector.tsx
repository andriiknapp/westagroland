import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './LanguageSelector.css';

const LANGUAGES = [
  { code: 'ua', name: 'Українська' },
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="lang-selector" ref={dropdownRef}>
      <button 
        className="lang-selector__btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="lang-selector__current">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`lang-selector__icon ${isOpen ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="lang-selector__dropdown"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`lang-selector__option ${i18n.language === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}