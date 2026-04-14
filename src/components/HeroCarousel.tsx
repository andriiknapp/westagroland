import { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import heroWheat from '../assets/images/hero-wheat.png';
import heroSunflower from '../assets/images/hero-sunflower.png';
import heroMachinery from '../assets/images/hero-machinery.png';
import './HeroCarousel.css';

const SLIDES = [
  { id: 1, image: heroWheat,     headline: 'Надійний партнер у світовому агроекспорті',  sub: 'Якість, підтверджена роками досвіду на міжнародних ринках.' },
  { id: 2, image: heroSunflower, headline: 'Соняшник і ріпак — від поля до порту',        sub: 'Прямі поставки без посередників. Прозорі умови. Надійна логістика.' },
  { id: 3, image: heroMachinery, headline: 'Збір врожаю світового рівня',                 sub: 'Сучасна техніка та агрономічні стандарти ЄС на кожному етапі.' },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25, containScroll: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const scrollTo   = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // ✅ Embla v8 — .on() returns the api itself, NOT an unsubscribe fn.
  //    Use .off() in the cleanup instead.
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
            <h1 className="hero__headline">{slide.headline}</h1>
            <p className="hero__sub">{slide.sub}</p>
            <div className="hero__actions">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero__btn-primary"
              >
                Залишити заявку <ArrowRight size={16} />
              </button>
              <a href="#products" className="hero__btn-ghost">Наша продукція</a>
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