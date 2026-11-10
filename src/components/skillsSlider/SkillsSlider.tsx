import { useTranslation } from 'react-i18next';

import { CSSProperties, useMemo } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { useAutoplay } from '@/hooks/useAutoplay';

import { m, AnimatePresence } from 'motion/react';

import { skillsData } from '@/data/skillsData';
import { getPageOf } from '@/utils/pagination';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const SLIDES_BREAKPOINTS = [
  { max: 640, items: 1 },
  { max: 1024, items: 2 },
];

const SWIPE_DISTANCE = 50;

const SkillsSlider = () => {
  const { t } = useTranslation();

  const { itemsPerSlide, currentIndex, currentPage, nextSlide, prevSlide, goToPage } = useSlider({
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

  const visibleSkillIds = new Set(visibleSkills.map(({ id }) => id));

  return (
    <div
      className="skills-slider"
      ref={autoplayRef}
      style={{ '--skills-per-slide': itemsPerSlide } as CSSProperties}
      {...autoplayHandlers}
    >
      <AnimatePresence mode="wait">
        <m.div
          key={currentIndex}
          className="skills-slider__inner"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          drag={itemsPerSlide === 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);

            if (info.offset.x < -SWIPE_DISTANCE) {
              nextSlide();
            } else if (info.offset.x > SWIPE_DISTANCE) {
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

      <ul className="skills-slider__rail">
        {skillsData.map(({ id, title, icon }, index) => {
          const isVisible = visibleSkillIds.has(id);

          return (
            <li key={id}>
              <button
                type="button"
                className={`skills-slider__tech ${isVisible ? 'active' : ''}`}
                title={title}
                aria-label={t('a11y.showSkill', { title })}
                aria-current={isVisible ? 'true' : undefined}
                onClick={() => goToPage(getPageOf(index, itemsPerSlide))}
              >
                <img src={icon} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillsSlider;
