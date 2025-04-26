import { useTranslation } from 'react-i18next';
import { useLastUpdated } from '@/hooks/useLastUpdated';

import { privacyPolicySections } from '@/data/tocData';
import { seoPolicy } from '@/data/seoData';
import SEO from '@/components/SEO';
import TableOfContents from '@/components/tableOfContents/TableOfContents';

import './privacyPolicyPage.scss';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  const updatedDate = useLastUpdated('privacyPolicy');

  return (
    <>
      <SEO {...seoPolicy} />

      <div className="policy">
        <div className="policy-container">
          <h1>{t('privacy.title')}</h1>
          <h2>{t('privacy.lastUpdated', { date: updatedDate })}</h2>

          <TableOfContents sections={privacyPolicySections} />

          <p>
            {t('privacy.intro1.start')}
            <a href="http://www.isterya.dev" target="_blank" rel="noopener noreferrer">
              {t('privacy.intro1.site')}
            </a>
            {t('privacy.intro1.end')}
          </p>

          <p>{t('privacy.intro2')}</p>

          <h3 id="who">{t('privacy.whoTitle')}</h3>
          <p>{t('privacy.whoText1')}</p>
          <p>
            {t('privacy.whoText2')}{' '}
            <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
          </p>

          <h3 id="data">{t('privacy.dataTitle')}</h3>
          <p>{t('privacy.dataText1')}</p>
          <ul>
            <li>{t('privacy.dataList.email')}</li>
            <li>{t('privacy.dataList.usage')}</li>
            <li>{t('privacy.dataList.project')}</li>
          </ul>
          <p>{t('privacy.dataText2')}</p>

          <h3 id="usage">{t('privacy.usageTitle')}</h3>
          <p>{t('privacy.usageText1')}</p>
          <ul>
            <li>{t('privacy.usageList.respond')}</li>
            <li>{t('privacy.usageList.manage')}</li>
            <li>{t('privacy.usageList.improve')}</li>
            <li>{t('privacy.usageList.legal')}</li>
          </ul>
          <p>{t('privacy.usageText2')}</p>

          <h3 id="cookies">{t('privacy.cookiesTitle')}</h3>
          <p>{t('privacy.cookiesText1')}</p>
          <p>{t('privacy.cookiesText2')}</p>

          <h3 id="sharing">{t('privacy.sharingTitle')}</h3>
          <p>{t('privacy.sharingText1')}</p>
          <p>{t('privacy.sharingText2')}</p>

          <h3 id="legal">{t('privacy.legalTitle')}</h3>
          <p>{t('privacy.legalText1')}</p>
          <ul>
            <li>{t('privacy.legalList.consent')}</li>
            <li>{t('privacy.legalList.contract')}</li>
            <li>{t('privacy.legalList.obligations')}</li>
          </ul>

          <h3 id="rights">{t('privacy.rightsTitle')}</h3>
          <p>{t('privacy.rightsText1')}</p>
          <ul>
            <li>{t('privacy.rightsList.access')}</li>
            <li>{t('privacy.rightsList.withdraw')}</li>
            <li>{t('privacy.rightsList.object')}</li>
            <li>{t('privacy.rightsList.complaint')}</li>
          </ul>
          <p>
            {t('privacy.rightsText2')}{' '}
            <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
          </p>

          <h3 id="retention">{t('privacy.retentionTitle')}</h3>
          <p>{t('privacy.retentionText1')}</p>
          <ul>
            <li>{t('privacy.retentionList.services')}</li>
            <li>{t('privacy.retentionList.legal')}</li>
          </ul>

          <h3 id="security">{t('privacy.securityTitle')}</h3>
          <p>{t('privacy.securityText')}</p>

          <h3 id="children">{t('privacy.childrenTitle')}</h3>
          <p>{t('privacy.childrenText')}</p>

          <h3 id="links">{t('privacy.linksTitle')}</h3>
          <p>{t('privacy.linksText')}</p>

          <h3 id="changes">{t('privacy.changesTitle')}</h3>
          <p>{t('privacy.changesText')}</p>

          <h3 id="contact">{t('privacy.contactTitle')}</h3>
          <p>{t('privacy.contactText1')}</p>
          <p>
            {t('privacy.contactText2')}{' '}
            <a href="mailto:by.connectme@gmail.com">by.connectme@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
