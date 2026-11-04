import { useTranslation } from 'react-i18next';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SEO from '@/components/SEO';
import { seo404 } from '@/data/seoData';
import { toAppLanguage } from '@/i18n/languages';
import { WAY_HOME_STRINGS } from '@/features/wayHome/strings';

import errorImg from '@/assets/img/error/error-404.svg';

import './page404.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const float = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// The maze is a separate chunk, requested only when the visitor asks to play (and prefetched on
// hover or focus of the button), so it costs nothing to the 404 page or the rest of the site.
const loadWayHomeGame = () => import('@/features/wayHome/WayHomeGame');
const WayHomeGame = lazy(loadWayHomeGame);

const Page404 = () => {
  const { t, i18n } = useTranslation();

  const language = toAppLanguage(i18n.resolvedLanguage);
  const gameStrings = WAY_HOME_STRINGS[language];

  const [isPlaying, setIsPlaying] = useState(false);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (isPlaying) hasPlayedRef.current = true;
    else if (hasPlayedRef.current) playButtonRef.current?.focus();
  }, [isPlaying]);

  return (
    <>
      <SEO {...seo404} />

      <main className="page404">
        <div className="container">
          <motion.div className="page404-wrapper" initial="hidden" animate="visible">
            <motion.h1 className="page404-header" variants={fadeUp} custom={0}>
              {t('error.oops')}
            </motion.h1>

            <motion.h2 className="page404-subheader" variants={fadeUp} custom={1}>
              {t('error.lost')}
            </motion.h2>

            <motion.p className="page404-desc" variants={fadeUp} custom={2}>
              {t('error.description')}
            </motion.p>

            {isPlaying ? (
              <Suspense fallback={<p className="page404-game-loading">{gameStrings.loading}</p>}>
                <WayHomeGame language={language} onClose={() => setIsPlaying(false)} />
              </Suspense>
            ) : (
              <motion.img
                className="page404-img"
                src={errorImg}
                alt=""
                variants={float}
                custom={3}
                animate="animate"
              />
            )}

            <motion.div variants={fadeUp} custom={4}>
              <Link to={'/'} className="page404-back">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 18L7 6"
                    stroke="currentColor"
                    strokeWidth="1.00088"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 12L17 12"
                    stroke="currentColor"
                    strokeWidth="1.00088"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 9C11.8284 10.1716 11.1716 10.8284 10 12L13 15"
                    stroke="currentColor"
                    strokeWidth="1.00088"
                    strokeLinejoin="round"
                  />
                </svg>
                {t('error.home')}
              </Link>
            </motion.div>

            {!isPlaying && (
              <motion.div variants={fadeUp} custom={5}>
                <button
                  ref={playButtonRef}
                  type="button"
                  className="page404-play"
                  onClick={() => setIsPlaying(true)}
                  onPointerEnter={() => void loadWayHomeGame()}
                  onFocus={() => void loadWayHomeGame()}
                >
                  {gameStrings.play}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Page404;
