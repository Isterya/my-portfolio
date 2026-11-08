import { FocusEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'motion/react';

import { AppLanguage, LANGUAGES, toAppLanguage } from '@/i18n/languages';

import chevron from '@/assets/icons/chevron.svg';

import './languageSwitcher.scss';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const activeLanguage = toAppLanguage(i18n.resolvedLanguage);
  const activeLabel = LANGUAGES.find(({ code }) => code === activeLanguage)?.label;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (language: AppLanguage) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsOpen(false);
  };

  return (
    <div className="lang-switcher" ref={rootRef} onBlur={handleBlur}>
      <m.button
        ref={toggleRef}
        type="button"
        className="lang-switcher__toggle"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-label={`${activeLabel} — ${t('a11y.changeLanguage')}`}
      >
        <span>{activeLabel}</span>
        <m.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <img src={chevron} alt="" />
        </m.div>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.ul
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
              <m.li
                key={code}
                variants={{
                  hidden: { opacity: 0, y: -5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <button
                  type="button"
                  className={`lang-switcher__item ${activeLanguage === code ? 'active' : ''}`}
                  lang={code}
                  aria-current={activeLanguage === code ? 'true' : undefined}
                  onClick={() => handleSelect(code)}
                >
                  {label}
                </button>
              </m.li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
