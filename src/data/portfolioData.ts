import { v4 as uuidv4 } from 'uuid';

import firstBg from '../assets/img/works/portf-work-1.webp';
import secondBg from '../assets/img/works/portf-work-2.webp';

import thirdBg from '../assets/img/works/portf-work-3.webp';
import fourthBg from '../assets/img/works/portf-work-4.webp';

import fifthBg from '../assets/img/works/portf-work-5.webp';
import sixthBg from '../assets/img/works/portf-work-6.webp';

export interface PortfolioData {
  id: string;
  title: string;
  background: string;
  description: string;
  link: string;
}

export const portfolioData: PortfolioData[] = [
  {
    id: uuidv4(),
    title: 'Uber',
    background: firstBg,
    description: 'portfolio.uber.description',
    link: 'https://uber-tau-jade.vercel.app/',
  },
  {
    id: uuidv4(),
    title: 'Diary',
    background: secondBg,
    description: 'portfolio.diary.description',
    link: 'https://school-diary-virid.vercel.app/',
  },

  {
    id: uuidv4(),
    title: 'Art',
    background: thirdBg,
    description: 'portfolio.art.description',
    link: 'https://picture-art-two.vercel.app/',
  },
  {
    id: uuidv4(),
    title: 'Marvel',
    background: fourthBg,
    description: 'portfolio.marvel.description',
    link: 'https://marvel-chi-eight.vercel.app/',
  },

  {
    id: uuidv4(),
    title: 'Coffee Shop',
    background: fifthBg,
    description: 'portfolio.coffee.description',
    link: 'https://coffee-two-gilt.vercel.app/',
  },
  {
    id: uuidv4(),
    title: 'Irvas',
    background: sixthBg,
    description: 'portfolio.irvas.description',
    link: 'https://irvas-pied.vercel.app/',
  },
];
