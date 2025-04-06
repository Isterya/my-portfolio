import NavBar from '../../components/navBar/NavBar';

import Hero from '../../sections/hero/Hero';
import Skills from '../../sections/skills/Skills';
import Experience from '../../sections/experience/Experience';
import About from '../../sections/about/About';
import Portfolio from '../../sections/portfolio/Portfolio';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Hero />
      <Skills />
      <Experience />
      <About />
      <Portfolio />
    </>
  );
};

export default HomePage;
