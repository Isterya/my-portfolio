import htmlIcon from '../assets/icons/skills/html.svg';
import cssIcon from '../assets/icons/skills/css.svg';
import jsIcon from '../assets/icons/skills/js.svg';

import tsIcon from '../assets/icons/skills/ts.svg';
import jqueryIcon from '../assets/icons/skills/jquery.svg';
import sassIcon from '../assets/icons/skills/sass.svg';

import bootstrapIcon from '../assets/icons/skills/bootstrap.svg';
import gitIcon from '../assets/icons/skills/git.svg';
import reactIcon from '../assets/icons/skills/react.svg';

import reduxIcon from '../assets/icons/skills/redux.svg';
import tailwindIcon from '../assets/icons/skills/tailwind-css.svg';
import figmaIcon from '../assets/icons/skills/figma.svg';

import nextIcon from '../assets/icons/skills/next.svg';
import expressIcon from '../assets/icons/skills/express.svg';

import i18nextIcon from '../assets/icons/skills/i18next.svg';

export interface SkillsData {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const skillsData: SkillsData[] = [
  {
    id: 'html',
    title: 'HTML5',
    icon: htmlIcon,
    description: 'skills.html.description',
  },
  {
    id: 'css',
    title: 'CSS3',
    icon: cssIcon,
    description: 'skills.css.description',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: jsIcon,
    description: 'skills.javascript.description',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: tsIcon,
    description: 'skills.typescript.description',
  },
  {
    id: 'jquery',
    title: 'jQuery',
    icon: jqueryIcon,
    description: 'skills.jquery.description',
  },
  {
    id: 'sass',
    title: 'SASS / SCSS',
    icon: sassIcon,
    description: 'skills.sass.description',
  },
  {
    id: 'bootstrap',
    title: 'Bootstrap 5',
    icon: bootstrapIcon,
    description: 'skills.bootstrap.description',
  },
  {
    id: 'git',
    title: 'Git',
    icon: gitIcon,
    description: 'skills.git.description',
  },
  {
    id: 'react',
    title: 'React',
    icon: reactIcon,
    description: 'skills.react.description',
  },
  {
    id: 'redux',
    title: 'Redux',
    icon: reduxIcon,
    description: 'skills.redux.description',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    icon: tailwindIcon,
    description: 'skills.tailwind.description',
  },
  {
    id: 'figma',
    title: 'Figma',
    icon: figmaIcon,
    description: 'skills.figma.description',
  },
  {
    id: 'next',
    title: 'Next.js',
    icon: nextIcon,
    description: 'skills.next.description',
  },
  {
    id: 'express',
    title: 'Express.js',
    icon: expressIcon,
    description: 'skills.express.description',
  },
  {
    id: 'i18next',
    title: 'i18next',
    icon: i18nextIcon,
    description: 'skills.i18next.description',
  },
];
