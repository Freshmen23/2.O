import { motion } from 'framer-motion';
import FAQ from '../components/FAQ';
import Subscribe from '../components/Subscribe';

const FAQPage = () => {
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
            <h1 className="text-4xl font-poppins font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Find answers to common questions about ProfCheck, FFCS, and how to get the most out of our platform.
            </p>
          </motion.div>
        </div>
      </div>

      <FAQ />
      
      <div className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Still Have Questions?</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Can't find the answer you're looking for? We're here to help!
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Send us an email and we'll get back to you as soon as possible.</p>
              <a 
                href="mailto:support@freshmen.edu" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Email Support
              </a>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Contact Us</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Fill out our contact form and we'll respond to your inquiry.</p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-primary-600 dark:text-primary-400 font-medium rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300"
              >
                Contact Form
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Subscribe />
    </motion.div>
  );
};

export default FAQPage;
