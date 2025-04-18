import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import PortfolioCard from '../portfolioCard/PorfolioCard';
import { portfolioRawData } from '../../data/portfolioData';

import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';

import './portfolioSlider.scss';

const itemsPerSlide = 2;
const intervalTime = 5000;

const PortfolioSlider = () => {
  const portfolioData = useMemo(() => {
    return portfolioRawData.map((item) => ({
      ...item,
      id: uuidv4(),
    }));
  }, []);

  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = Math.ceil(portfolioData.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= portfolioData.length
        ? 0
        : prevIndex + itemsPerSlide
    );
  }, [portfolioData]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - itemsPerSlide + portfolioData.length) %
        portfolioData.length
    );
  }, [portfolioData]);

  useEffect(() => {
    autoSlideRef.current = setInterval(nextSlide, intervalTime);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [nextSlide]);

  const stopAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(nextSlide, intervalTime);
  };

  return (
    <div
      className="portfolio-slider"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
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
            {portfolioData
              .slice(currentIndex, currentIndex + itemsPerSlide)
              .map((card) => (
                <PortfolioCard
                  key={card.id}
                  {...card}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="portfolio-slider__arrow portfolio-slider__arrow--left"
        onClick={prevSlide}
      >
        <img
          src={arrowLeft}
          alt="prev"
        />
      </button>

      <button
        className="portfolio-slider__arrow portfolio-slider__arrow--right"
        onClick={nextSlide}
      >
        <img
          src={arrowRight}
          alt="next"
        />
      </button>

      <div className="portfolio-slider__controls">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`portfolio-slider__dot ${
              currentIndex === i * itemsPerSlide ? 'active' : ''
            }`}
            onClick={() => setCurrentIndex(i * itemsPerSlide)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlider;
