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
    description:
      'The backbone of any website. The fifth version of HTML provides a solid, SEO-friendly structure, ensuring a robust foundation for modern web applications.',
  },
  {
    id: uuidv4(),
    title: 'CSS3',
    icon: cssIcon,
    description:
      'More than just styling—CSS3 is the art of visual storytelling. With it, I transform concepts into sleek, responsive, and engaging designs. The only limit is imagination.',
  },
  {
    id: uuidv4(),
    title: 'JavaScript',
    icon: jsIcon,
    description:
      'The engine of interactivity. JavaScript breathes life into web applications, enabling dynamic animations, interactive elements, and seamless user experiences.',
  },
  {
    id: uuidv4(),
    title: 'TypeScript',
    icon: tsIcon,
    description:
      'A game-changer for scalable development. TypeScript enhances JavaScript with strong typing, ensuring reliability, maintainability, and a more structured codebase for complex applications.',
  },
  {
    id: uuidv4(),
    title: 'jQuery',
    icon: jqueryIcon,
    description:
      'A time-tested library that simplifies DOM manipulation and event handling. While modern frameworks often take the lead, I can efficiently integrate jQuery where it adds value.',
  },
  {
    id: uuidv4(),
    title: 'SASS / SCSS',
    icon: sassIcon,
    description:
      'Efficiency meets flexibility. With these preprocessors, I write cleaner, more maintainable styles, leveraging variables, nesting, and mixins for a streamlined workflow.',
  },
  {
    id: uuidv4(),
    title: 'Bootstrap 5',
    icon: bootstrapIcon,
    description:
      'A powerful UI toolkit that accelerates development with pre-designed components and responsive grids. While I favor custom solutions, I can seamlessly implement Bootstrap when needed.',
  },
  {
    id: uuidv4(),
    title: 'Git',
    icon: gitIcon,
    description:
      'The backbone of collaborative development. I confidently use Git for version control, ensuring smooth code management, rollback capabilities, and streamlined teamwork.',
  },
  {
    id: uuidv4(),
    title: 'React',
    icon: reactIcon,
    description:
      "A cutting-edge library for building fast, interactive, and scalable user interfaces. With React, I craft intuitive experiences tailored to users' needs and business goals.",
  },
  {
    id: uuidv4(),
    title: 'Redux',
    icon: reduxIcon,
    description:
      'A robust state management solution providing a single source of truth. I leverage Redux, RTK, and RTK Query to ensure predictable, scalable application architecture.',
  },
  {
    id: uuidv4(),
    title: 'Tailwind CSS',
    icon: tailwindIcon,
    description:
      'Utility-first styling done right. Tailwind allows for rapid prototyping and clean, maintainable code, making UI development faster without compromising design flexibility.',
  },
  {
    id: uuidv4(),
    title: 'Figma',
    icon: figmaIcon,
    description:
      'From concept to pixel-perfect execution. Figma enables seamless collaboration and precision in UI/UX design, ensuring smooth transitions from wireframes to final interfaces.',
  },
];
