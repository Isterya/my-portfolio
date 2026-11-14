import { m, AnimatePresence } from 'motion/react';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMaxWidth } from '@/hooks/useMaxWidth';

import logo from '@/assets/icons/logo.svg';

import './navBar.scss';

const SECTIONS = ['home', 'skills', 'experience', 'portfolio', 'price', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

const LEFT_SECTIONS = SECTIONS.slice(0, 3);
const RIGHT_SECTIONS = SECTIONS.slice(3);

const SCROLL_THRESHOLD = 50;
const SECTION_OFFSET = 100;

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const indicatorTransition = { type: 'spring', stiffness: 380, damping: 34 } as const;

type NavListProps = {
  sections: readonly Section[];
  activeSection: Section;
  side: 'left' | 'right';
};

const NavList = ({ sections, activeSection, side }: NavListProps) => {
  const { t } = useTranslation();

  return (
    <ul className={`navbar-list navbar-list--${side}`}>
      {sections.map((section) => {
        const isActive = activeSection === section;

        return (
          <li key={section}>
            <a
              className={`navbar-list__item ${isActive ? 'active' : ''}`}
              href={`#${section}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {isActive && (
                <m.span
                  className="navbar-list__indicator"
                  layoutId="navbar-indicator"
                  transition={indicatorTransition}
                />
              )}
              <span className="navbar-list__label">{t(`navBar.${section}`)}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const NavBar = () => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuRequested, setIsMenuRequested] = useState(false);
  const isMobile = useMaxWidth(768);

  const isMenuOpen = isMobile && isMenuRequested;

  const toggleMenu = () => setIsMenuRequested((prev) => !prev);

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
        setIsMenuRequested(false);
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

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <div
          className={`navbar-compact ${isScrolled ? 'navbar-compact--scrolled' : ''} ${isMenuOpen ? 'navbar-compact--open' : ''}`}
        >
          <a
            className="navbar-compact__logo"
            href="#home"
            onClick={() => setIsMenuRequested(false)}
          >
            <img src={logo} alt={t('a11y.home')} />
          </a>

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
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <m.nav
              ref={mobileMenuRef}
              id="mobile-menu"
              className="mobile-menu"
              aria-label={t('a11y.mainNav')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <m.ul
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
                  <m.li
                    key={section}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: 10 },
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <a
                      className={activeSection === section ? 'active' : undefined}
                      href={`#${section}`}
                      aria-current={activeSection === section ? 'location' : undefined}
                      onClick={() => setIsMenuRequested(false)}
                    >
                      {t(`navBar.${section}`)}
                    </a>
                  </m.li>
                ))}
              </m.ul>
            </m.nav>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <m.div initial="hidden" animate="visible" variants={menuVariants}>
      <nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        aria-label={t('a11y.mainNav')}
      >
        <NavList sections={LEFT_SECTIONS} activeSection={activeSection} side="left" />

        <a className="navbar-logo" href="#home">
          <img src={logo} alt={t('a11y.home')} />
        </a>

        <NavList sections={RIGHT_SECTIONS} activeSection={activeSection} side="right" />
      </nav>
    </m.div>
  );
};

export default NavBar;
