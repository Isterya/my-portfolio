import { useTranslation } from 'react-i18next';

import { PointerEvent, useState } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

import { getYearsOfExperience } from '@/utils/getYearOfExperience';

import quote from '@/assets/icons/hero/quote.svg';
import stars from '@/assets/icons/hero/stars.svg';
import arrowUp from '@/assets/icons/hero/arrow-up.svg';

import character from '@/assets/img/hero/hero-character.webp';

import './hero.scss';

const HERO_LINKS = [
  { id: 'portfolio', labelKey: 'hero.linkPortfolio' },
  { id: 'about', labelKey: 'hero.linkAbout' },
] as const;

type HeroLink = (typeof HERO_LINKS)[number]['id'];

const FIGURE_SHIFT = 12;
const FIGURE_SPRING = { stiffness: 70, damping: 20 };

const Hero = () => {
  const { t } = useTranslation();

  const [activeLink, setActiveLink] = useState<HeroLink>('portfolio');

  const years = getYearsOfExperience();

  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const figureX = useSpring(
    useTransform(pointerX, [-1, 1], [-FIGURE_SHIFT, FIGURE_SHIFT]),
    FIGURE_SPRING,
  );

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - left) / width) * 2 - 1);
  };

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => pointerX.set(0)}
    >
      <div className="container">
        <div className="hero-wrapper">
          <m.div
            className="hero-quote"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img className="hero-quote__img" src={quote} alt="" />

            <p className="hero-quote__text">{t('hero.quote')}</p>
          </m.div>

          <div className="hero-header">
            <div className="hero-header__subtitle">{t('hero.hello')}</div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 id="hero-title" className="hero-header__main-title">
                {t('hero.introStart')} <span>{t('hero.introName')}</span>, <br />{' '}
                {t('hero.introEnd')}
              </h1>
            </m.div>
          </div>

          <m.div
            className="hero-experience"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img className="hero-experience__img" src={stars} alt="" />

            <div>
              <div className="hero-experience__years">
                {years} {t('hero.years', { count: years })}
              </div>
              <div className="hero-experience__descr">{t('hero.experience')}</div>
            </div>
          </m.div>
        </div>

        <div className="hero-character">
          <m.img
            className="hero-character__img"
            src={character}
            alt=""
            width={597}
            height={616}
            fetchPriority="high"
            style={{ x: figureX }}
          />

          <div className="hero-links">
            {HERO_LINKS.map(({ id, labelKey }) => {
              const isActive = activeLink === id;

              return (
                <m.a
                  key={id}
                  whileHover={{
                    scale: 1.03,
                    transition: { type: 'spring', stiffness: 300 },
                  }}
                  href={`#${id}`}
                  className={`hero-links__link ${isActive ? 'hero-links__link--active' : ''}`}
                  onMouseEnter={() => setActiveLink(id)}
                  onFocus={() => setActiveLink(id)}
                >
                  {isActive && (
                    <m.span
                      className="hero-links__marker"
                      layoutId="hero-links-marker"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="hero-links__label">{t(labelKey)}</span>
                  <img className="hero-links__icon" src={arrowUp} alt="" />
                </m.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
