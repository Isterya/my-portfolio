import firstBg from '../assets/img/works/portf-work-1.jpg';
import secondBg from '../assets/img/works/portf-work-2.jpg';

import thirdBg from '../assets/img/works/portf-work-3.jpg';
import fourthBg from '../assets/img/works/portf-work-4.jpg';

import fifthBg from '../assets/img/works/portf-work-5.jpg';
import sixthBg from '../assets/img/works/portf-work-6.jpg';

export interface PortfolioData {
  title: string;
  background: string;
  description: string;
  link: string;
}

export const portfolioRawData: PortfolioData[] = [
  {
    title: 'Uber',
    background: firstBg,
    description:
      'Landing page for a leading taxi service, focused on clean responsive design and cross-device compatibility. Built with Bootstrap grid and SASS, ensuring a pixel-perfect adaptive layout.',
    link: 'https://uber.purrcode.ru/',
  },
  {
    title: 'Diary',
    background: secondBg,
    description:
      'SPA designed to present subject information in a clear and structured way. Uses Redux Toolkit for state management and includes an email subscription feature.',
    link: 'https://diary.purrcode.ru/',
  },

  {
    title: 'Art',
    background: thirdBg,
    description:
      'Website with dynamic filters, animations, and typical UI/UX challenges — a real-world practice of building large layouts and solving front-end tasks.',
    link: 'https://art.purrcode.ru/',
  },
  {
    title: 'Marvel',
    background: fourthBg,
    description:
      'Dynamic web app fetching content directly from Marvel API. Allows users to explore characters and comics — a solid case of working with third-party APIs and dynamic content rendering.',
    link: 'https://marvel.purrcode.ru/',
  },

  {
    title: 'Coffee Shop',
    background: fifthBg,
    description:
      'React-based coffee shop website built entirely with class components. Focused on mastering component architecture and working with dynamic content.',
    link: 'https://coffee.purrcode.ru/',
  },
  {
    title: 'Irvas',
    background: sixthBg,
    description:
      'Corporate-style responsive website with extra attention to design details and UX. Includes a custom-built dynamic calculator for real-time price estimation.',
    link: 'https://irvas.purrcode.ru/',
  },
];
