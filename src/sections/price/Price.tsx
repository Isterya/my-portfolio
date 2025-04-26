import { useTranslation } from 'react-i18next';

import { useRef } from 'react';

import { useCarousel } from '../../hooks/useCarousel';

import PriceCard from '../../components/priceCard/PriceCard';
import { priceData } from '../../data/priceData';

import firstAbstract from '../../assets/img/skills/abstract-figure-1.png';
import thirdAbstract from '../../assets/img/skills/abstract-figure-3.png';

import './price.scss';

const Price = () => {
  const { t } = useTranslation();

  const renderedData = [...priceData, ...priceData, ...priceData];

  const trackRef = useRef<HTMLDivElement | null>(null);

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;

  useCarousel(trackRef, 1.5, isTouchDevice);

  return (
    <section id="price" className="price">
      <div className="container">
        <div className="price-wrapper">
          <div className="price-header">
            <div className="price-header__content">
              <h2 className="price-header__title">
                {t('price.title.before')} <span>{t('price.title.highlight')}</span>
              </h2>
              <p className="price-header__descr">{t('price.description')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`price-carousel${isTouchDevice ? ' touch' : ''}`}>
        <div className="price-carousel__track" ref={trackRef}>
          {renderedData.map((price, i) => (
            <PriceCard
              key={`${price.id}-${i}`}
              title={t(price.title)}
              icon={price.icon}
              price={price.price}
              description={t(price.description)}
            />
          ))}
        </div>
      </div>

      <img className="price__first-abstract" src={firstAbstract} alt="First abstract figure" />
      <img className="price__third-abstract" src={thirdAbstract} alt="Third abstract figure" />
    </section>
  );
};

export default Price;
