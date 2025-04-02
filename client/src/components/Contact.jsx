import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Instagram, Twitter, Share2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would typically send the data to a backend
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Show success message (in a real app, you might use a toast notification)
    alert('Message sent successfully!');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-slate-900 relative">
      <div className="absolute inset-0 grid-pattern [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#0f172a,rgba(15,23,42,0.6))]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-poppins font-bold text-slate-900 dark:text-white"
              variants={itemVariants}
            >
              Get in touch
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-lg"
              variants={itemVariants}
            >
              Have questions, suggestions, or want to report an issue? We'd love to hear from you. Reach out to us using the form or through our social media channels.
            </motion.p>
            
            <motion.div 
              className="mt-8 space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Email</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">support@freshmen.edu</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Location</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">Student Activity Center, University Campus</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Office Hours</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">Monday-Friday: 10AM - 6PM</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-8"
              variants={containerVariants}
            >
              <motion.h3 
                className="text-lg font-semibold text-slate-900 dark:text-white"
                variants={itemVariants}
              >
                Connect with us
              </motion.h3>
              <motion.div 
                className="mt-4 flex space-x-5"
                variants={itemVariants}
              >
                <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                  <span className="sr-only">Discord</span>
                  <Share2 className="h-6 w-6" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 lg:mt-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <div className="mt-1">
                      <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name" 
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors" 
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <div className="mt-1">
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email" 
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors" 
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                    <div className="mt-1">
                      <input 
                        type="text" 
                        name="subject" 
                        id="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors" 
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                    <div className="mt-1">
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        rows="4" 
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors" 
                        placeholder="Your message..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <motion.button 
                      type="submit" 
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
