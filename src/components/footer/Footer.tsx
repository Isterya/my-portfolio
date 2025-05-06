import { useTranslation } from 'react-i18next';

import { Link, NavLink } from 'react-router-dom';

import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

import { socialLinks, navLinks, contactInfo } from '../../data/footerData';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

import ArrowUp from '@/assets/icons/hero/arrow-up.svg';
import logo from '@/assets/icons/full-logo.svg';

import './footer.scss';

type FooterProps = {
  simplified: boolean;
};

const Footer = ({ simplified }: FooterProps) => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const isSmallDevice = useIsTouchDevice(1024);

  return (
    <footer className="footer">
      <div className="container">
        {!simplified && (
          <>
            <div className="footer-telegram">
              <h2 className="footer-telegram__header">{t('footer.telegram.connect')}</h2>
              <a
                className="footer-telegram__link"
                href="https://t.me/perfectn1ght"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.telegram.link')}
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
            <p className="footer-social__descr">{t('footer.social')}</p>

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

          {isSmallDevice ? (
            <div className="footer-columns">
              {!simplified && (
                <>
                  <nav className="footer-nav">
                    <h4 className="footer-title">{t('footer.titles.nav')}</h4>
                    <ul className="footer-nav__list">
                      {navLinks.map((link) => (
                        <li key={link} className="footer-nav__item">
                          <a href={`#${link.replace('footer.navigation.', '')}`}>{t(link)}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              )}

              <div className="footer-contact">
                <h4 className="footer-title">{t('footer.titles.contact')}</h4>
                <ul className="footer-contact__list">
                  {contactInfo.map(({ text, href }) => (
                    <li key={href} className="footer-contact__item">
                      <a href={href}>{text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-lang">
                <h4 className="footer-title">{t('footer.titles.lang')}</h4>
                <LanguageSwitcher />
              </div>
            </div>
          ) : (
            <>
              {!simplified && (
                <>
                  <nav className="footer-nav">
                    <h4 className="footer-title">{t('footer.titles.nav')}</h4>
                    <ul className="footer-nav__list">
                      {navLinks.map((link) => (
                        <li key={link} className="footer-nav__item">
                          <a href={`#${link.replace('footer.navigation.', '')}`}>{t(link)}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              )}

              <div className="footer-contact">
                <h4 className="footer-title">{t('footer.titles.contact')}</h4>
                <ul className="footer-contact__list">
                  {contactInfo.map(({ text, href }) => (
                    <li key={href} className="footer-contact__item">
                      <a href={href}>{text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-lang">
                <h4 className="footer-title">{t('footer.titles.lang')}</h4>
                <LanguageSwitcher />
              </div>
            </>
          )}
        </div>

        <div className="footer-divider" />

        <div className="footer-rights">
          <p>
            {t('footer.rights.copyright')} {currentYear} {t('footer.rights.name')}
          </p>

          <p>
            <NavLink to="/user-terms">{t('footer.userTerms')}</NavLink> |{' '}
            <NavLink to="/privacy-policy">{t('footer.privacyPolicy')}</NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
