import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, ArrowUpRight, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const NAV_LINKS = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/#products' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  // Функция для плавного скролла к якорям (добавлен тип : string)
  const handleNavClick = (href: string) => {
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.includes('#')) {
      const id = href.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); 
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          
          {/* 1. Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Leaf size={18} />
              </div>
              <span className="footer__logo-text">{t('nav.brandName')}</span>
            </div>
            <p className="footer__description">
              {t('footer.brandDesc')}
            </p>
            <Link to="/contact" className="footer__contact-link">
              {t('footer.contactUs')}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* 2. Navigation */}
          <div className="footer__nav">
            <p className="footer__heading">{t('footer.navHeading')}</p>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="footer__link"
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contacts */}
          <div className="footer__contacts">
            <p className="footer__heading">{t('footer.contactsHeading')}</p>
            <ul className="footer__list">
              <li>
                <a href="tel:+380673606627" className="footer__contact-item">
                  <Phone size={16} className="footer__contact-icon" />
                  (067) 360 66 27
                </a>
              </li>
              <li>
                <a href="mailto:ppzahidagrozemly@ukr.net" className="footer__contact-item">
                  <Mail size={16} className="footer__contact-icon" />
                  ppzahidagrozemly@ukr.net
                </a>
              </li>
              <li>
                <div className="footer__contact-item">
                  <MapPin size={16} className="footer__contact-icon" style={{ marginTop: '2px' }} />
                  <div>
                    <span className="footer__info-label">{t('footer.postalAddress')}</span><br/>
                    {t('footer.postalAddressValue')}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* 4. Company Details (Реквізити) */}
          <div className="footer__details">
            <p className="footer__heading">{t('footer.companyHeading')}</p>
            <ul className="footer__info-list">
              <li>
                <MapPin size={15} className="footer__info-icon" />
                <span>
                  <span className="footer__info-label">{t('footer.legalAddress')}</span><br/>
                  {t('footer.legalAddressValue')}
                </span>
              </li>
              <li>
                <FileText size={15} className="footer__info-icon" />
                <span>
                  {t('footer.taxInfo')}<br/>
                  <span className="footer__info-label">{t('footer.director')}</span> {t('footer.directorName')}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} {t('nav.brandName')}. {t('footer.rights')}
          </p>
          <div className="footer__legal-links">
            <Link to="/privacy-policy" className="footer__legal-link" onClick={() => handleNavClick('/')}>
              {t('footer.privacy')}
            </Link>
            <span className="footer__dot">•</span>
            <Link to="/terms-of-service" className="footer__legal-link" onClick={() => handleNavClick('/')}>
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}