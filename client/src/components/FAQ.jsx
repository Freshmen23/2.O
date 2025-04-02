import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/faqData';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section id="faq" className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Everything you need to know about ProfCheck and FFCS</p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {faqData.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden"
              variants={itemVariants}
            >
              <button 
                onClick={() => toggleTab(faq.id)} 
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-slate-900 dark:text-white">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${activeTab === faq.id ? 'transform rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {activeTab === faq.id && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                    className="px-6 pb-4"
                  >
                    <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
