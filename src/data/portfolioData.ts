import { v4 as uuidv4 } from 'uuid';

import firstBg from '../assets/img/works/portf-work-1.jpg';
import secondBg from '../assets/img/works/portf-work-2.jpg';

import thirdBg from '../assets/img/works/portf-work-3.jpg';
import fourthBg from '../assets/img/works/portf-work-4.jpg';

import fifthBg from '../assets/img/works/portf-work-5.jpg';
import sixthBg from '../assets/img/works/portf-work-6.jpg';

export interface PortfolioData {
  id: string;
  title: string;
  background: string;
  description: string;
}

export const portfolioData: PortfolioData[] = [
  {
    id: uuidv4(),
    title: 'Uber',
    background: firstBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Diary',
    background: secondBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },

  {
    id: uuidv4(),
    title: 'Art',
    background: thirdBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Marvel',
    background: fourthBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },

  {
    id: uuidv4(),
    title: 'Coffee Shop',
    background: fifthBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
  {
    id: uuidv4(),
    title: 'Irvas',
    background: sixthBg,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim.',
  },
];
