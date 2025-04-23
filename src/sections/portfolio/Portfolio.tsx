import PortfolioSlider from '../../components/portfolioSlider/PortfolioSlider';

import './portfolio.scss';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio" role="region" aria-label="Portfolio section">
      <div className="container">
        <div className="portfolio-header">
          <h2>
            Lets have a look at my <span>Portfolio</span>
          </h2>
        </div>

        <PortfolioSlider />
      </div>
    </section>
  );
};

export default Portfolio;
