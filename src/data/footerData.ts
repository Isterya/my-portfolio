import facebookIcon from '../assets/icons/socials/facebook-white.svg';
import telegramIcon from '../assets/icons/socials/telegram-white.svg';
import instagramIcon from '../assets/icons/socials/instagram-white.svg';
import githubIcon from '../assets/icons/socials/github-white.svg';
import linkedinIcon from '@/assets/icons/socials/linkedin-white.svg';

import { CONTACT_EMAIL, SITE_URL, TELEGRAM_URL } from '@/config/site';

export interface SocialLinks {
  icon: string;
  /** Network name, used as the accessible name of the icon-only link. */
  label: string;
  href: string;
}

export interface ContactInfo {
  text: string;
  href: string;
}

export const socialLinks: SocialLinks[] = [
  {
    icon: facebookIcon,
    label: 'Facebook',
    href: 'https://www.facebook.com/bohdan.one.bro',
  },
  { icon: telegramIcon, label: 'Telegram', href: TELEGRAM_URL },
  {
    icon: instagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/dad.isterya/',
  },
  { icon: githubIcon, label: 'GitHub', href: 'https://github.com/Isterya' },
  { icon: linkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bohdan-yevsieiev/' },
];

export interface FooterNavLink {
  /** Id of the home page section the link scrolls to. */
  id: string;
  labelKey: string;
}

export const navLinks: FooterNavLink[] = [
  { id: 'home', labelKey: 'footer.navigation.home' },
  { id: 'skills', labelKey: 'footer.navigation.skills' },
  { id: 'experience', labelKey: 'footer.navigation.experience' },
  { id: 'portfolio', labelKey: 'footer.navigation.portfolio' },
  { id: 'price', labelKey: 'footer.navigation.price' },
];

export const contactInfo: ContactInfo[] = [
  { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { text: 'www.isterya.dev', href: SITE_URL },
];
