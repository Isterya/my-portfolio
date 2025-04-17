import { Link } from 'react-router-dom';

import TableOfContents from '../../components/tableOfContents/TableOfContents';

import './userTermsPage.scss';

const UserTermsPage = () => {
  return (
    <div className="terms">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <h2>Last updated: April 17, 2025</h2>

        <TableOfContents />

        <p>
          Welcome to Isterya | Web Developer. By using this website (
          <a
            href="http://www.isterya.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.isterya.dev
          </a>
          ), you agree to the following terms and conditions. If you do not
          agree with any part, please do not use the website.
        </p>

        <h3>About This Website</h3>
        <p>
          This is a personal portfolio site operated by an individual freelance
          web developer based in Poland. The site is designed to showcase work,
          outline offered services, and provide a way to get in touch.
        </p>

        <h3>Services and Communication</h3>
        <p>
          This website does not offer products for direct sale. Any services
          (such as landing page development, e-commerce, or custom solutions)
          are discussed individually via email after a user initiates contact.
        </p>

        <p>
          By submitting your email through the contact form, you agree to be
          contacted for service-related communication.
        </p>

        <h3>Intellectual Property</h3>
        <p>
          All content on this website (text, code, images, branding) belongs to
          Isterya | Web Developer unless otherwise stated. Do not copy,
          reproduce, or reuse any part of it without written permission.
        </p>

        <h3>Limitations of Use</h3>
        <p>
          You agree not to misuse the site, attempt unauthorized access, or
          engage in activities that disrupt or harm the website or its visitors.
        </p>

        <h3>Third-Party Links</h3>
        <p>
          This site may contain links to third-party websites. I’m not
          responsible for their content, privacy practices, or terms. Use them
          at your own discretion.
        </p>

        <h3>Disclaimer of Liability</h3>
        <p>
          The site is provided "as is." I do my best to keep it functional and
          accurate, but I do not guarantee error-free operation or uninterrupted
          access. I am not liable for any losses or damages related to your use
          of the site.
        </p>

        <h3>Age Requirement</h3>
        <p>
          You must be at least 18 years old to use this site or contact me about
          services.
        </p>

        <h3>Privacy</h3>
        <p>
          Your use of this site is also governed by the{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>, which explains how I
          handle personal data.
        </p>

        <h3>Changes to These Terms</h3>
        <p>
          These terms may be updated occasionally. Significant changes will be
          noted on this page. Continued use of the website means you accept any
          revisions.
        </p>

        <h3>Contact</h3>
        <p>If you have any questions, contact me at:</p>

        <p>
          <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default UserTermsPage;
