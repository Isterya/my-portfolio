import { useTranslation } from 'react-i18next';

import { m, type Variants } from 'motion/react';

import { getYearsOfExperience } from '@/utils/getYearOfExperience';
import { getAge } from '@/utils/getAge';

import character from '@/assets/img/about/about-character.webp';

import './about.scss';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const BIRTH_DATE = new Date(2007, 8, 6);

const About = () => {
  const { t } = useTranslation();

  const years = getYearsOfExperience();
  const age = getAge(BIRTH_DATE);

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-wrapper">
          <m.div
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
          </m.div>

          <m.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.h2 id="about-title" className="about-text__header" variants={fadeInUp}>
              {t('about.title.before')} <span>{t('about.title.highlight')}</span>?
            </m.h2>

            <m.p className="about-text__descr" variants={fadeInUp}>
              {t('about.description', { age })}
            </m.p>

            <m.div className="about-text__stats" variants={fadeInUp}>
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
            </m.div>

            <m.a className="about-text__hire" href="#contact" variants={fadeInUp}>
              {t('about.hire')}
            </m.a>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default About;
