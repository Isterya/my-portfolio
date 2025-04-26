import facebookIcon from '../assets/icons/socials/facebook-white.svg';
import telegramIcon from '../assets/icons/socials/telegram-white.svg';
import instagramIcon from '../assets/icons/socials/instagram-white.svg';
import githubIcon from '../assets/icons/socials/github-white.svg';

export interface SocialLinks {
  icon: string;
  alt: string;
  href: string;
}

export interface ContactInfo {
  text: string;
  href: string;
}

export const socialLinks: SocialLinks[] = [
  {
    icon: facebookIcon,
    alt: 'facebook',
    href: 'https://www.facebook.com/bohdan.one.bro',
  },
  { icon: telegramIcon, alt: 'telegram', href: 'https://t.me/perfectn1ght' },
  {
    icon: instagramIcon,
    alt: 'instagram',
    href: 'https://www.instagram.com/dad.isterya/',
  },
  { icon: githubIcon, alt: 'github', href: 'https://github.com/Isterya' },
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
  { text: 'www.isterya.dev', href: 'http://www.isterya.dev' },
];
