import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '../../i18n';

import chevron from '../../assets/icons/chevron.svg';

import './languageSwitcher.scss';

const languages = ['English', 'Русский', 'Polski'];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (lang: string) => {
    setSelectedLang(lang);

    i18n.changeLanguage(lang === 'Русский' ? 'ru' : lang === 'Polski' ? 'pl' : 'en');
    setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', i18n.language);
  }, [i18n.language]);

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
