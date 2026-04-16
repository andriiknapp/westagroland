import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NavBar from '@/Layout/NavBar';
import Footer from '@/Layout/Footer';
import RequestForm from '@/components/RequestForm';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();

  // Скрол нагору при завантаженні сторінки
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CONTACT_CARDS = [
    {
      id: 'phone',
      icon: Phone,
      title: t('contactPage.phone.title'),
      value: '(067) 360 66 27',
      desc: t('contactPage.phone.desc'),
      link: 'tel:+380673606627'
    },
    {
      id: 'email',
      icon: Mail,
      title: t('contactPage.email.title'),
      value: 'ppzahidagrozemly@ukr.net',
      desc: t('contactPage.email.desc'),
      link: 'mailto:ppzahidagrozemly@ukr.net'
    },
    {
      id: 'address',
      icon: MapPin,
      title: t('contactPage.address.title'),
      value: t('contactPage.address.desc'),
      desc: 'Київська обл., Бучанський р-н',
      link: null
    },
    {
      id: 'hours',
      icon: Clock,
      title: t('contactPage.hours.title'),
      value: t('contactPage.hours.desc'),
      desc: 'Сб-Нд: Вихідний',
      link: null
    }
  ];

  return (
    <div className="contact-page">
      <main className="contact-page__main">
        
        {/* Contact Info Section */}
        <section className="contact-info">
          <div className="contact-info__container">
            <motion.div 
              className="contact-info__header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="contact-info__title">{t('contactPage.title')}</h1>
              <p className="contact-info__subtitle">{t('contactPage.subtitle')}</p>
            </motion.div>

            <div className="contact-info__grid">
              {CONTACT_CARDS.map((card, index) => {
                const Icon = card.icon;
                const CardWrapper = card.link ? 'a' : 'div';
                
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardWrapper 
                      href={card.link || undefined} 
                      className={`contact-card ${card.link ? 'contact-card--clickable' : ''}`}
                    >
                      <div className="contact-card__icon-wrap">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="contact-card__content">
                        <span className="contact-card__title">{card.title}</span>
                        <span className="contact-card__value">{card.value}</span>
                        <span className="contact-card__desc">{card.desc}</span>
                      </div>
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reusing RequestForm component! */}
        <RequestForm />

      </main>
    </div>
  );
}