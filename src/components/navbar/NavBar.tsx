import { useState, useEffect } from 'react';

import logo from '../../assets/icons/logo.svg';

import './navBar.scss';

// TODO: make the menu interactively fixed when scrolling the page

const SECTIONS = [
  'home',
  'skills',
  'experience',
  'portfolio',
  'price',
  'contact',
] as const;
type Section = (typeof SECTIONS)[number];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section');
      let currentSection: Section = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id') as Section | null;

        if (
          window.scrollY >= sectionTop &&
          sectionId &&
          SECTIONS.includes(sectionId)
        ) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-list navbar-list--left">
        {SECTIONS.slice(0, 3).map((section) => (
          <li
            key={section}
            className={`navbar-list__item ${
              activeSection === section ? 'active' : ''
            }`}
          >
            <a href={`#${section}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-logo">
        <a href="#home">
          <img
            src={logo}
            alt="Logotype"
          />
        </a>
      </div>

      <ul className="navbar-list navbar-list--right">
        {SECTIONS.slice(3, 6).map((section) => (
          <li
            key={section}
            className={`navbar-list__item ${
              activeSection === section ? 'active' : ''
            }`}
          >
            <a href={`#${section}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
