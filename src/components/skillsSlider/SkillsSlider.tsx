import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

import { motion, AnimatePresence } from 'framer-motion';

import { skillsData } from '@/data/skillsData';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const SkillsSlider = () => {
  const { t } = useTranslation();

  const isTouchDevice = useIsTouchDevice(640);

  const {
    itemsPerSlide,
    currentIndex,
    nextSlide,
    prevSlide,
    setCurrentIndex,
    stopAutoSlide,
    startAutoSlide,
  } = useSlider({
    dataLength: skillsData.length,
    itemsPerSlideDefault: 3,
    breakpoints: [
      { max: 640, items: 1 },
      { max: 1024, items: 2 },
    ],
  });

  const totalSlides = useMemo(() => Math.ceil(skillsData.length / itemsPerSlide), [itemsPerSlide]);

  const visibleSkills = useMemo(() => {
    const end = currentIndex + itemsPerSlide;

    return end <= skillsData.length
      ? skillsData.slice(currentIndex, end)
      : [...skillsData.slice(currentIndex), ...skillsData.slice(0, end - skillsData.length)];
  }, [currentIndex, itemsPerSlide]);

  return (
    <div className="skills-slider" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
      <div className="skills-slider__wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="skills-slider__inner"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            drag={isTouchDevice ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={stopAutoSlide}
            onDragEnd={(_, info) => {
              startAutoSlide();

              if (info.offset.x < -50) {
                nextSlide();
              } else if (info.offset.x > 50) {
                prevSlide();
              }
            }}
          >
            {visibleSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                title={skill.title}
                icon={skill.icon}
                description={t(skill.description)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {!isTouchDevice && (
        <div className="skills-slider__controls">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              role="button"
              aria-label={`Go to slide ${i + 1}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentIndex(i * itemsPerSlide)}
              key={i}
              className={`skills-slider__dot ${
                Math.floor(currentIndex / itemsPerSlide) === i ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(i * itemsPerSlide)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSlider;
