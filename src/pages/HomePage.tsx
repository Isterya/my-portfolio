import SEO from '@/components/SEO/index';
import { seoHome } from '@/data/seoData.ts';

import NavBar from '@/components/navBar/NavBar.tsx';

import Hero from '@/sections/hero/Hero.tsx';
import Skills from '@/sections/skills/Skills.tsx';
import Experience from '@/sections/experience/Experience.tsx';
import About from '@/sections/about/About.tsx';
import Portfolio from '@/sections/portfolio/Portfolio.tsx';
import Price from '@/sections/price/Price.tsx';
import Contact from '@/sections/contact/Contact.tsx';

const HomePage = () => {
  return (
    <>
      <SEO {...seoHome} />

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
