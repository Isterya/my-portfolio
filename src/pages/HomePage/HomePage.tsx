import NavBar from '../../components/navBar/NavBar';

import Hero from '../../sections/hero/Hero';
import Skills from '../../sections/skills/Skills';
import Experience from '../../sections/experience/Experience';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Hero />
      <Skills />
      <Experience />
    </>
  );
};

export default HomePage;
