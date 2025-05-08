import { motion, AnimatePresence } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

import logo from '@/assets/icons/logo.svg';

import './navBar.scss';

const SECTIONS = ['home', 'skills', 'experience', 'portfolio', 'price', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

const SCROLL_THRESHOLD = 50;
const SECTION_OFFSET = 100;

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NavBar = () => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsTouchDevice(768);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll<HTMLElement>('section'));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD);

      let currentSection: Section = 'home';

      sectionsRef.current.forEach((section) => {
        const sectionTop = section.offsetTop - SECTION_OFFSET;
        const sectionId = section.getAttribute('id') as Section | null;

        if (scrollY >= sectionTop && sectionId && SECTIONS.includes(sectionId)) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Burger btn */}
      {isMobile && (
        <button
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      )}

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {SECTIONS.map((section, _) => (
                <motion.li
                  key={section}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 10 },
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <a href={`#${section}`} onClick={() => setIsMenuOpen(false)}>
                    {t(`navBar.${section}`)}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Nav */}
      {!isMobile && (
        <motion.div initial="hidden" animate="visible" variants={menuVariants}>
          <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <ul className="navbar-list navbar-list--left">
              {SECTIONS.slice(0, 3).map((section) => (
                <li key={section}>
                  <a
                    className={`navbar-list__item ${activeSection === section ? 'active' : ''}`}
                    href={`#${section}`}
                  >
                    {t(`navBar.${section}`)}
                  </a>
                </li>
              ))}
            </ul>

            <div className="navbar-logo">
              <a href="#home">
                <img src={logo} alt="Logotype" />
              </a>
            </div>

            <ul className="navbar-list navbar-list--right">
              {SECTIONS.slice(3).map((section) => (
                <li key={section}>
                  <a
                    className={`navbar-list__item ${activeSection === section ? 'active' : ''}`}
                    href={`#${section}`}
                  >
                    {t(`navBar.${section}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default NavBar;
