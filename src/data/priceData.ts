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
    description:
      'A single-page website for showcasing services or products. Ideal for startups, individual specialists, and small businesses.',
  },
  {
    id: uuidv4(),
    title: 'Informational Website',
    icon: infoIcon,
    price: 90,
    description:
      'A website for blogs, portfolios, or news platforms. A great solution for delivering content to your audience.',
  },
  {
    id: uuidv4(),
    title: 'E-commerce Website',
    icon: commerceIcon,
    price: 120,
    description:
      'A full-featured online sales tool with payment system integration, a product catalog, filters, and a shopping cart.',
  },
  {
    id: uuidv4(),
    title: 'Web Application',
    icon: webAppIcon,
    price: 150,
    description:
      'A browser-based application with interactive features. Built with modern technologies to enhance user experience.',
  },
  {
    id: uuidv4(),
    title: 'Corporate Website',
    icon: corporateIcon,
    price: 100,
    description:
      'A business-oriented website with scalable features, such as internal CRM, booking forms, or analytics integration.',
  },
  {
    id: uuidv4(),
    title: 'Custom Project',
    icon: customIcon,
    price: 'negotiable',
    description:
      'A tailor-made website with a unique design and functionality to meet your specific needs and preferences.',
  },
];
