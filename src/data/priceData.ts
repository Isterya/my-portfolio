import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
    title: 'price.priceCards.landing.title',
    icon: landingIcon,
    price: 75,
    description: 'price.priceCards.landing.description',
  },
  {
    id: uuidv4(),
    title: 'price.priceCards.info.title',
    icon: infoIcon,
    price: 90,
    description: 'price.priceCards.info.description',
  },
  {
    id: uuidv4(),
    title: 'price.priceCards.ecommerce.title',
    icon: commerceIcon,
    price: 120,
    description: 'price.priceCards.ecommerce.description',
  },
  {
    id: uuidv4(),
    title: 'price.priceCards.webapp.title',
    icon: webAppIcon,
    price: 150,
    description: 'price.priceCards.webapp.description',
  },
  {
    id: uuidv4(),
    title: 'price.priceCards.corporate.title',
    icon: corporateIcon,
    price: 100,
    description: 'price.priceCards.corporate.description',
  },
  {
    id: uuidv4(),
    title: 'price.priceCards.custom.title',
    icon: customIcon,
    price: 'price.negotiable',
    description: 'price.priceCards.custom.description',
  },
];
