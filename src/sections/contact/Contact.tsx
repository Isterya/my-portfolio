import { useState } from 'react';

import './contact.scss';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  return (
    <section
      id="contact"
      className="contact"
    >
      <div className="container">
        <div className="contact-wrapper">
          <h2 className="contact-header">
            Want to Сooperate? <span>Let’s Discuss</span>
          </h2>

          <form className="contact-form">
            <div className="contact-email">
              <input
                type="email"
                className="contact-email__input"
                placeholder="Enter Email Address"
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="contact-email__btn"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            <div className="contact-agreement">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  required
                />
                <span className="checkmark" />
                <span>
                  I agree to the <a href="#">privacy policy</a>
                </span>
              </label>
            </div>

            {error && <p className="form-message error">{error}</p>}
            {success && (
              <p className="form-message success">
                Thank you! We’ll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
