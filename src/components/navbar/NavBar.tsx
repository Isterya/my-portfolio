import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import logo from '@/assets/icons/logo.svg';

import './navBar.scss';

const SECTIONS = ['home', 'skills', 'experience', 'portfolio', 'price', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

const SCROLL_THRESHOLD = 50;
const SECTION_OFFSET = 100;

const NavBar = () => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsTouchDevice(768);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

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
        />
      )}

      {/* Mobile Nav */}
      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
          <ul>
            {SECTIONS.map((section) => (
              <li key={section}>
                <a href={`#${section}`} onClick={() => setIsMenuOpen(false)}>
                  {t(`navBar.${section}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Nav */}
      {!isMobile && (
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
      )}
    </>
  );
};

export default NavBar;
