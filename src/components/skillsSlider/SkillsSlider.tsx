import { useTranslation } from 'react-i18next';

import { useMemo } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { useAutoplay } from '@/hooks/useAutoplay';
import { useMaxWidth } from '@/hooks/useMaxWidth';

import { m, AnimatePresence } from 'motion/react';

import { skillsData } from '@/data/skillsData';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const SLIDES_BREAKPOINTS = [
  { max: 640, items: 1 },
  { max: 1024, items: 2 },
];

const SkillsSlider = () => {
  const { t } = useTranslation();

  const isNarrowScreen = useMaxWidth(640);

  const { itemsPerSlide, currentIndex, currentPage, pageCount, nextSlide, prevSlide, goToPage } =
    useSlider({
      dataLength: skillsData.length,
      itemsPerSlideDefault: 3,
      breakpoints: SLIDES_BREAKPOINTS,
    });

  const {
    ref: autoplayRef,
    handlers: autoplayHandlers,
    setIsDragging,
  } = useAutoplay<HTMLDivElement>(nextSlide, { resetKey: currentPage });

  const visibleSkills = useMemo(() => {
    const end = currentIndex + itemsPerSlide;

    return end <= skillsData.length
      ? skillsData.slice(currentIndex, end)
      : [...skillsData.slice(currentIndex), ...skillsData.slice(0, end - skillsData.length)];
  }, [currentIndex, itemsPerSlide]);

  return (
    <div className="skills-slider" ref={autoplayRef} {...autoplayHandlers}>
      <div className="skills-slider__wrapper">
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex}
            className="skills-slider__inner"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            drag={isNarrowScreen ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);

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
          </m.div>
        </AnimatePresence>
      </div>

      {!isNarrowScreen && (
        <div className="skills-slider__controls">
          {Array.from({ length: pageCount }, (_, page) => page).map((page) => (
            <button
              type="button"
              key={page}
              className={`skills-slider__dot ${currentPage === page ? 'active' : ''}`}
              aria-label={t('a11y.goToSlide', { number: page + 1 })}
              aria-current={currentPage === page ? 'true' : undefined}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSlider;
