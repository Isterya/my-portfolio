import facebookIcon from '../assets/icons/socials/facebook-white.svg';
import telegramIcon from '../assets/icons/socials/telegram-white.svg';
import instagramIcon from '../assets/icons/socials/instagram-white.svg';
import githubIcon from '../assets/icons/socials/github-white.svg';
import linkedinIcon from '@/assets/icons/socials/linkedin-white.svg';

import { SITE_URL } from '@/config/site';

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
  { icon: telegramIcon, label: 'Telegram', href: 'https://t.me/perfectn1ght' },
  {
    icon: instagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/dad.isterya/',
  },
  { icon: githubIcon, label: 'GitHub', href: 'https://github.com/Isterya' },
  { icon: linkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bohdan-yevsieiev/' },
];

export const navLinks: string[] = [
  'footer.navigation.home',
  'footer.navigation.skills',
  'footer.navigation.experience',
  'footer.navigation.portfolio',
  'footer.navigation.price',
];

export const contactInfo: ContactInfo[] = [
  { text: 'by.connectme@gmail.com', href: 'mailto:by.connectme@gmail.com' },
  { text: 'www.isterya.dev', href: SITE_URL },
];
