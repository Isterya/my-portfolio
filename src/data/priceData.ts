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
  price: number | 'negotiable';
  description: string;
}

export const priceData: PriceData[] = [
  {
    id: uuidv4(),
    title: 'Landing Page',
    icon: landingIcon,
    price: 75,
    description: 'price.priceCards.landing',
  },
  {
    id: uuidv4(),
    title: 'Informational Website',
    icon: infoIcon,
    price: 90,
    description: 'price.priceCards.info',
  },
  {
    id: uuidv4(),
    title: 'E-commerce Website',
    icon: commerceIcon,
    price: 120,
    description: 'price.priceCards.ecommerce',
  },
  {
    id: uuidv4(),
    title: 'Web Application',
    icon: webAppIcon,
    price: 150,
    description: 'price.priceCards.webapp',
  },
  {
    id: uuidv4(),
    title: 'Corporate Website',
    icon: corporateIcon,
    price: 100,
    description: 'price.priceCards.corporate',
  },
  {
    id: uuidv4(),
    title: 'Custom Project',
    icon: customIcon,
    price: 'negotiable',
    description: 'price.priceCards.custom',
  },
];
