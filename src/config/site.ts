/**
 * Production origin used for canonical URLs and social previews.
 * Keep it in sync with the static social meta tags in index.html.
 */
export const SITE_URL = 'https://isterya.dev';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
