import ArrowUp from '../../assets/icons/hero/arrow-up.svg';
import logo from '../../assets/icons/footer-logo.svg';

import facebookIcon from '../../assets/icons/socials/facebook-white.svg';
import telegramIcon from '../../assets/icons/socials/telegram-white.svg';
import instagramIcon from '../../assets/icons/socials/instagram-white.svg';
import githubIcon from '../../assets/icons/socials/github-white.svg';

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

        <div className="footer-divider"></div>

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
              <li className="footer-social__item">
                <a href="#">
                  <img
                    src={facebookIcon}
                    alt="Link to facebook"
                  />
                </a>
              </li>
              <li className="footer-social__item">
                <a href="#">
                  <img
                    src={telegramIcon}
                    alt="Link to telegram"
                  />
                </a>
              </li>
              <li className="footer-social__item">
                <a href="#">
                  <img
                    src={instagramIcon}
                    alt="Link to instagram"
                  />
                </a>
              </li>
              <li className="footer-social__item">
                <a href="#">
                  <img
                    src={githubIcon}
                    alt="Link to github"
                  />
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer-nav">
            <h4 className="footer-title">Navigation</h4>

            <ul className="footer-nav__list">
              <li className="footer-nav__item">
                <a href="#home">Home</a>
              </li>
              <li className="footer-nav__item">
                <a href="#skills">Skills</a>
              </li>
              <li className="footer-nav__item">
                <a href="#experience">Experience</a>
              </li>
              <li className="footer-nav__item">
                <a href="#portfolio">Portfolio</a>
              </li>
              <li className="footer-nav__item">
                <a href="#price">Price</a>
              </li>
            </ul>
          </nav>

          <address className="footer-contact">
            <h4 className="footer-title">Contact</h4>

            <ul className="footer-contact__list">
              <li className="footer-contact__item">
                <a href="tel:+48784372194">+48 784372194</a>
              </li>
              <li className="footer-contact__item">
                <a href="mailto:by.connectme@gmail.com">
                  by.connectme@gmail.com
                </a>
              </li>
              <li className="footer-contact__item">
                <a href="#">purrcode.ru</a>
              </li>
            </ul>
          </address>

          <div className="footer-email">
            <h4 className="footer-title">Get the latest information</h4>

            {/* TODO: make the email form */}
          </div>
        </div>

        <div className="footer-divider"></div>
      </div>
    </footer>
  );
};

export default Footer;
