import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Sliders, Shield, Users, ChevronRight } from 'lucide-react';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section id="about" className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <motion.div 
            className="lg:col-span-5 mb-10 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Students collaborating on campus" 
                className="relative rounded-3xl shadow-xl object-cover w-full h-[450px]"
              />
            </div>
          </motion.div>
          <motion.div 
            className="lg:col-span-7 lg:pl-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-poppins font-bold text-slate-900 dark:text-white"
              variants={itemVariants}
            >
              About Freshmen
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-slate-600 dark:text-slate-300"
              variants={itemVariants}
            >
              Freshmen is a student-led initiative designed to help new students navigate their academic journey with confidence. We understand that choosing the right professors can make a significant difference in your learning experience and academic outcomes.
            </motion.p>
            <motion.div 
              className="mt-8 space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Sliders className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Our Mission</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">To empower students with accurate, meaningful information about professors so they can make informed decisions during FFCS registration that align with their learning styles and academic goals.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Our Values</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">We believe in transparency, accuracy, and fairness. Our platform is built on honest student reviews, with measures in place to prevent misuse and ensure that all professors are evaluated on consistent criteria.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Our Team</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">Started by a group of senior students who wanted to help incoming freshmen avoid common pitfalls, our team now includes representatives from various departments who work to collect and verify reviews.</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="mt-8"
              variants={itemVariants}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Join Our Community
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
