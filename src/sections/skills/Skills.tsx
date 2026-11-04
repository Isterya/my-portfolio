import { useTranslation } from 'react-i18next';

import SkillsSlider from '@/components/skillsSlider/SkillsSlider';

import firstAbstract from '@/assets/img/skills/abstract-figure-1.webp';
import secondAbstract from '@/assets/img/skills/abstract-figure-2.webp';
import thirdAbstract from '@/assets/img/skills/abstract-figure-3.webp';

import './skills.scss';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="skills-header">
          <h2 className="skills-header__title">
            {t('skills.title.before')} <span>{t('skills.title.highlight')}</span>
          </h2>
          <p className="skills-header__descr">{t('skills.description')}</p>
        </div>

        <SkillsSlider />
      </div>

      <img
        className="skills__first-abstract"
        src={firstAbstract}
        alt="First abstract figure"
        width={594}
        height={601}
        loading="lazy"
        decoding="async"
      />
      <img
        className="skills__second-abstract"
        src={secondAbstract}
        alt="Second abstract figure"
        width={261}
        height={261}
        loading="lazy"
        decoding="async"
      />
      <img
        className="skills__third-abstract"
        src={thirdAbstract}
        alt="Third abstract figure"
        width={873}
        height={828}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};

export default Skills;
