export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'pl', label: 'Polski' },
] as const;

export type AppLanguage = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export const SUPPORTED_LANGUAGES: AppLanguage[] = LANGUAGES.map(({ code }) => code);

/** Maps any BCP 47 tag (`ru-RU`, `pl`, `de-DE`) to a language the site is translated into. */
export const toAppLanguage = (language?: string): AppLanguage => {
  const base = language?.split('-')[0];

  return SUPPORTED_LANGUAGES.find((code) => code === base) ?? DEFAULT_LANGUAGE;
};
