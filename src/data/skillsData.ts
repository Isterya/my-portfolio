import { v4 as uuidv4 } from 'uuid';

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

export interface SkillsData {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const skillsData: SkillsData[] = [
  {
    id: uuidv4(),
    title: 'HTML5',
    icon: htmlIcon,
    description: 'skills.html.description',
  },
  {
    id: uuidv4(),
    title: 'CSS3',
    icon: cssIcon,
    description: 'skills.css.description',
  },
  {
    id: uuidv4(),
    title: 'JavaScript',
    icon: jsIcon,
    description: 'skills.javascript.description',
  },
  {
    id: uuidv4(),
    title: 'TypeScript',
    icon: tsIcon,
    description: 'skills.typescript.description',
  },
  {
    id: uuidv4(),
    title: 'jQuery',
    icon: jqueryIcon,
    description: 'skills.jquery.description',
  },
  {
    id: uuidv4(),
    title: 'SASS / SCSS',
    icon: sassIcon,
    description: 'skills.sass.description',
  },
  {
    id: uuidv4(),
    title: 'Bootstrap 5',
    icon: bootstrapIcon,
    description: 'skills.bootstrap.description',
  },
  {
    id: uuidv4(),
    title: 'Git',
    icon: gitIcon,
    description: 'skills.git.description',
  },
  {
    id: uuidv4(),
    title: 'React',
    icon: reactIcon,
    description: 'skills.react.description',
  },
  {
    id: uuidv4(),
    title: 'Redux',
    icon: reduxIcon,
    description: 'skills.redux.description',
  },
  {
    id: uuidv4(),
    title: 'Tailwind CSS',
    icon: tailwindIcon,
    description: 'skills.tailwind.description',
  },
  {
    id: uuidv4(),
    title: 'Figma',
    icon: figmaIcon,
    description: 'skills.figma.description',
  },
];
