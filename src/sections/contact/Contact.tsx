import { useState } from 'react';

import './contact.scss';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !agreed) {
      setError('Please enter a valid email and accept the privacy policy');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: implement the logic of sending and receiving data

      setSuccess(true);
      setEmail('');
      setAgreed(false);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div
              className={`contact-email ${error && !email ? 'invalid' : ''}`}
            >
              <input
                type="email"
                className="contact-email__input"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
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
