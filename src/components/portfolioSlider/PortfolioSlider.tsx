import { useTranslation } from 'react-i18next';

import { useSlider } from '@/hooks/useSlider';
import { useAutoplay } from '@/hooks/useAutoplay';
import { useState } from 'react';

import { motion, AnimatePresence } from 'motion/react';

import PortfolioCard from '../portfolioCard/PortfolioCard';
import { portfolioData } from '@/data/portfolioData';

import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

import './portfolioSlider.scss';

const SLIDES_BREAKPOINTS = [{ max: 1024, items: 1 }];

const PortfolioSlider = () => {
  const { t } = useTranslation();

  const { itemsPerSlide, currentIndex, currentPage, pageCount, nextSlide, prevSlide, goToPage } =
    useSlider({
      dataLength: portfolioData.length,
      itemsPerSlideDefault: 2,
      breakpoints: SLIDES_BREAKPOINTS,
    });

  const { ref: autoplayRef, handlers: autoplayHandlers } = useAutoplay<HTMLDivElement>(nextSlide, {
    resetKey: currentPage,
  });

  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handlePrev = () => {
    setDirection('prev');
    prevSlide();
  };

  const handleNext = () => {
    setDirection('next');
    nextSlide();
  };

  return (
    <div className="portfolio-slider" ref={autoplayRef} {...autoplayHandlers}>
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
                image={card.image}
                description={t(card.description)}
                link={card.link}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          className="portfolio-slider__arrow portfolio-slider__arrow--left"
          onClick={handlePrev}
          aria-label={t('a11y.prevSlide')}
        >
          <img src={arrowLeft} alt="" />
        </button>

        <button
          className="portfolio-slider__arrow portfolio-slider__arrow--right"
          onClick={handleNext}
          aria-label={t('a11y.nextSlide')}
        >
          <img src={arrowRight} alt="" />
        </button>
      </div>

      <div className="portfolio-slider__controls">
        {Array.from({ length: pageCount }, (_, page) => page).map((page) => (
          <button
            type="button"
            key={page}
            className={`portfolio-slider__dot ${currentPage === page ? 'active' : ''}`}
            aria-label={t('a11y.goToSlide', { number: page + 1 })}
            aria-current={currentPage === page ? 'true' : undefined}
            onClick={() => goToPage(page)}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlider;
