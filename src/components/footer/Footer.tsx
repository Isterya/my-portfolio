import { Link, NavLink } from 'react-router-dom';

import { socialLinks, navLinks, contactInfo } from '../../data/footerData';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

import ArrowUp from '../../assets/icons/hero/arrow-up.svg';
import logo from '../../assets/icons/full-logo.svg';

import './footer.scss';

type FooterProps = {
  simplified: boolean;
};

const Footer = ({ simplified }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="container">
        {!simplified && (
          <>
            <div className="footer-telegram">
              <h2 className="footer-telegram__header">Or let’s connect there</h2>
              <a
                className="footer-telegram__link"
                href="https://t.me/perfectn1ght"
                target="_blank"
                rel="noopener noreferrer"
              >
                My Telegram
                <img src={ArrowUp} alt="Arrow for the link" />
              </a>
            </div>

            <div className="footer-divider" />
          </>
        )}

        <div className="footer-wrapper">
          <div className="footer-social">
            <div className="footer-social__logo">
              <Link to="/">
                <img src={logo} alt="isterya logo" />
              </Link>
            </div>
            <p className="footer-social__descr">
              My social networks are always open for cooperation.
            </p>

            <ul className="footer-social__links">
              {socialLinks.map(({ icon, alt, href }) => (
                <li key={alt} className="footer-social__item">
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt={`Link to ${alt}`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {!simplified && (
            <>
              <nav className="footer-nav">
                <h4 className="footer-title">Navigation</h4>
                <ul className="footer-nav__list">
                  {navLinks.map((link) => (
                    <li key={link} className="footer-nav__item">
                      <a href={`#${link.toLowerCase()}`}>{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}

          <div className="footer-contact">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact__list">
              {contactInfo.map(({ text, href }) => (
                <li key={href} className="footer-contact__item">
                  <a href={href}>{text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-lang">
            <h4 className="footer-title">Language</h4>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-rights">
          <p>Copyright© 2025 Isterya. All Rights Reserved.</p>

          <p>
            <NavLink to="/user-terms">User Terms & Conditions</NavLink> |{' '}
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
