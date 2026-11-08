import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useLegalRevisionDate } from '@/hooks/useLegalRevisionDate';

import { CONTACT_EMAIL, SITE_HOST, SITE_URL } from '@/config/site';
import SEO from '@/components/SEO';
import { seoTerms } from '@/data/seoData';
import TableOfContents from '@/components/tableOfContents/TableOfContents';
import { termsSections } from '@/data/tocData';

import './userTermsPage.scss';

const UserTermsPage = () => {
  const { t } = useTranslation();

  const updatedDate = useLegalRevisionDate('termsOfUse');

  return (
    <>
      <SEO {...seoTerms} />

      <div className="terms">
        <div className="terms-container">
          <h1>{t('terms.title')}</h1>
          <h2>{t('terms.lastUpdated', { date: updatedDate })}</h2>

          <TableOfContents sections={termsSections} />

          <p>
            {t('terms.intro.start')}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              {SITE_HOST}
            </a>
            {t('terms.intro.end')}
          </p>

          <h3 id="about">{t('terms.aboutTitle')}</h3>
          <p>{t('terms.aboutText')}</p>

          <h3 id="services">{t('terms.servicesTitle')}</h3>
          <p>{t('terms.servicesText1')}</p>
          <p>{t('terms.servicesText2')}</p>

          <h3 id="intellectual">{t('terms.intellectualTitle')}</h3>
          <p>{t('terms.intellectualText')}</p>

          <h3 id="limitations">{t('terms.limitationsTitle')}</h3>
          <p>{t('terms.limitationsText')}</p>

          <h3 id="thirdParty">{t('terms.thirdPartyTitle')}</h3>
          <p>{t('terms.thirdPartyText')}</p>

          <h3 id="disclaimer">{t('terms.disclaimerTitle')}</h3>
          <p>{t('terms.disclaimerText')}</p>

          <h3 id="age">{t('terms.ageTitle')}</h3>
          <p>{t('terms.ageText')}</p>

          <h3 id="privacy">{t('terms.privacyTitle')}</h3>
          <p>
            {t('terms.privacyText.start')}{' '}
            <Link to="/privacy-policy">{t('terms.privacyText.link')}</Link>
            {t('terms.privacyText.end')}
          </p>

          <h3 id="changes">{t('terms.changesTitle')}</h3>
          <p>{t('terms.changesText')}</p>

          <h3 id="contact">{t('terms.contactTitle')}</h3>
          <p>{t('terms.contactText')}</p>

          <p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserTermsPage;
