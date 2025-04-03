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
      <div className="skill-card__divider"></div>

      <div className="skill-card__wrapper">
        <div className="skill-card__bg skill-card__bg--first"></div>
        <div className="skill-card__bg skill-card__bg--second"></div>
        <div className="skill-card__bg skill-card__bg--third">
          <p>{description}</p>

          <div className="skill-card__circle">
            <img
              src={icon}
              alt="Skill Icon"
              className="skill-card__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
