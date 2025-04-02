import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import Subscribe from '../components/Subscribe';

const ContactPage = () => {
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
            <h1 className="text-4xl font-poppins font-bold text-slate-900 dark:text-white">Contact Us</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We'd love to hear from you! Reach out with questions, feedback, or if you'd like to join our team.
            </p>
          </motion.div>
        </div>
      </div>

      <Contact />
      
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Quick answers to common questions about contacting us.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">How quickly will I get a response?</h3>
              <p className="text-slate-600 dark:text-slate-300">We aim to respond to all inquiries within 24-48 hours during weekdays. For urgent matters, please indicate so in the subject line.</p>
            </motion.div>
            
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Can I join the Freshmen team?</h3>
              <p className="text-slate-600 dark:text-slate-300">Absolutely! We're always looking for passionate students to join our team. Send us your details through the contact form and specify your areas of interest.</p>
            </motion.div>
            
            <motion.div 
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">How can I report incorrect information?</h3>
              <p className="text-slate-600 dark:text-slate-300">If you spot any inaccuracies on the platform, please use the contact form with "Correction" in the subject line. Include specific details about the information that needs to be corrected.</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Subscribe />
    </motion.div>
  );
};

export default ContactPage;
