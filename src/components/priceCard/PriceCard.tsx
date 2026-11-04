import { useTranslation } from 'react-i18next';

import './priceCard.scss';

interface PriceCardProps {
  title: string;
  icon: string;
  price: number | string;
  description: string;
  /** A visual duplicate in the endless marquee: hidden from assistive technology. */
  isDuplicate?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  icon,
  price,
  description,
  isDuplicate = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="price-card" aria-hidden={isDuplicate || undefined}>
      <div className="price-card__header">
        <img src={icon} alt="" className="price-card__icon" loading="lazy" decoding="async" />

        <div className="price-card__text">
          <h3 className="price-card__title">{title}</h3>
          <p className="price-card__cost">
            {typeof price === 'number'
              ? `${t('price.from')} $${price}`
              : `${t('price.negotiable.before')} ${t('price.negotiable.after')}`}
          </p>
        </div>
      </div>

      <p className="price-card__descr">{description}</p>
    </div>
  );
};

export default PriceCard;
