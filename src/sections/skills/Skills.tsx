import SkillsSlider from '../../components/skillsSlider/SkillsSlider';

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
    </section>
  );
};

export default Skills;
