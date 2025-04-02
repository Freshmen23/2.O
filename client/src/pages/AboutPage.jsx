import { motion } from 'framer-motion';
import About from '../components/About';
import FeaturedProfessors from '../components/FeaturedProfessors';
import Subscribe from '../components/Subscribe';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-20 pb-12 bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-poppins font-bold text-slate-900 dark:text-white">About Us</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Learn more about our mission, who we are, and how we're helping students make better academic choices.
            </p>
          </motion.div>
        </div>
      </div>

      <About />
      
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Our Journey</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Started in 2020 by a group of students who wanted to make course registration simpler, Freshmen has grown to become the go-to platform for students across the campus.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">2000+</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Students Helped</h3>
              <p className="text-slate-600 dark:text-slate-300">Students who have used our platform to make informed decisions about their course selections.</p>
            </motion.div>
            
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">350+</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Professors Reviewed</h3>
              <p className="text-slate-600 dark:text-slate-300">Comprehensive reviews and ratings for professors across all departments in the university.</p>
            </motion.div>
            
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">98%</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Satisfaction Rate</h3>
              <p className="text-slate-600 dark:text-slate-300">Students who felt that our platform helped them make better decisions for their academic journey.</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      <FeaturedProfessors />
      <Subscribe />
    </motion.div>
  );
};

export default AboutPage;
