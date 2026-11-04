import { absoluteUrl } from '@/config/site';

export interface SeoData {
  title: string;
  description: string;
  /** Canonical URL; omitted for pages that must not be indexed. */
  url?: string;
  image?: string;
  noIndex?: boolean;
}

export const seoHome: SeoData = {
  title: 'Isterya | Web Developer',
  description:
    'A thoughtfully crafted personal portfolio showcasing my expertise in web development, UI/UX design, and full-stack architecture. Discover projects, skills, and creative approaches brought to life through clean code and aesthetic design.',
  url: absoluteUrl('/'),
  image: absoluteUrl('/og/home.jpg'),
};

export const seoPolicy: SeoData = {
  title: 'Privacy Policy',
  description:
    'This Privacy Policy outlines how user data is collected, used, and protected within this portfolio site. Transparency and respect for your privacy are at the core of every interaction on this platform.',
  url: absoluteUrl('/privacy-policy'),
  image: absoluteUrl('/og/privacy-policy.jpg'),
};

export const seoTerms: SeoData = {
  title: 'Terms and Conditions',
  description:
    'These Terms & Conditions define the guidelines for using this portfolio website. Please review them to understand your rights and responsibilities while navigating or interacting with any content here.',
  url: absoluteUrl('/user-terms'),
  image: absoluteUrl('/og/user-terms.jpg'),
};

export const seo404: SeoData = {
  title: '404 Not Found',
  description:
    'The page you’re looking for isn’t here. It might have been moved, renamed, or never existed. Let’s bring you back to something awesome.',
  noIndex: true,
};
