import { useState } from 'react';

import SkillCard from '../skillCard/SkillCard';

import htmlIcon from '../../assets/icons/skills/html.svg';
import cssIcon from '../../assets/icons/skills/css.svg';
import jsIcon from '../../assets/icons/skills/js.svg';

import './skillsSlider.scss';

const skillsData = [
  {
    title: 'HTML5',
    icon: htmlIcon,
    description:
      'The backbone of any website. The fifth version of HTML provides a solid, SEO-friendly structure, ensuring a robust foundation for modern web applications.',
  },
  {
    title: 'CSS3',
    icon: cssIcon,
    description:
      'More than just styling—CSS3 is the art of visual storytelling. With it, I transform concepts into sleek, responsive, and engaging designs. The only limit is imagination.',
  },
  {
    title: 'JavaScript',
    icon: jsIcon,
    description:
      'The engine of interactivity. JavaScript breathes life into web applications, enabling dynamic animations, interactive elements, and seamless user experiences.',
  },
  { title: 'Node.js', icon: 'node.svg', description: 'Backend runtime' },
  { title: 'Next.js', icon: 'nextjs.svg', description: 'Fullstack framework' },
  { title: 'Sass', icon: 'sass.svg', description: 'CSS preprocessor' },
];

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev + 3) % skillsData.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prev) => (prev - 3 + skillsData.length) % skillsData.length
  //   );
  // };

  return (
    <div className="skills-slider">
      <div className="skills-slider__wrapper">
        {skillsData
          .slice(currentIndex, currentIndex + 3)
          .map((skill, index) => (
            <SkillCard
              key={index}
              {...skill}
            />
          ))}
      </div>

      <div className="skills-slider__controls">
        <div
          style={{
            borderRadius: '21px',
            width: '60px',
            height: '15px',
            background: 'linear-gradient(90deg, #f8ba2b 0%, #ff7f00 70%)',
          }}
        ></div>
        <div
          style={{
            borderRadius: '21px',
            width: '15px',
            height: '15px',
            background: '#e4e7ec',
          }}
        ></div>
        <div
          style={{
            borderRadius: '21px',
            width: '15px',
            height: '15px',
            background: '#e4e7ec',
          }}
        ></div>
        <div
          style={{
            borderRadius: '21px',
            width: '15px',
            height: '15px',
            background: '#e4e7ec',
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillsSlider;
