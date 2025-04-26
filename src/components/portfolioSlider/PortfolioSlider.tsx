import { useTranslation } from 'react-i18next';

import { useMemo, useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import PortfolioCard from '../portfolioCard/PorfolioCard';
import { portfolioData } from '@/data/portfolioData';

import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

import './portfolioSlider.scss';

const itemsPerSlide = 2;
const intervalTime = 5000;

const PortfolioSlider = () => {
  const { t } = useTranslation();

  const totalItems = useMemo(() => portfolioData.length, []);
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= portfolioData.length ? 0 : prevIndex + itemsPerSlide,
    );
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex(
      (prevIndex) => (prevIndex - itemsPerSlide + portfolioData.length) % portfolioData.length,
    );
  }, [totalItems]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();

    autoSlideRef.current = setInterval(nextSlide, intervalTime);
  }, [nextSlide, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();

    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  return (
    <div className="portfolio-slider" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
      <div className="portfolio-slider__wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="portfolio-slider__inner"
            initial={{
              opacity: 0,
              x: direction === 'next' ? 100 : -100,
              scale: 0.95,
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: direction === 'next' ? -100 : 100,
              scale: 0.95,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {portfolioData.slice(currentIndex, currentIndex + itemsPerSlide).map((card) => (
              <PortfolioCard
                key={card.id}
                title={card.title}
                background={card.background}
                description={t(card.description)}
                link={card.link}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="portfolio-slider__arrow portfolio-slider__arrow--left"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <img src={arrowLeft} alt="prev" />
      </button>

      <button
        className="portfolio-slider__arrow portfolio-slider__arrow--right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <img src={arrowRight} alt="next" />
      </button>

      <div className="portfolio-slider__controls">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`portfolio-slider__dot ${
              Math.floor(currentIndex / itemsPerSlide) === i ? 'active' : ''
            }`}
            onClick={() => setCurrentIndex(i * itemsPerSlide)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlider;
