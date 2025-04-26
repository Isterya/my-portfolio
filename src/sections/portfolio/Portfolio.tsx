import { useTranslation } from 'react-i18next';

import PortfolioSlider from '@/components/portfolioSlider/PortfolioSlider';

import './portfolio.scss';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="portfolio" role="region" aria-label="Portfolio section">
      <div className="container">
        <div className="portfolio-header">
          <h2>
            {t('portfolio.title.before')} <span>{t('portfolio.title.highlight')}</span>
          </h2>
        </div>

        <PortfolioSlider />
      </div>
    </section>
  );
};

export default Portfolio;
