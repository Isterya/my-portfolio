import { useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';

import { certificateLinks, experienceStages } from '@/data/experienceData';
import './experience.scss';

const certificateLinkComponents = Object.fromEntries(
  certificateLinks.map((href, i) => [
    `link${i + 1}`,
    <a
      key={href}
      href={href}
      className="experience__link"
      target="_blank"
      rel="noopener noreferrer"
    />,
  ]),
);

const getCenterY = (element: HTMLElement) => {
  const { top, height } = element.getBoundingClientRect();

  return top + height / 2;
};

const Experience = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const timelineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [scrolledPastCount, setScrolledPastCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 65%', 'end 65%'],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(lineProgress, 'change', (progress) => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const { top, height } = timeline.getBoundingClientRect();
    const lineTipY = top + progress * height;

    setScrolledPastCount(
      nodesRef.current.filter((node) => node && getCenterY(node) <= lineTipY).length,
    );
  });

  const reachedCount = prefersReducedMotion ? experienceStages.length : scrolledPastCount;

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="experience-header">
          {t('experience.title.before')} <span>{t('experience.title.highlight')}</span>
        </h2>

        <div className="experience__timeline" ref={timelineRef}>
          <div className="experience__line" aria-hidden="true">
            <m.div
              className="experience__line-progress"
              style={{ scaleY: prefersReducedMotion ? 1 : lineProgress }}
            />
          </div>

          <ol className="experience__list">
            {experienceStages.map(({ place, details, hasCertificateLinks }, index) => {
              const isReached = index < reachedCount;
              const isCurrent = index === reachedCount - 1;

              return (
                <li
                  key={place}
                  className={`experience__stage${isReached ? ' is-reached' : ''}${isCurrent ? ' is-current' : ''}`}
                >
                  <div className="experience__place">
                    <h3 className="experience__place-title">
                      {t(`experience.dataLeft.${place}.title`)}
                    </h3>
                    <p className="experience__place-subtitle">
                      {t(`experience.dataLeft.${place}.subtitle`)}
                    </p>
                  </div>

                  <span
                    className="experience__node"
                    aria-hidden="true"
                    ref={(node) => {
                      nodesRef.current[index] = node;
                    }}
                  />

                  <div className="experience__details">
                    <h4 className="experience__details-title">
                      {t(`experience.dataRight.${details}.title`)}
                    </h4>
                    <p className="experience__details-descr">
                      {hasCertificateLinks ? (
                        <Trans
                          i18nKey={`experience.dataRight.${details}.descr`}
                          components={certificateLinkComponents}
                        />
                      ) : (
                        t(`experience.dataRight.${details}.descr`)
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
