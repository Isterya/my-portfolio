import './contact.scss';

const Contact = () => {
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

          <div className="contact-form">
            <form className="contact-email">
              <input
                type="email"
                className="contact-email__input"
                placeholder="Enter Email Address"
                required
              />
              <button
                type="submit"
                className="contact-email__btn"
              >
                Send
              </button>
            </form>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
