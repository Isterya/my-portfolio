import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, toAppLanguage } from './languages';

import en from './locales/en.json';
import ru from './locales/ru.json';
import pl from './locales/pl.json';

const syncDocumentLanguage = (language: string) => {
  const appLanguage = toAppLanguage(i18n.resolvedLanguage ?? language);

  document.documentElement.lang = appLanguage;
  document.documentElement.setAttribute('data-lang', appLanguage);
};

i18n.on('languageChanged', syncDocumentLanguage);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      pl: { translation: pl },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: DEFAULT_LANGUAGE,
    detection: {
      convertDetectedLanguage: (language: string) => language.split('-')[0],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
