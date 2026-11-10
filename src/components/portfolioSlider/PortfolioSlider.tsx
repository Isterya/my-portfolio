import { useTranslation } from 'react-i18next';

import { useSlider } from '@/hooks/useSlider';
import { useAutoplay } from '@/hooks/useAutoplay';
import { CSSProperties, useCallback, useState } from 'react';

import { m, AnimatePresence, type Variants } from 'motion/react';

import PortfolioCard from '../portfolioCard/PortfolioCard';
import { portfolioData } from '@/data/portfolioData';

import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

import './portfolioSlider.scss';

const SLIDES_BREAKPOINTS = [{ max: 1024, items: 1 }];

const SWIPE_DISTANCE = 50;

type SlideDirection = 'next' | 'prev';

const slideVariants: Variants = {
  enter: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction === 'next' ? 100 : -100,
    scale: 0.95,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction === 'next' ? -100 : 100,
    scale: 0.95,
  }),
};

const PortfolioSlider = () => {
  const { t } = useTranslation();

  const { itemsPerSlide, currentIndex, currentPage, pageCount, nextSlide, prevSlide, goToPage } =
    useSlider({
      dataLength: portfolioData.length,
      itemsPerSlideDefault: 2,
      breakpoints: SLIDES_BREAKPOINTS,
    });

  const [direction, setDirection] = useState<SlideDirection>('next');

  const autoAdvance = useCallback(() => {
    setDirection('next');
    nextSlide();
  }, [nextSlide]);

  const {
    ref: autoplayRef,
    handlers: autoplayHandlers,
    setIsDragging,
  } = useAutoplay<HTMLDivElement>(autoAdvance, { resetKey: currentPage });

  const handlePrev = () => {
    setDirection('prev');
    prevSlide();
  };

  const handleNext = () => {
    setDirection('next');
    nextSlide();
  };

  return (
    <div
      className="portfolio-slider"
      ref={autoplayRef}
      style={{ '--projects-per-slide': itemsPerSlide } as CSSProperties}
      {...autoplayHandlers}
    >
      <div className="portfolio-slider__wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={currentIndex}
            className="portfolio-slider__inner"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            drag={itemsPerSlide === 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);

              if (info.offset.x < -SWIPE_DISTANCE) {
                handleNext();
              } else if (info.offset.x > SWIPE_DISTANCE) {
                handlePrev();
              }
            }}
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
          </m.div>
        </AnimatePresence>

        <button
          type="button"
          className="portfolio-slider__arrow portfolio-slider__arrow--left"
          onClick={handlePrev}
          aria-label={t('a11y.prevSlide')}
        >
          <img src={arrowLeft} alt="" />
        </button>

        <button
          type="button"
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
            onClick={() => {
              setDirection(page > currentPage ? 'next' : 'prev');
              goToPage(page);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlider;
