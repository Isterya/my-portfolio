import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { AppLanguage, LANGUAGES, toAppLanguage } from '@/i18n/languages';

import chevron from '@/assets/icons/chevron.svg';

import './languageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeLanguage = toAppLanguage(i18n.resolvedLanguage);
  const activeLabel = LANGUAGES.find(({ code }) => code === activeLanguage)?.label;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (language: AppLanguage) => {
    i18n.changeLanguage(language);
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

  return (
    <div className="lang-switcher">
      <motion.button
        className="lang-switcher__toggle"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        <span>{activeLabel}</span>
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
            {LANGUAGES.map(({ code, label }) => (
              <motion.li
                key={code}
                variants={{
                  hidden: { opacity: 0, y: -5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <button
                  className={`lang-switcher__item ${activeLanguage === code ? 'active' : ''}`}
                  onClick={() => handleSelect(code)}
                >
                  {label}
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
