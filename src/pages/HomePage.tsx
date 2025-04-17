import NavBar from '../components/navBar/NavBar';
import Footer from '../components/footer/Footer';

import Hero from '../sections/hero/Hero';
import Skills from '../sections/skills/Skills';
import Experience from '../sections/experience/Experience';
import About from '../sections/about/About';
import Portfolio from '../sections/portfolio/Portfolio';
import Price from '../sections/price/Price';
import Contact from '../sections/contact/Contact';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Hero />
      <Skills />
      <Experience />
      <About />
      <Portfolio />
      <Price />
      <Contact />
    </>
  );
};

export default HomePage;
