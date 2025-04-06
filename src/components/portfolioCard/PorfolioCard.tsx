import './portfolioCard.scss';

interface PortfolioCardProps {
  title: string;
  background: string;
  description: string;
  link: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  background,
  description,
  link,
}) => {
  return (
    <div
      className="portfolio-card"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h3 className="portfolio-card__title">{title}</h3>

      <div className="portfolio-card__overlay">
        <div className="portfolio-card__overlay-content">
          <h3 className="portfolio-card__overlay-title">{title}</h3>
          <p className="portfolio-card__description">{description}</p>
        </div>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-card__icon"
      >
        <svg
          className="portfolio-card__icon-svg"
          width="26"
          height="23"
          viewBox="0 0 26 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66667 10.0833C0.884263 10.0833 0.25 10.7176 0.25 11.5C0.25 12.2824 0.884263 12.9167 1.66667 12.9167L21.6215 12.9167L14.8316 19.7066C14.2784 20.2598 14.2784 21.1568 14.8316 21.7101C15.3848 22.2633 16.2818 22.2633 16.8351 21.7101L25.0417 13.5035C26.1481 12.397 26.1482 10.603 25.0417 9.49653L16.8351 1.28993C16.2818 0.736689 15.3848 0.736689 14.8316 1.28993C14.2784 1.84317 14.2784 2.74016 14.8316 3.2934L21.6215 10.0833L1.66667 10.0833Z"
            className="portfolio-card__icon-path"
          />
        </svg>
      </a>
    </div>
  );
};

export default PortfolioCard;
