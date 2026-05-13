import useDarkMode from './hooks/useDarkMode';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { dark, toggle } = useDarkMode();

  return (
    <>
      <Navbar dark={dark} onToggleDark={toggle} />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
