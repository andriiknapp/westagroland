import { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import "./NavBar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handlePopState = () => setIsOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    window.history.pushState({ menu: 'open' }, '');
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (window.history.state?.menu === 'open') {
      window.history.back();
    }
  };

  const links = [
    { name: t('nav.home'),  href: '#' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.about'),  href: '#about' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <div className="navbar__logo-icon">
            <Leaf size={16} strokeWidth={2} color="white" />
          </div>
          <span className="navbar__logo-text">{t('nav.brandName')}</span>
        </a>

        <div className="navbar__links">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="navbar__link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Group CTA and LangSelector for Desktop */}
        <div className="navbar__actions">
          <LanguageSelector />
          <div className="navbar__cta-wrap">
            <a href="#contact" className="navbar__cta-btn">
              {t('nav.cta')}
              <ArrowUpRight size={14} />
            </a>
          </div>
          
          <button
            className="navbar__burger"
            onClick={() => (isOpen ? closeMenu() : openMenu())}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Top bar with logo + close */}
            <div className="mobile-menu__topbar">
              <a href="#" className="mobile-menu__logo" onClick={closeMenu}>
                <div className="mobile-menu__logo-icon">
                  <Leaf size={16} strokeWidth={2} color="#f5a623" />
                </div>
                <span className="mobile-menu__logo-text">{t('nav.brandName')}</span>
              </a>
              <button
                className="mobile-menu__close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links + bottom CTA */}
            <nav className="mobile-menu__nav">
              <div className="mobile-menu__links">
                {links.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="mobile-menu__link"
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, ease: 'easeOut' }}
                  >
                    {link.name}
                    <ArrowUpRight size={18} className="mobile-menu__link-arrow" />
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mobile-menu__bottom"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, ease: 'easeOut' }}
              >
                {/* Language Selector in Mobile Menu */}
                <div className="mobile-menu__lang-wrap">
                   <LanguageSelector />
                </div>
                
                <p className="mobile-menu__tagline">{t('nav.tagline')}</p>
                <a
                  href="#contact"
                  className="mobile-menu__cta"
                  onClick={closeMenu}
                >
                  {t('nav.cta')}
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}