import { useState } from 'react';

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
          <div className="hero-quote">
            <img
              className="hero-quote__img"
              src={quote}
              alt="Quote decoration"
            />

            <p className="hero-quote__text">
              Relentless ambition, resilience, and reliability—this is who I am.
            </p>
          </div>

          <div className="hero-header">
            <div className="hero-header__subtitle">Hello!</div>

            <h1 className="hero-header__main-title">
              I’m <span>Bohdan</span>, <br /> Web Developer
            </h1>
          </div>

          <div className="hero-experience">
            <img
              className="hero-experience__img"
              src={stars}
              alt="Experience rating stars"
            />

            <div>
              <div className="hero-experience__years">2 Years</div>
              <div className="hero-experience__descr">Experience</div>
            </div>
          </div>
        </div>

        <div className="hero-character">
          <img
            className="hero-character__img"
            src={character}
            alt="Character"
          />

          <div className="hero-links">
            <a
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
            </a>
            <a
              href="#about"
              className={`hero-links__link ${
                activeLink === 'about' ? 'hero-links__link--active' : ''
              }`}
              onMouseEnter={() => setActiveLink('about')}
            >
              About me
              <img
                src={arrowUp}
                alt="Arrow up"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
