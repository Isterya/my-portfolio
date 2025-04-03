import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { skillsData } from '../../data/skillsData';

import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(skillsData.length / itemsPerSlide);

  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerSlide);
  };

  return (
    <div className="skills-slider">
      <div className="skills-slider__wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="skills-slider__inner"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {skillsData
              .slice(currentIndex, currentIndex + itemsPerSlide)
              .map((skill, index) => (
                <SkillCard
                  key={index}
                  {...skill}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="skills-slider__controls">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`skills-slider__dot ${
              currentIndex === i * itemsPerSlide ? 'active' : ''
            }`}
            onClick={() => goToSlide(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSlider;
