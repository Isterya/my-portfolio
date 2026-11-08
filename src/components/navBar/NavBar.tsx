import { motion, AnimatePresence } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMaxWidth } from '@/hooks/useMaxWidth';

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
  const isMobile = useMaxWidth(768);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const sectionsRef = useRef<HTMLElement[]>([]);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !mobileMenuRef.current) return;

      const focusable = [
        burgerRef.current,
        ...mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href]'),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll<HTMLElement>('section'));

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
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

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Burger btn */}
      {isMobile && (
        <button
          ref={burgerRef}
          type="button"
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={t('a11y.menu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
        </button>
      )}

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.nav
            ref={mobileMenuRef}
            id="mobile-menu"
            className="mobile-menu"
            aria-label={t('a11y.mainNav')}
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
              {SECTIONS.map((section) => (
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
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Nav */}
      {!isMobile && (
        <motion.div initial="hidden" animate="visible" variants={menuVariants}>
          <nav
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
            aria-label={t('a11y.mainNav')}
          >
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
                <img src={logo} alt={t('a11y.home')} />
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
