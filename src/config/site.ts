export const SITE_URL = 'https://isterya.vercel.app';

export const SITE_HOST = new URL(SITE_URL).host;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const CONTACT_EMAIL = 'by.connectme@gmail.com';
export const TELEGRAM_URL = 'https://t.me/perfectn1ght';
