import { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Импортируем Link
import heroWheat from '../assets/images/hero-wheat.png';
import heroSunflower from '../assets/images/hero-sunflower.png';
import heroMachinery from '../assets/images/hero-machinery.png';
import './HeroCarousel.css';

// Вместо хардкода текста храним ключи для i18next
const SLIDES = [
  { 
    id: 1, 
    image: heroWheat,     
    headlineKey: 'hero.slide1.headline',  
    subKey: 'hero.slide1.sub' 
  },
  { 
    id: 2, 
    image: heroSunflower, 
    headlineKey: 'hero.slide2.headline',        
    subKey: 'hero.slide2.sub' 
  },
  { 
    id: 3, 
    image: heroMachinery, 
    headlineKey: 'hero.slide3.headline',                 
    subKey: 'hero.slide3.sub' 
  },
];

export default function HeroCarousel() {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25, containScroll: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const scrollTo   = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    timerRef.current = window.setInterval(() => emblaApi.scrollNext(), 3500);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [emblaApi]);

  // Функция для плавного скролла (как в Navbar/Footer)
  const handleNavClick = (href: string) => {
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
    <section className="hero">
      <div className="hero__viewport" ref={emblaRef}>
        <div className="hero__container">
          {SLIDES.map((slide, i) => (
            <div key={slide.id} className="hero__slide">
              <img src={slide.image} alt="" className="hero__img" loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="hero__overlay" />
            </div>
          ))}
        </div>
      </div>

      <div className="hero__content">
        {SLIDES.map((slide, i) => (
          <div key={slide.id} className={`hero__text ${i === activeIndex ? 'hero__text--active' : ''}`}>
            {/* Рендерим переводы по ключам */}
            <h1 className="hero__headline">{t(slide.headlineKey)}</h1>
            <p className="hero__sub">{t(slide.subKey)}</p>
            <div className="hero__actions">
              {/* Заменили button и <a> на <Link> */}
              <Link to="/contact" className="hero__btn-primary">
                {t('hero.btnPrimary')} <ArrowRight size={16} />
              </Link>
              <Link 
                to="/#products" 
                className="hero__btn-ghost"
                onClick={() => handleNavClick('/#products')}
              >
                {t('hero.btnGhost')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__controls">
        <div className="hero__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`hero__dot ${i === activeIndex ? 'hero__dot--active' : ''}`}
            />
          ))}
        </div>
        <div className="hero__arrows">
          <button onClick={scrollPrev} className="hero__arrow" aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={scrollNext} className="hero__arrow" aria-label="Next"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="hero__fade" />
    </section>
  );
}