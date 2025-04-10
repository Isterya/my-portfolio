import SkillsSlider from '../../components/skillsSlider/SkillsSlider';

import firstAbstract from '../../assets/img/skills/abstract-figure-1.png';
import secondAbstract from '../../assets/img/skills/abstract-figure-2.png';
import thirdAbstract from '../../assets/img/skills/abstract-figure-3.png';

import './skills.scss';

const Skills = () => {
  return (
    <section
      id="skills"
      className="skills"
    >
      <div className="container">
        <div className="skills-header">
          <h2 className="skills-header__title">
            My <span>Skills</span>
          </h2>
          <p className="skills-header__descr">
            In this section, I will talk about the key skills and technologies
            that I use in my work. They are at the heart of my projects and
            allow me to create high-quality solutions.
          </p>
        </div>

        <SkillsSlider />
      </div>

      <img
        className="skills__first-abstract"
        src={firstAbstract}
        alt="First abstract figure"
      />
      <img
        className="skills__second-abstract"
        src={secondAbstract}
        alt="Second abstract figure"
      />
      <img
        className="skills__third-abstract"
        src={thirdAbstract}
        alt="Third abstract figure"
      />
    </section>
  );
};

export default Skills;
