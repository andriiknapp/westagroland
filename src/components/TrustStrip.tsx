import { motion } from 'framer-motion';
import { Award, Users, Globe, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './TrustStrip.css';

export default function TrustStrip() {
  const { t } = useTranslation();

  // Масив всередині компонента, щоб t() мав доступ до актуальної мови
  const STATS = [
    { id: 1, icon: Award,  value: '5+',  label: t('trustStrip.experience') },
    { id: 2, icon: Users,  value: '50+', label: t('trustStrip.clients') },
    { id: 3, icon: Globe,  value: '10+', label: t('trustStrip.countries') },
    { id: 4, icon: Star,   value: '98%', label: t('trustStrip.satisfaction') },
  ];

  return (
    <section className="trust">
      <div className="trust__grid">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="trust__item"
            >
              <Icon className="trust__icon" size={20} strokeWidth={1.8} />
              <span className="trust__value">{stat.value}</span>
              <span className="trust__label">{stat.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}