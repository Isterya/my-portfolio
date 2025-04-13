import facebookIcon from '../assets/icons/socials/facebook-white.svg';
import telegramIcon from '../assets/icons/socials/telegram-white.svg';
import instagramIcon from '../assets/icons/socials/instagram-white.svg';
import githubIcon from '../assets/icons/socials/github-white.svg';

export interface SocialLinks {
  icon: string;
  alt: string;
  href: string;
}

export interface contactInfo {
  text: string;
  href: string;
}

export const socialLinks: SocialLinks[] = [
  { icon: facebookIcon, alt: 'facebook', href: '#' },
  { icon: telegramIcon, alt: 'telegram', href: '#' },
  { icon: instagramIcon, alt: 'instagram', href: '#' },
  { icon: githubIcon, alt: 'github', href: '#' },
];

export const navLinks: string[] = [
  'Home',
  'Skills',
  'Experience',
  'Portfolio',
  'Price',
];

export const contactInfo: contactInfo[] = [
  { text: '+48 784372194', href: 'tel:+48784372194' },
  { text: 'by.connectme@gmail.com', href: 'mailto:by.connectme@gmail.com' },
  { text: 'purrcode.ru', href: '#' },
];
