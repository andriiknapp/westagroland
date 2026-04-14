import { Leaf, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const NAV_LINKS = [
  { name: 'Головна', href: '#' },
  { name: 'Продукти', href: '#products' },
  { name: 'Про нас', href: '#about' },
  { name: 'Контакт', href: '#contact' },
];

const PRODUCTS = [
  'Ріпак',
  'Кукурудза',
  'Соняшник',
  'Соєві боби',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Leaf size={18} />
              </div>
              <span className="footer__logo-text">АгроЕкспорт</span>
            </div>
            <p className="footer__description">
              Надійний партнер для міжнародних трейдерів, харчових виробників і дистриб'юторів Європи.
            </p>
            <a href="#contact" className="footer__contact-link">
              Зв'язатися з нами
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Navigation */}
          <div className="footer__nav">
            <p className="footer__heading">Навігація</p>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer__link">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer__contacts">
            <p className="footer__heading">Контакти</p>
            <ul className="footer__list">
              <li>
                <a href="mailto:info@agroexport.ua" className="footer__contact-item">
                  <Mail size={16} className="footer__contact-icon" />
                  info@agroexport.ua
                </a>
              </li>
              <li>
                <a href="tel:+380441234567" className="footer__contact-item">
                  <Phone size={16} className="footer__contact-icon" />
                  +380 44 123 4567
                </a>
              </li>
              <li>
                <p className="footer__contact-item">
                  <MapPin size={16} className="footer__contact-icon" />
                  м. Київ, вул. Аграрна, 1
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} АгроЕкспорт. Всі права захищені.
          </p>
          <div className="footer__products">
            {PRODUCTS.map((p) => (
              <span key={p} className="footer__product">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}