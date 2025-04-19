import { getYearsOfExperience } from '../../utils/getYearOfExperience';

import character from '../../assets/img/about/about-character.png';

import './about.scss';

const About = () => {
  const years = getYearsOfExperience();

  return (
    <section
      id="about"
      className="about"
    >
      <div className="container">
        <div className="about-wrapper">
          <div className="about-character">
            <img
              className="about-character__img"
              src={character}
              alt="About Me character"
            />
          </div>

          <div className="about-text">
            <h2 className="about-text__header">
              Why <span>Hire me</span>?
            </h2>

            <p className="about-text__descr">
              At 18, I’ve already gained over two years of experience crafting
              dynamic web applications, mastering modern frontend technologies,
              and building a deep understanding of software architecture and
              development principles. My expertise goes beyond writing clean,
              efficient code—I bring analytical thinking, creative
              problem-solving, and a keen eye for UI/UX to every project I work
              on.
            </p>

            <div className="about-text__stats">
              <div className="about-text__stats-projects">
                <h3>30+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="about-text__stats-experience">
                <h3>{years}+ Years</h3>
                <p>Proven Experience</p>
              </div>
            </div>

            <a
              className="about-text__hire"
              href="#contact"
              aria-label="Scroll to contact section"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
