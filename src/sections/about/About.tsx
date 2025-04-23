import { motion } from 'framer-motion';

import { getYearsOfExperience } from '../../utils/getYearOfExperience';

import character from '../../assets/img/about/about-character.png';

import './about.scss';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About = () => {
  const years = getYearsOfExperience();

  return (
    <section id="about" className="about" role="region" aria-label="About me section">
      <div className="container">
        <div className="about-wrapper">
          <motion.div
            className="about-character"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img className="about-character__img" src={character} alt="A mascot character" />
          </motion.div>

          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="about-text__header" variants={fadeInUp}>
              Why <span>Hire me</span>?
            </motion.h2>

            <motion.p className="about-text__descr" variants={fadeInUp}>
              At 18, I’ve already gained over two years of experience crafting dynamic web
              applications, mastering modern frontend technologies, and building a deep
              understanding of software architecture and development principles. My expertise goes
              beyond writing clean, efficient code—I bring analytical thinking, creative
              problem-solving, and a keen eye for UI/UX to every project I work on.
            </motion.p>

            <motion.div className="about-text__stats" variants={fadeInUp}>
              <div className="about-text__stats-projects">
                <h3>30+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="about-text__stats-experience">
                <h3>{years}+ Years</h3>
                <p>Proven Experience</p>
              </div>
            </motion.div>

            <motion.a
              className="about-text__hire"
              href="#contact"
              aria-label="Scroll to contact section"
            >
              Hire me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
