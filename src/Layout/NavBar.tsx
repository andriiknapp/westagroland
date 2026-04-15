import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import "./NavBar.css";

// Выносим MotionLink за пределы компонента, чтобы избежать лишних перерисовок
const MotionLink = motion(Link);

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

  // Умный обработчик кликов для ссылок (особенно для якорных ссылок вроде /#products)
  const handleNavClick = (href) => {
    if (isOpen) {
      closeMenu();
    }
    
    // Если ссылка содержит хэш (якорь), делаем плавный скролл вручную
    if (href.includes('#')) {
      const id = href.split('#')[1];
      // Задержка нужна, чтобы успело сняться body.style.overflow = 'hidden' 
      // и страница успела отрендериться, если мы переходим с другого роута
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, isOpen ? 300 : 0); // Если меню было открыто, ждем чуть дольше (пока закроется)
    }
  };

  const links = [
    { name: t('nav.home'),     href: '/' },
    { name: t('nav.products'), href: '/#products' },
    { name: t('nav.contact'),  href: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}>
    <div className="navbar__inner">
      {/* Логотип */}
      <Link to="/" className="navbar__logo" onClick={() => handleNavClick('/')}>
        <div className="navbar__logo-container">
          <img 
            src="/favicon.svg" 
            alt="Zachid Agro Zemlia Logo" 
            className="navbar__logo-img" 
          />
        </div>
        <div className="navbar__logo-text-group">
          <span className="navbar__logo-text">Zachid Agro Zemlia</span>
          <span className="navbar__logo-subtext">Agro Industrial Group</span>
        </div>
      </Link>

        <div className="navbar__links">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="navbar__link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          <LanguageSelector />
          <div className="navbar__cta-wrap">
            <Link to="/contact" className="navbar__cta-btn">
              {t('nav.cta')}
              <ArrowUpRight size={14} />
            </Link>
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
            <div className="mobile-menu__topbar">
              <Link to="/" className="mobile-menu__logo" onClick={() => handleNavClick('/')}>
                <img src="/favicon.svg" alt="Logo" className="mobile-menu__logo-img" />
                <span className="mobile-menu__logo-text">Zachid Agro Zemlia</span>
              </Link>
              <button
                className="mobile-menu__close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-menu__nav">
              <div className="mobile-menu__links">
                {links.map((link, i) => (
                  <MotionLink
                    key={link.name}
                    to={link.href}
                    className="mobile-menu__link"
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, ease: 'easeOut' }}
                  >
                    {link.name}
                    <ArrowUpRight size={18} className="mobile-menu__link-arrow" />
                  </MotionLink>
                ))}
              </div>

              <motion.div
                className="mobile-menu__bottom"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, ease: 'easeOut' }}
              >
                <div className="mobile-menu__lang-wrap">
                   <LanguageSelector />
                </div>
                
                <p className="mobile-menu__tagline">{t('nav.tagline')}</p>
                <Link
                  to="/contact"
                  className="mobile-menu__cta"
                  onClick={() => handleNavClick('/contact')}
                >
                  {t('nav.cta')}
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}