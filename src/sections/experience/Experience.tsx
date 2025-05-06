import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { dataLeft, dataRight } from '@/data/experienceData';
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

const mergedData = dataLeft
  .map((leftItem, i) => [
    { ...leftItem, side: 'left' },
    dataRight[i] && { ...dataRight[i], side: 'right' },
  ])
  .flat()
  .filter(Boolean);

const Experience = () => {
  const { t } = useTranslation();
  const isMobile = useIsTouchDevice(1024);

  return (
    <section
      id="experience"
      className="experience"
      role="region"
      aria-label="My experience section"
    >
      <div className="container">
        <h2 className="experience-header">
          {t('experience.title.before')} <span>{t('experience.title.highlight')}</span>
        </h2>

        <div className="experience__grid">
          {isMobile ? (
            mergedData.map((item, index) => (
              <motion.div
                className="experience__text"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  className={`experience__text-title ${
                    item.side === 'right' ? 'experience__text-title--secondary' : ''
                  }`}
                >
                  {t(`experience.data${item.side === 'left' ? 'Left' : 'Right'}.${item.key}.title`)}
                </div>

                {item.side === 'left' ? (
                  <div className="experience__text-subtitle">
                    {t(`experience.dataLeft.${item.key}.subtitle`)}
                  </div>
                ) : (
                  <div className="experience__text-descr">
                    {item.hasJSX ? (
                      <Trans
                        i18nKey={`experience.dataRight.${item.key}.descr`}
                        components={{
                          link1: (
                            <a
                              href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
                              className="experience__link"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          link2: (
                            <a
                              href="https://udemy-certificate.s3.amazonaws.com/image/UC-00bc5d87-e2f1-448f-9126-ae957f694436.jpg"
                              className="experience__link"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          link3: (
                            <a
                              href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
                              className="experience__link"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          link4: (
                            <a
                              href="https://udemy-certificate.s3.amazonaws.com/image/UC-6a2a853e-2363-4ace-93e0-2a3b0b386d0c.jpg"
                              className="experience__link"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                        }}
                      />
                    ) : (
                      t(`experience.dataRight.${item.key}.descr`)
                    )}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <>
              <div className="experience__column experience__column--left">
                {dataLeft.map((item, index) => (
                  <motion.div
                    className="experience__text"
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="experience__text-title">
                      {t(`experience.dataLeft.${item.key}.title`)}
                    </div>
                    <div className="experience__text-subtitle">
                      {t(`experience.dataLeft.${item.key}.subtitle`)}
                    </div>
                  </motion.div>
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
                {dataRight.map((item, index) => (
                  <motion.div
                    className="experience__text"
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="experience__text-title">
                      {t(`experience.dataRight.${item.key}.title`)}
                    </div>
                    <div className="experience__text-descr">
                      {item.hasJSX ? (
                        <Trans
                          i18nKey={`experience.dataRight.${item.key}.descr`}
                          components={{
                            link1: (
                              <a
                                href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
                                className="experience__link"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            link2: (
                              <a
                                href="https://udemy-certificate.s3.amazonaws.com/image/UC-00bc5d87-e2f1-448f-9126-ae957f694436.jpg"
                                className="experience__link"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            link3: (
                              <a
                                href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
                                className="experience__link"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            link4: (
                              <a
                                href="https://udemy-certificate.s3.amazonaws.com/image/UC-6a2a853e-2363-4ace-93e0-2a3b0b386d0c.jpg"
                                className="experience__link"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                          }}
                        />
                      ) : (
                        t(`experience.dataRight.${item.key}.descr`)
                      )}
                    </div>
                  </motion.div>
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
