import PriceCard from '../../components/priceCard/PriceCard';

import './price.scss';

import landingIcon from '../../assets/icons/price/landing.svg';
import infoIcon from '../../assets/icons/price/informational.svg';
import commerceIcon from '../../assets/icons/price/e-commerce.svg';
import webAppIcon from '../../assets/icons/price/web-application.svg';
import corporateIcon from '../../assets/icons/price/corporate.svg';
import customIcon from '../../assets/icons/price/custom.svg';

const priceData = [
  {
    id: 1,
    title: 'Landing Page',
    icon: landingIcon,
    price: 75,
    description:
      'A single-page website for showcasing services or products. Ideal for startups, individual specialists, and small businesses.',
  },
  {
    id: 2,
    title: 'Informational Website',
    icon: infoIcon,
    price: 90,
    description:
      'A website for blogs, portfolios, or news platforms. A great solution for delivering content to your audience.',
  },
  {
    id: 3,
    title: 'E-commerce Website',
    icon: commerceIcon,
    price: 120,
    description:
      'A full-featured online sales tool with payment system integration, a product catalog, filters, and a shopping cart.',
  },
  {
    id: 4,
    title: 'Web Application',
    icon: webAppIcon,
    price: 150,
    description:
      'A browser-based application with interactive features. Built with modern technologies to enhance user experience.',
  },
  {
    id: 5,
    title: 'Corporate Website',
    icon: corporateIcon,
    price: 100,
    description:
      'A business-oriented website with scalable features, such as internal CRM, booking forms, or analytics integration.',
  },
  {
    id: 6,
    title: 'Custom Project',
    icon: customIcon,
    price: 'negotiable' as 'negotiable',
    description:
      'A tailor-made website with a unique design and functionality to meet your specific needs and preferences.',
  },
];

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
