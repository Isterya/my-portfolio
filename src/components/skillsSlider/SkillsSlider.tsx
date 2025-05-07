import { useTranslation } from 'react-i18next';

import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { motion, AnimatePresence } from 'framer-motion';

import { skillsData } from '@/data/skillsData';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const intervalTime = 5000;

const SkillsSlider = () => {
  const { t } = useTranslation();

  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const totalSlides = useMemo(() => Math.ceil(skillsData.length / itemsPerSlide), [itemsPerSlide]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTouchDevice = useIsTouchDevice(640);

  const updateItemsPerSlide = useCallback(() => {
    const width = window.innerWidth;

    if (width <= 640) {
      setItemsPerSlide(1);
    } else if (width <= 1024) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(3);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + itemsPerSlide) % skillsData.length);
  }, [itemsPerSlide, skillsData.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - itemsPerSlide + skillsData.length) % skillsData.length);
  }, [itemsPerSlide, skillsData.length]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(nextSlide, intervalTime);
  }, [nextSlide, stopAutoSlide]);

  const visibleSkills = useMemo(() => {
    const end = currentIndex + itemsPerSlide;

    return end <= skillsData.length
      ? skillsData.slice(currentIndex, end)
      : [...skillsData.slice(currentIndex), ...skillsData.slice(0, end - skillsData.length)];
  }, [currentIndex, itemsPerSlide]);

  useEffect(() => {
    updateItemsPerSlide();

    window.addEventListener('resize', updateItemsPerSlide);

    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [updateItemsPerSlide]);

  useEffect(() => {
    autoSlideRef.current = setInterval(nextSlide, intervalTime);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [nextSlide]);

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
