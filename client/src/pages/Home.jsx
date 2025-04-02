import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProfCheck from '../components/ProfCheck';
import FeaturedProfessors from '../components/FeaturedProfessors';
import FAQ from '../components/FAQ';
import About from '../components/About';
import Contact from '../components/Contact';
import Subscribe from '../components/Subscribe';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ProfCheck />
      <FeaturedProfessors />
      <FAQ />
      <About />
      <Contact />
      <Subscribe />
    </motion.div>
  );
};

export default Home;
