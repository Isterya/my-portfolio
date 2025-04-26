import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { sendEmail } from '@/services/sendEmail';

import './contact.scss';

const Contact = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isInvalid = error && (!email || !agreed);
  const isValidEmail = /\S+@\S+\.\S+/.test(email);

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
      sendEmail(email);

      setSuccess(true);
      setEmail('');
      setAgreed(false);
    } catch (err: any) {
      setError(err.message || t('contact.error.smthWrong'));
    } finally {
      setLoading(false);
    }
  };

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
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-wrapper">
          <h2 className="contact-header">
            {t('contact.title.before')} <span>{t('contact.title.highlight')}</span>
          </h2>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className={`contact-email ${isInvalid ? 'invalid' : ''}`}>
              <input
                type="email"
                className="contact-email__input"
                placeholder={t('contact.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
                />
                <span className="checkmark" />
                <span>
                  {t('contact.privacyPolicy.before')}{' '}
                  <Link to="/privacy-policy">{t('contact.privacyPolicy.after')}</Link>
                </span>
              </label>
            </div>

            <div aria-live="polite">
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
