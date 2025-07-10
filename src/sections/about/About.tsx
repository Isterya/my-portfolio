import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { getYearsOfExperience } from '@/utils/getYearOfExperience';
import { getAge } from '@/utils/getAge';

import character from '@/assets/img/about/about-character.png';

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

const About = () => {
  const { t } = useTranslation();

  const years = getYearsOfExperience();
  const age = getAge(new Date('2007-09-06'));

  return (
    <section id="about" className="about" role="region" aria-label="About me section">
      <div className="container">
        <div className="about-wrapper">
          <motion.div
            className="about-character"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img className="about-character__img" src={character} alt="A mascot character" />
          </motion.div>

          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="about-text__header" variants={fadeInUp}>
              {t('about.title.before')} <span>{t('about.title.highlight')}</span>?
            </motion.h2>

            <motion.p className="about-text__descr" variants={fadeInUp}>
              {t('about.description', { age })}
            </motion.p>

            <motion.div className="about-text__stats" variants={fadeInUp}>
              <div className="about-text__stats-projects">
                <h3>30+</h3>
                <p>{t('about.projects')}</p>
              </div>
              <div className="about-text__stats-experience">
                <h3>
                  {years}+ {t('about.years')}
                </h3>
                <p>{t('about.experience')}</p>
              </div>
            </motion.div>

            <a className="about-text__hire" href="#contact" aria-label="Scroll to contact section">
              {t('about.hire')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
