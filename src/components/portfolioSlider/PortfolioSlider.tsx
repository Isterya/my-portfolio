import { useCallback, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import PortfolioCard from '../portfolioCard/PorfolioCard';

import './portfolioSlider.scss';

import uberBg from '../../assets/img/works/portf-work-1.jpg';
import diaryBg from '../../assets/img/works/portf-work-2.jpg';

const portfolioData = [
  {
    id: uuidv4(),
    title: 'Uber',
    background: uberBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Diary',
    background: diaryBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
];

const itemsPerSlide = 2;
const intervalTime = 5000;

const PortfolioSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = Math.ceil(portfolioData.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= portfolioData.length
        ? 0
        : prevIndex + itemsPerSlide
    );
  }, []);

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
        {portfolioData
          .slice(currentIndex, currentIndex + itemsPerSlide)
          .map((card) => (
            <PortfolioCard
              key={card.id}
              {...card}
            />
          ))}
      </div>

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
