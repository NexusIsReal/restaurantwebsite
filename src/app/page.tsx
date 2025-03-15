import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgressBar from '../components/ScrollProgressBar';
import SectionDots from '../components/SectionDots';

export default function Home() {
  return (
    <main>
      <ScrollProgressBar />
      <Navbar />
      <SectionDots />
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
} 