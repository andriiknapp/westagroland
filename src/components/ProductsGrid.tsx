import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import productRapeseed from '../assets/images/product-rapeseed.png';
import productCorn from '../assets/images/product-corn.png';
import productSunflower from '../assets/images/product-sunflower.png';
import productSoybean from '../assets/images/product-soybean.png';
import './ProductsGrid.css';

// Картинки остаются статичными
const PRODUCT_IMAGES = [
  productRapeseed,
  productCorn,
  productSunflower,
  productSoybean,
];

export default function ProductsGrid() {
  const { t } = useTranslation();
  
  // Получаем массив объектов (name, tag, desc) из JSON
  const products = t('productsGrid.items', { returnObjects: true }) as Array<{
    name: string;
    tag: string;
    desc: string;
  }>;

  return (
    <section className="products" id="products">
      <div className="products__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="products__header"
        >
          <span className="products__eyebrow">{t('productsGrid.eyebrow')}</span>
          <h2 className="products__title">{t('productsGrid.title')}</h2>
          <p className="products__subtitle">{t('productsGrid.subtitle')}</p>
        </motion.div>

        <div className="products__grid">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="product-card"
            >
              <div className="product-card__image-wrap">
                <img
                  src={PRODUCT_IMAGES[index]}
                  alt={product.name}
                  className="product-card__image"
                />
              </div>

              <div className="product-card__body">
                <div className="product-card__top">
                  <h3 className="product-card__name">{product.name}</h3>
                  <span className="product-card__arrow-icon">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <span className="product-card__tag">{product.tag}</span>
                <p className="product-card__desc">{product.desc}</p>
              </div>

              <div className="product-card__bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}