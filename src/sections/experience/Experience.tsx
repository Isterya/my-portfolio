import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import {
  ExperienceDataItem,
  ExperienceSide,
  certificateLinks,
  dataLeft,
  dataRight,
} from '@/data/experienceData';
import './experience.scss';

const circlePositions = [0, 180, 375, 620];

const lineVariant = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const pointVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

// Single-column layout: left (where/when) and right (what) entries alternate.
const mergedData = dataLeft.flatMap((leftItem, i) => [
  { ...leftItem, side: 'left' as const },
  ...(dataRight[i] ? [{ ...dataRight[i], side: 'right' as const }] : []),
]);

const certificateLinkComponents = Object.fromEntries(
  certificateLinks.map((href, i) => [
    `link${i + 1}`,
    <a href={href} className="experience__link" target="_blank" rel="noopener noreferrer" />,
  ]),
);

type ExperienceItemProps = {
  item: ExperienceDataItem;
  side: ExperienceSide;
  /** In the single-column layout right-side titles are visually secondary. */
  isSingleColumn?: boolean;
};

const ExperienceItem = ({ item, side, isSingleColumn = false }: ExperienceItemProps) => {
  const { t } = useTranslation();

  const group = side === 'left' ? 'dataLeft' : 'dataRight';
  const isSecondary = isSingleColumn && side === 'right';

  return (
    <motion.div
      className="experience__text"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className={`experience__text-title${isSecondary ? ' experience__text-title--secondary' : ''}`}
      >
        {t(`experience.${group}.${item.key}.title`)}
      </div>

      {side === 'left' ? (
        <div className="experience__text-subtitle">
          {t(`experience.dataLeft.${item.key}.subtitle`)}
        </div>
      ) : (
        <div className="experience__text-descr">
          {item.hasLinks ? (
            <Trans
              i18nKey={`experience.dataRight.${item.key}.descr`}
              components={certificateLinkComponents}
            />
          ) : (
            t(`experience.dataRight.${item.key}.descr`)
          )}
        </div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const isMobile = useIsTouchDevice(1024);

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="experience-header">
          {t('experience.title.before')} <span>{t('experience.title.highlight')}</span>
        </h2>

        <div className="experience__grid">
          {isMobile ? (
            mergedData.map((item) => (
              <ExperienceItem key={item.key} item={item} side={item.side} isSingleColumn />
            ))
          ) : (
            <>
              <div className="experience__column experience__column--left">
                {dataLeft.map((item) => (
                  <ExperienceItem key={item.key} item={item} side="left" />
                ))}
              </div>

              <div className="experience__timeline">
                <motion.div
                  className="timeline-line-horizontal"
                  variants={lineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                {circlePositions.map((top, i) => (
                  <div
                    key={i}
                    className={`timeline-point ${i % 2 === 0 ? 'primary' : 'dark'}`}
                    style={{ top: `${top}px` }}
                  >
                    <motion.div
                      className="timeline-point-inner"
                      variants={pointVariant}
                      initial="hidden"
                      whileInView="visible"
                      custom={i}
                      viewport={{ once: true }}
                    />
                  </div>
                ))}
              </div>

              <div className="experience__column experience__column--right">
                {dataRight.map((item) => (
                  <ExperienceItem key={item.key} item={item} side="right" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
