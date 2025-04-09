import PriceCard from '../../components/priceCard/PriceCard';
import { priceData } from '../../data/priceData';

import './price.scss';

const Price = () => {
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
        <div className="price-carousel__track">
          {priceData.concat(priceData).map((price) => (
            <PriceCard
              key={price.id}
              {...price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Price;
