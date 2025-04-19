import { useState } from 'react';
import { motion } from 'framer-motion';

import quote from '../../assets/icons/hero/quote.svg';
import stars from '../../assets/icons/hero/stars.svg';
import arrowUp from '../../assets/icons/hero/arrow-up.svg';

import character from '../../assets/img/hero/hero-character.png';

import './hero.scss';

const Hero = () => {
  const [activeLink, setActiveLink] = useState<'portfolio' | 'about'>(
    'portfolio'
  );

  return (
    <section
      id="home"
      className="hero"
    >
      <div className="container">
        <div className="hero-wrapper">
          <motion.div
            className="hero-quote"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              className="hero-quote__img"
              src={quote}
              alt="Quote decoration"
            />

            <p className="hero-quote__text">
              Relentless ambition, resilience, and reliability—this is who I am.
            </p>
          </motion.div>

          <div className="hero-header">
            <div className="hero-header__subtitle">Hello!</div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-header__main-title">
                I’m <span>Bohdan</span>, <br /> Web Developer
              </h1>
            </motion.div>
          </div>

          <motion.div
            className="hero-experience"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              className="hero-experience__img"
              src={stars}
              alt="Experience rating stars"
            />

            <div>
              <div className="hero-experience__years">2 Years</div>
              <div className="hero-experience__descr">Experience</div>
            </div>
          </motion.div>
        </div>

        <div className="hero-character">
          <img
            className="hero-character__img"
            src={character}
            alt="Character"
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
              Portfolio
              <img
                src={arrowUp}
                alt="Arrow up"
              />
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
              About me
              <img
                src={arrowUp}
                alt="Go to About"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
