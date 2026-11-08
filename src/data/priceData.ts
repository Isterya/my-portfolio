import landingIcon from '../assets/icons/price/landing.svg';
import infoIcon from '../assets/icons/price/informational.svg';
import commerceIcon from '../assets/icons/price/e-commerce.svg';
import webAppIcon from '../assets/icons/price/web-application.svg';
import corporateIcon from '../assets/icons/price/corporate.svg';
import customIcon from '../assets/icons/price/custom.svg';

export interface PriceData {
  id: string;
  title: string;
  icon: string;
  price: number | string;
  description: string;
}

export const priceData: PriceData[] = [
  {
    id: 'landing',
    title: 'price.priceCards.landing.title',
    icon: landingIcon,
    price: 350,
    description: 'price.priceCards.landing.description',
  },
  {
    id: 'info',
    title: 'price.priceCards.info.title',
    icon: infoIcon,
    price: 500,
    description: 'price.priceCards.info.description',
  },
  {
    id: 'ecommerce',
    title: 'price.priceCards.ecommerce.title',
    icon: commerceIcon,
    price: 1000,
    description: 'price.priceCards.ecommerce.description',
  },
  {
    id: 'webapp',
    title: 'price.priceCards.webapp.title',
    icon: webAppIcon,
    price: 1200,
    description: 'price.priceCards.webapp.description',
  },
  {
    id: 'corporate',
    title: 'price.priceCards.corporate.title',
    icon: corporateIcon,
    price: 800,
    description: 'price.priceCards.corporate.description',
  },
  {
    id: 'custom',
    title: 'price.priceCards.custom.title',
    icon: customIcon,
    price: 'price.negotiable',
    description: 'price.priceCards.custom.description',
  },
];
