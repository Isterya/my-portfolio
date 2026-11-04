import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { getYearsOfExperience } from '@/utils/getYearOfExperience';

import quote from '@/assets/icons/hero/quote.svg';
import stars from '@/assets/icons/hero/stars.svg';
import arrowUp from '@/assets/icons/hero/arrow-up.svg';

import character from '@/assets/img/hero/hero-character.webp';

import './hero.scss';

const Hero = () => {
  const { t } = useTranslation();

  const [activeLink, setActiveLink] = useState<'portfolio' | 'about'>('portfolio');

  const years = getYearsOfExperience();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-wrapper">
          <motion.div
            className="hero-quote"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img className="hero-quote__img" src={quote} alt="" />

            <p className="hero-quote__text">{t('hero.quote')}</p>
          </motion.div>

          <div className="hero-header">
            <div className="hero-header__subtitle">{t('hero.hello')}</div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 id="hero-title" className="hero-header__main-title">
                {t('hero.introStart')} <span>{t('hero.introName')}</span>, <br />{' '}
                {t('hero.introEnd')}
              </h1>
            </motion.div>
          </div>

          <motion.div
            className="hero-experience"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img className="hero-experience__img" src={stars} alt="" />

            <div>
              <div className="hero-experience__years">
                {years} {t('hero.years')}
              </div>
              <div className="hero-experience__descr">{t('hero.experience')}</div>
            </div>
          </motion.div>
        </div>

        <div className="hero-character">
          <motion.img
            className="hero-character__img"
            src={character}
            alt=""
            width={597}
            height={616}
            {...{ fetchpriority: 'high' }}
          />

          <div className="hero-links">
            <motion.a
              whileHover={{
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300 },
              }}
              href="#portfolio"
              className={`hero-links__link ${
                activeLink === 'portfolio' ? 'hero-links__link--active' : ''
              }`}
              onMouseEnter={() => setActiveLink('portfolio')}
            >
              {t('hero.linkPortfolio')}
              <img src={arrowUp} alt="" />
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300 },
              }}
              href="#about"
              className={`hero-links__link ${
                activeLink === 'about' ? 'hero-links__link--active' : ''
              }`}
              onMouseEnter={() => setActiveLink('about')}
            >
              {t('hero.linkAbout')}
              <img src={arrowUp} alt="" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
