import { motion } from 'framer-motion';

import { dataLeft, dataRight } from '../../data/experienceData';

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

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="experience-header">
          My <span>Experience</span>
        </h2>

        <div className="experience__grid">
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
                <div className="experience__text-title">{item.title}</div>
                <div className="experience__text-subtitle">{item.subtitle}</div>
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
                <div className="experience__text-title">{item.title}</div>
                <div className="experience__text-descr">{item.descr}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
