import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { getYearsOfExperience } from '@/utils/getYearOfExperience';
import { getAge } from '@/utils/getAge';

import character from '@/assets/img/about/about-character.webp';

import './about.scss';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// 6 September 2007 in local time. An ISO string ('2007-09-06') is parsed as UTC midnight, which is
// still 5 September west of Greenwich, so the age there changed a day early.
const BIRTH_DATE = new Date(2007, 8, 6);

const About = () => {
  const { t } = useTranslation();

  const years = getYearsOfExperience();
  const age = getAge(BIRTH_DATE);

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-wrapper">
          <motion.div
            className="about-character"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              className="about-character__img"
              src={character}
              alt=""
              width={409}
              height={606}
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 id="about-title" className="about-text__header" variants={fadeInUp}>
              {t('about.title.before')} <span>{t('about.title.highlight')}</span>?
            </motion.h2>

            <motion.p className="about-text__descr" variants={fadeInUp}>
              {t('about.description', { age })}
            </motion.p>

            <motion.div className="about-text__stats" variants={fadeInUp}>
              <div className="about-text__stats-projects">
                <p className="about-text__stats-value">8+</p>
                <p>{t('about.projects')}</p>
              </div>
              <div className="about-text__stats-experience">
                <p className="about-text__stats-value">
                  {years}+ {t('about.years')}
                </p>
                <p>{t('about.experience')}</p>
              </div>
            </motion.div>

            <a className="about-text__hire" href="#contact">
              {t('about.hire')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
