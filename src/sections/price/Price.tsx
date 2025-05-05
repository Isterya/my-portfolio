import { useTranslation } from 'react-i18next';

import { useRef } from 'react';

import { useCarousel } from '@/hooks/useCarousel';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

import PriceCard from '@/components/priceCard/PriceCard';
import { priceData } from '@/data/priceData';

import firstAbstract from '@/assets/img/skills/abstract-figure-1.png';
import thirdAbstract from '@/assets/img/skills/abstract-figure-3.png';

import './price.scss';

const Price = () => {
  const { t } = useTranslation();

  const trackRef = useRef<HTMLDivElement | null>(null);

  const isTouchDevice = useIsTouchDevice(1024);

  useCarousel(trackRef, 1.5, isTouchDevice);

  const renderedData = isTouchDevice ? [...priceData] : [...priceData, ...priceData, ...priceData];

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
