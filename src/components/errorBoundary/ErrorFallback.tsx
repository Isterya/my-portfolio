import { useTranslation } from 'react-i18next';

import './errorFallback.scss';

const ErrorFallback = () => {
  const { t } = useTranslation();

  return (
    <main className="error-fallback">
      <div className="error-fallback__wrapper" role="alert">
        <h1 className="error-fallback__title">{t('errorFallback.title')}</h1>
        <p className="error-fallback__text">{t('errorFallback.text')}</p>
        <div className="error-fallback__actions">
          <button
            type="button"
            className="error-fallback__button"
            onClick={() => window.location.reload()}
          >
            {t('errorFallback.reload')}
          </button>
          <a href="/" className="error-fallback__link">
            {t('errorFallback.home')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default ErrorFallback;
