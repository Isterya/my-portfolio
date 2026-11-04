import { useTranslation } from 'react-i18next';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

import { SendEmailError, SendEmailErrorCode, sendEmail, wakeUpApi } from '@/services/sendEmail';

import './contact.scss';

const ERROR_MESSAGE_KEYS: Record<SendEmailErrorCode, string> = {
  network: 'contact.error.network',
  timeout: 'contact.error.timeout',
  rateLimit: 'contact.error.rateLimit',
  validation: 'contact.error.validation',
  server: 'contact.error.smthWrong',
};

const SLOW_REQUEST_HINT_DELAY_MS = 5000;

const Contact = () => {
  const { t } = useTranslation();

  // Wake the API up while the visitor is still a screen or so away from the form.
  const sectionRef = useRef<HTMLElement>(null);
  const isNearForm = useInView(sectionRef, { once: true, margin: '0px 0px 800px 0px' });

  useEffect(() => {
    if (isNearForm) wakeUpApi();
  }, [isNearForm]);

  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isInvalid = error && (!email || !agreed);
  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  const hasError = Boolean(error);
  const statusId = 'contact-status';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !agreed || !isValidEmail) {
      setError(t('contact.error.validation'));
      return;
    }

    if (success) return;

    setError('');
    setLoading(true);

    try {
      await sendEmail(email);

      setSuccess(true);
      setEmail('');
      setAgreed(false);
    } catch (err) {
      const code = err instanceof SendEmailError ? err.code : 'server';

      setError(t(ERROR_MESSAGE_KEYS[code]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => setIsSlow(true), SLOW_REQUEST_HINT_DELAY_MS);

    return () => {
      clearTimeout(timer);
      setIsSlow(false);
    };
  }, [loading]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (email || agreed) {
      setError('');
    }
  }, [email, agreed]);

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title" ref={sectionRef}>
      <div className="container">
        <div className="contact-wrapper">
          <h2 id="contact-title" className="contact-header">
            {t('contact.title.before')} <span>{t('contact.title.highlight')}</span>
          </h2>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-email" className="visually-hidden">
              {t('contact.emailLabel')}
            </label>
            <div className={`contact-email ${isInvalid ? 'invalid' : ''}`}>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                className="contact-email__input"
                placeholder={t('contact.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={hasError && (!email || !isValidEmail)}
                aria-describedby={hasError ? statusId : undefined}
                required
              />
              <button disabled={loading} type="submit" className="contact-email__btn">
                {loading ? t('contact.loading') : t('contact.sendBtn')}
              </button>
            </div>

            <div className="contact-agreement">
              <label className="checkbox-container">
                <input
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  type="checkbox"
                  aria-invalid={hasError && !agreed}
                  aria-describedby={hasError ? statusId : undefined}
                  required
                />
                <span className="checkmark" />
                <span>
                  {t('contact.privacyPolicy.before')}{' '}
                  <Link to="/privacy-policy">{t('contact.privacyPolicy.after')}</Link>
                </span>
              </label>
            </div>

            <div id={statusId} aria-live="polite">
              {isSlow && <p className="form-message">{t('contact.slow')}</p>}
              {error && <p className="form-message error">{error}</p>}
              {success && <p className="form-message success">{t('contact.success')}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
