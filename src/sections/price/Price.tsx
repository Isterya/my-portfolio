import { useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCarousel } from '../../hooks/useCarousel';

import PriceCard from '../../components/priceCard/PriceCard';
import { priceRawData } from '../../data/priceData';

import firstAbstract from '../../assets/img/skills/abstract-figure-1.png';
import thirdAbstract from '../../assets/img/skills/abstract-figure-3.png';

import './price.scss';

const Price = () => {
  const priceData = useMemo(() => {
    return priceRawData.map((item) => ({
      ...item,
      id: uuidv4(),
    }));
  }, []);

  const renderedData = [...priceData, ...priceData, ...priceData];

  const trackRef = useRef<HTMLDivElement | null>(null);

  useCarousel(trackRef, 1.5);

  return (
    <section
      id="price"
      className="price"
    >
      <div className="container">
        <div className="price-wrapper">
          <div className="price-header">
            <div className="price-header__content">
              <h2 className="price-header__title">
                My <span>Price</span>
              </h2>
              <p className="price-header__descr">
                Whether you need a sleek landing page, a powerful web
                application, or a full-scale eCommerce platform, I deliver
                modern, high-performance websites built with cutting-edge
                technologies. Choose a service that fits your goals, and let’s
                create something exceptional together.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="price-carousel">
        <div
          className="price-carousel__track"
          ref={trackRef}
        >
          {renderedData.map((price, i) => (
            <PriceCard
              key={`${price.id}-${i}`}
              {...price}
            />
          ))}
        </div>
      </div>

      <img
        className="price__first-abstract"
        src={firstAbstract}
        alt="First abstract figure"
      />
      <img
        className="price__third-abstract"
        src={thirdAbstract}
        alt="Third abstract figure"
      />
    </section>
  );
};

export default Price;
