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
            <div className="footer__logo">
              <a href="#home">
                <img
                  src={logo}
                  alt="isterya logo"
                />
              </a>
              <h3>isterya</h3>
            </div>
            <p className="footer__descr">
              My social networks are always open for cooperation.
            </p>

            <ul className="footer-social__links">
              {socialLinks.map(({ icon, alt, href }) => (
                <li
                  key={alt}
                  className="footer-social__item"
                >
                  <a href={href}>
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

          <address className="footer-contact">
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
          </address>

          <div className="footer-email">
            <h4 className="footer-title">Get the latest information</h4>
            {/* TODO: make the email form */}
          </div>
        </div>

        <div className="footer-divider" />
      </div>
    </footer>
  );
};

export default Footer;
