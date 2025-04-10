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
                placeholder="Enter your email"
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
              By sending a request you agree with our terms of service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
