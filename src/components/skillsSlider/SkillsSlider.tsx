import { useState } from 'react';

import { skillsData } from '../../data/skillsData';

import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const slidesCount = Math.ceil(skillsData.length / 3);

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="skills-slider">
      <div className="skills-slider__wrapper">
        {skillsData
          .slice(currentIndex * 3, currentIndex * 3 + 3)
          .map((skill, index) => (
            <SkillCard
              key={index}
              {...skill}
            />
          ))}
      </div>

      <div className="skills-slider__controls">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <div
            key={index}
            className={`skills-slider__dot ${
              currentIndex === index ? 'active' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSlider;
