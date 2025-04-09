import './priceCard.scss';

interface PriceCardProps {
  title: string;
  icon: string;
  price: number | 'negotiable';
  description: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  icon,
  price,
  description,
}) => {
  return (
    <div className="price-card">
      <div className="price-card__header">
        <img
          src={icon}
          alt="Icon for price card"
          className="price-card__icon"
        />

        <div className="price-card__text">
          <h3 className="price-card__title">{title}</h3>
          <p className="price-card__cost">
            {typeof price === 'number' ? `from $${price}` : `price ${price}`}
          </p>
        </div>
      </div>

      <p className="price-card__descr">{description}</p>
    </div>
  );
};

export default PriceCard;
