import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { skillsData } from '../../data/skillsData';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const itemsPerSlide = 3;
const intervalTime = 5000;

const SkillsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = Math.ceil(skillsData.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + itemsPerSlide) % skillsData.length);
  }, []);

  useEffect(() => {
    autoSlideRef.current = setInterval(nextSlide, intervalTime);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [nextSlide]);

  const stopAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(nextSlide, intervalTime);
  };

  return (
    <div
      className="skills-slider"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="skills-slider__wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="skills-slider__inner"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {skillsData
              .slice(currentIndex, currentIndex + itemsPerSlide)
              .map((skill) => (
                <SkillCard
                  key={skill.id}
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
            onClick={() => setCurrentIndex(i * itemsPerSlide)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSlider;
