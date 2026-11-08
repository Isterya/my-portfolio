import { useTranslation } from 'react-i18next';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

import { MARQUEE_COPIES, useCarousel } from '@/hooks/useCarousel';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useMaxWidth } from '@/hooks/useMaxWidth';

import PriceCard from '@/components/priceCard/PriceCard';
import { priceData } from '@/data/priceData';

import firstAbstract from '@/assets/img/skills/abstract-figure-1.webp';
import thirdAbstract from '@/assets/img/skills/abstract-figure-3.webp';

import './price.scss';

const Price = () => {
  const { t } = useTranslation();

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isNarrowScreen = useMaxWidth(1024);
  const prefersReducedMotion = useReducedMotion();
  const isCarouselInView = useInView(carouselRef);

  const isMarquee = !isNarrowScreen && !prefersReducedMotion;

  useCarousel(trackRef, { disabled: !isMarquee, paused: !isCarouselInView });

  const renderedData = isMarquee
    ? Array.from({ length: MARQUEE_COPIES }, (_, copy) =>
        priceData.map((price) => ({ ...price, key: `${price.id}-${copy}`, isDuplicate: copy > 0 })),
      ).flat()
    : priceData.map((price) => ({ ...price, key: `${price.id}`, isDuplicate: false }));

  useRevealOnScroll(trackRef, { resetKey: renderedData.length });

  return (
    <section id="price" className="price" aria-labelledby="price-title">
      <div className="container">
        <div className="price-wrapper">
          <div className="price-header">
            <div className="price-header__content">
              <h2 id="price-title" className="price-header__title">
                {t('price.title.before')} <span>{t('price.title.highlight')}</span>
              </h2>
              <p className="price-header__descr">{t('price.description')}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`price-carousel${isMarquee ? '' : ' price-carousel--static'}`}
        ref={carouselRef}
        {...(!isMarquee && {
          tabIndex: 0,
          role: 'region',
          'aria-label': t('a11y.priceList'),
        })}
      >
        <div className="price-carousel__track" ref={trackRef}>
          {renderedData.map((price) => (
            <PriceCard
              key={price.key}
              title={t(price.title)}
              icon={price.icon}
              price={price.price}
              description={t(price.description)}
              isDuplicate={price.isDuplicate}
            />
          ))}
        </div>
      </div>

      <img
        className="price__first-abstract"
        src={firstAbstract}
        alt=""
        width={594}
        height={601}
        loading="lazy"
        decoding="async"
      />
      <img
        className="price__third-abstract"
        src={thirdAbstract}
        alt=""
        width={873}
        height={828}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};

export default Price;
