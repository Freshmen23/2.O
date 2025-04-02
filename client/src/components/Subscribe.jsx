import { useState } from 'react';
import { motion } from 'framer-motion';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Simulate API call
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-poppins font-bold">Subscribe for notifications</h2>
          <p className="mt-4 text-primary-100">Get updates when new professors are added or when FFCS registration is approaching</p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-400" 
              placeholder="Enter your email"
              required
              disabled={isSubmitting || isSuccess}
            />
            <motion.button 
              type="submit"
              className={`px-6 py-3 font-medium rounded-lg shadow-lg transition-colors ${
                isSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-secondary-400 text-primary-900 hover:bg-secondary-500'
              }`}
              whileHover={!isSubmitting && !isSuccess ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting && !isSuccess ? { scale: 0.95 } : {}}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? 'Subscribing...' : isSuccess ? 'Subscribed!' : 'Subscribe'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;
