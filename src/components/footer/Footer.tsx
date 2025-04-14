import { socialLinks, navLinks, contactInfo } from '../../data/footerData';

import ArrowUp from '../../assets/icons/hero/arrow-up.svg';
import logo from '../../assets/icons/footer-logo.svg';

import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-telegram">
          <h2 className="footer-telegram__header">Or let’s connect there</h2>
          <a
            className="footer-telegram__link"
            href="https://t.me/perfectn1ght"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Telegram
            <img
              src={ArrowUp}
              alt="Arrow for the link"
            />
          </a>
        </div>

        <div className="footer-divider" />

        <div className="footer-wrapper">
          <div className="footer-social">
            <div className="footer-social__logo">
              <a href="#home">
                <img
                  src={logo}
                  alt="isterya logo"
                />
              </a>
            </div>
            <p className="footer-social__descr">
              My social networks are always open for cooperation.
            </p>

            <ul className="footer-social__links">
              {socialLinks.map(({ icon, alt, href }) => (
                <li
                  key={alt}
                  className="footer-social__item"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={icon}
                      alt={`Link to ${alt}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer-nav">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-nav__list">
              {navLinks.map((link) => (
                <li
                  key={link}
                  className="footer-nav__item"
                >
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact__list">
              {contactInfo.map(({ text, href }) => (
                <li
                  key={href}
                  className="footer-contact__item"
                >
                  <a href={href}>{text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-note">
            <h4 className="footer-title">You made it.</h4>
            <p className="footer-note__text">
              Not everyone does. If something resonated — you know where to find
              me.
            </p>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-rights">
          <p>Copyright© 2025 Isterya. All Rights Reserved.</p>

          <p>
            <a
              href="#"
              target="_blank"
            >
              User Terms & Conditions
            </a>{' '}
            |{' '}
            <a
              href="#"
              target="_blank"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
