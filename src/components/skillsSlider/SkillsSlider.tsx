import { useTranslation } from 'react-i18next';

import { useCallback, useMemo, useState } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { useAutoplay } from '@/hooks/useAutoplay';
import { useMaxWidth } from '@/hooks/useMaxWidth';

import { m, AnimatePresence, type Variants } from 'motion/react';

import { skillsData } from '@/data/skillsData';
import SkillCard from '../skillCard/SkillCard';

import './skillsSlider.scss';

const SLIDES_BREAKPOINTS = [
  { max: 640, items: 1 },
  { max: 1024, items: 2 },
];

const SWIPE_DISTANCE = 50;

type SlideDirection = 'next' | 'prev';

const slideVariants: Variants = {
  enter: {},
  center: (direction: SlideDirection) => ({
    transition: { staggerChildren: 0.07, staggerDirection: direction === 'next' ? 1 : -1 },
  }),
  exit: {},
};

const cardVariants: Variants = {
  enter: (direction: SlideDirection) => ({
    '--card-opacity': 0,
    x: direction === 'next' ? 60 : -60,
  }),
  center: {
    '--card-opacity': 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: SlideDirection) => ({
    '--card-opacity': 0,
    x: direction === 'next' ? -40 : 40,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
};

const SkillsSlider = () => {
  const { t } = useTranslation();

  const isNarrowScreen = useMaxWidth(640);

  const { itemsPerSlide, currentIndex, currentPage, pageCount, nextSlide, prevSlide, goToPage } =
    useSlider({
      dataLength: skillsData.length,
      itemsPerSlideDefault: 3,
      breakpoints: SLIDES_BREAKPOINTS,
    });

  const [direction, setDirection] = useState<SlideDirection>('next');

  const autoAdvance = useCallback(() => {
    setDirection('next');
    nextSlide();
  }, [nextSlide]);

  const {
    ref: autoplayRef,
    handlers: autoplayHandlers,
    setIsDragging,
  } = useAutoplay<HTMLDivElement>(autoAdvance, { resetKey: currentPage });

  const handlePrev = () => {
    setDirection('prev');
    prevSlide();
  };

  const handleNext = () => {
    setDirection('next');
    nextSlide();
  };

  const visibleSkills = useMemo(() => {
    const end = currentIndex + itemsPerSlide;

    return end <= skillsData.length
      ? skillsData.slice(currentIndex, end)
      : [...skillsData.slice(currentIndex), ...skillsData.slice(0, end - skillsData.length)];
  }, [currentIndex, itemsPerSlide]);

  return (
    <div className="skills-slider" ref={autoplayRef} {...autoplayHandlers}>
      <div className="skills-slider__wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={currentIndex}
            className="skills-slider__inner"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={isNarrowScreen ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);

              if (info.offset.x < -SWIPE_DISTANCE) {
                handleNext();
              } else if (info.offset.x > SWIPE_DISTANCE) {
                handlePrev();
              }
            }}
          >
            {visibleSkills.map((skill) => (
              <m.div
                key={skill.id}
                className="skills-slider__item"
                custom={direction}
                variants={cardVariants}
              >
                <SkillCard
                  title={skill.title}
                  icon={skill.icon}
                  description={t(skill.description)}
                />
              </m.div>
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
              onClick={() => {
                setDirection(page > currentPage ? 'next' : 'prev');
                goToPage(page);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSlider;
