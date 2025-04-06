import { useCallback, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import PortfolioCard from '../portfolioCard/PorfolioCard';

import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';

import './portfolioSlider.scss';

import firstBg from '../../assets/img/works/portf-work-1.jpg';
import secondBg from '../../assets/img/works/portf-work-2.jpg';
import thirdBg from '../../assets/img/works/portf-work-3.jpg';
import fourthBg from '../../assets/img/works/portf-work-4.jpg';
import fifthBg from '../../assets/img/works/portf-work-5.jpg';
import sixthBg from '../../assets/img/works/portf-work-6.jpg';

const portfolioData = [
  {
    id: uuidv4(),
    title: 'Uber',
    background: firstBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Diary',
    background: secondBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },

  {
    id: uuidv4(),
    title: 'Art',
    background: thirdBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Marvel',
    background: fourthBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },

  {
    id: uuidv4(),
    title: 'Coffee Shop',
    background: fifthBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Irvas',
    background: sixthBg,
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

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? portfolioData.length - itemsPerSlide
        : prevIndex - itemsPerSlide
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

      {/* Стрелки */}
      <div
        className="portfolio-slider__arrow portfolio-slider__arrow--left"
        onClick={prevSlide}
      >
        <img
          src={arrowLeft}
          alt="prev"
        />
      </div>

      <div
        className="portfolio-slider__arrow portfolio-slider__arrow--right"
        onClick={nextSlide}
      >
        <img
          src={arrowRight}
          alt="next"
        />
      </div>

      {/* Точки */}
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
