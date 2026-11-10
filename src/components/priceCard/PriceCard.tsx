import { useTranslation } from 'react-i18next';

import arrowUp from '@/assets/icons/hero/arrow-up.svg';

import './priceCard.scss';

interface PriceCardProps {
  title: string;
  icon: string;
  price: number | string;
  description: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ title, icon, price, description }) => {
  const { t } = useTranslation();

  const hasFixedPrice = typeof price === 'number';

  const content = (
    <>
      <img
        src={icon}
        alt=""
        className="price-card__icon"
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
      />

      <h3 className="price-card__title">{title}</h3>

      {hasFixedPrice ? (
        <p className="price-card__cost">
          {t('price.from')} <strong className="price-card__amount">${price}</strong>
        </p>
      ) : (
        <p className="price-card__cost">
          {t('price.negotiable.before')} {t('price.negotiable.after')}
          <span className="price-card__arrow">
            <img src={arrowUp} alt="" />
          </span>
        </p>
      )}

      <p className="price-card__descr">{description}</p>
    </>
  );

  if (hasFixedPrice) {
    return <article className="price-card">{content}</article>;
  }

  return (
    <a className="price-card price-card--custom" href="#contact">
      {content}
    </a>
  );
};

export default PriceCard;
