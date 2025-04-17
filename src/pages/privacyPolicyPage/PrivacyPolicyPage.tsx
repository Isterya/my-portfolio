import TableOfContents from '../../components/tableOfContents/TableOfContents';
import { privacyPolicySections } from '../../data/tocData';

import './privacyPolicyPage.scss';

const PrivacyPolicyPage = () => {
  return (
    <div className="policy">
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <h2>Last updated: April 17, 2025</h2>

        <TableOfContents sections={privacyPolicySections} />

        <p>
          This Privacy Policy explains how your personal data is collected,
          used, and protected when you visit{' '}
          <a
            href="http://www.isterya.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.isterya.dev
          </a>{' '}
          or interact with Isterya | Web Developer — an individual offering web
          development services (such as landing pages, e-commerce sites, and
          custom solutions).
        </p>

        <p>
          By using this website or contacting me via provided channels, you
          agree to this Privacy Policy.
        </p>

        <h3 id="who">Who I Am</h3>
        <p>
          Isterya | Web Developer is operated by an individual (not a registered
          company), based in Poland, providing freelance and contract-based web
          development services.
        </p>
        <p>
          Contact:{' '}
          <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
        </p>

        <h3 id="data">What Personal Data I Collect</h3>
        <p>
          Depending on how you interact with the site, I may collect the
          following:
        </p>
        <ul>
          <li>Email address (if you contact me)</li>
          <li>Usage data (via cookies and analytics tools)</li>
          <li>
            Project-related info (if you request a quote or discuss a service)
          </li>
        </ul>
        <p>I do not require account creation or store passwords.</p>

        <h3 id="usage">How I Use Your Data</h3>
        <p>I use your data only when necessary:</p>
        <ul>
          <li>To respond to inquiries or provide services</li>
          <li>To manage quotes or freelance agreements</li>
          <li>To improve the website experience (analytics)</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>I do not sell or rent your data. Ever.</p>

        <h3 id="cookies">Cookies and Analytics</h3>
        <p>
          This website uses basic cookies and analytics tools (like Google
          Analytics) to understand traffic and improve user experience.
        </p>
        <p>You can control cookie preferences in your browser settings.</p>

        <h3 id="sharing">Data Sharing</h3>
        <p>
          Your data may be shared only with trusted third-party tools (e.g.
          email providers or analytics platforms), solely to operate the
          service.
        </p>
        <p>I do not share your data for marketing or profiling purposes.</p>

        <h3 id="legal">Legal Basis (GDPR Compliance)</h3>
        <p>
          If you're located in the European Economic Area (EEA), I process your
          data under these legal bases:
        </p>
        <ul>
          <li>Your consent (e.g. submitting a contact form)</li>
          <li>Performance of a contract (e.g. service request)</li>
          <li>Legal obligations (e.g. invoicing)</li>
        </ul>

        <h3 id="rights">Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal data</li>
          <li>Withdraw consent</li>
          <li>Object to processing</li>
          <li>Lodge a complaint with a data protection authority</li>
        </ul>
        <p>
          To exercise your rights, email{' '}
          <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
        </p>

        <h3 id="retention">Data Retention</h3>
        <p>I keep your data only as long as needed for:</p>
        <ul>
          <li>Providing services or communication</li>
          <li>Complying with legal obligations (e.g. tax reporting)</li>
        </ul>

        <h3 id="security">Security</h3>
        <p>
          I take reasonable technical and organizational steps to protect your
          data. However, no online method is 100% secure.
        </p>

        <h3 id="children">Children’s Privacy</h3>
        <p>
          This website is not intended for children under 13. I do not knowingly
          collect personal data from anyone under 13.
        </p>

        <h3 id="links">Links to Other Websites</h3>
        <p>
          This site may link to other websites. I’m not responsible for their
          privacy practices. Check their privacy policies individually.
        </p>

        <h3 id="changes">Changes to This Policy</h3>
        <p>
          I may update this Privacy Policy from time to time. The latest version
          will always be available on this page with the updated date at the
          top.
        </p>

        <h3 id="contact">Contact</h3>
        <p>If you have any questions or requests, reach out:</p>
        <p>
          <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
