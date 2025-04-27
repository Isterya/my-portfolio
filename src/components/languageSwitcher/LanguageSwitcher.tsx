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
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.lang-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
      <motion.button
        className="lang-switcher__toggle"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        <span>{selectedLang}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <img src={chevron} alt="chevron" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="lang-switcher__dropdown"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
            }}
          >
            {languages.map((lang) => (
              <motion.li
                key={lang}
                variants={{
                  hidden: { opacity: 0, y: -5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <button
                  className={`lang-switcher__item ${selectedLang === lang ? 'active' : ''}`}
                  onClick={() => handleSelect(lang)}
                >
                  {lang}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
