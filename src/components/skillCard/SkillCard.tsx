import './skillCard.scss';

interface SkillCardProps {
  title: string;
  icon: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, description }) => {
  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <h3>{title}</h3>
      </div>
      <p className="skill-card__description">{description}</p>
      <div className="skill-card__icon-wrapper">
        <img src={icon} alt={`${title} icon`} />
      </div>
    </div>
  );
};

export default SkillCard;
