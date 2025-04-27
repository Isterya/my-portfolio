import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '@/i18n';

import chevron from '@/assets/icons/chevron.svg';

import './languageSwitcher.scss';

type Language = 'English' | 'Русский' | 'Polski';

const languages: Language[] = ['English', 'Русский', 'Polski'];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<Language>('English');

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang);

    i18n.changeLanguage(lang === 'Русский' ? 'ru' : lang === 'Polski' ? 'pl' : 'en');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      document.documentElement.setAttribute('data-lang', lng);
      setSelectedLang(lng === 'ru' ? 'Русский' : lng === 'pl' ? 'Polski' : 'English');
    };

    i18n.on('languageChanged', handleLanguageChanged);

    handleLanguageChanged(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  return (
    <div className="lang-switcher">
      <button className="lang-switcher__toggle" onClick={toggleDropdown}>
        <span>{selectedLang}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <img src={chevron} alt="chevron" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="lang-switcher__dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <li key={lang}>
                <button className="lang-switcher__item" onClick={() => handleSelect(lang)}>
                  {lang}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
