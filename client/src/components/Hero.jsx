import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100">
      <div className="absolute inset-0 grid-pattern [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#0f172a,rgba(15,23,42,0.6))]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <motion.div 
          className="lg:grid lg:grid-cols-12 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-slate-900 dark:text-white leading-tight"
              variants={itemVariants}
            >
              Choose the <span className="gradient-text">right professor</span> for your academic journey
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl"
              variants={itemVariants}
            >
              ProfCheck helps you make informed decisions by providing authentic reviews from students who've been there before. Don't leave your education to chance.
            </motion.p>
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <form 
                onSubmit={handleSearch}
                className="relative flex-1 flex items-center max-w-xl"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:text-white transition-colors" 
                  placeholder="Search for a professor or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="hidden sm:inline-flex ml-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Find Professors
                </button>
              </form>
              <button 
                onClick={handleSearch}
                className="sm:hidden flex-none px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Find Professors
              </button>
            </motion.div>
          </div>
          <motion.div 
            className="mt-12 lg:mt-0 lg:col-span-5 flex justify-center"
            variants={itemVariants}
          >
            <motion.div 
              className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              animate={floatAnimation}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="College campus with students" 
                className="relative rounded-full shadow-2xl object-cover h-full w-full hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 220" 
          className="text-white dark:text-slate-900 fill-current"
        >
          <path fillOpacity="1" d="M0,96L40,90.7C80,85,160,75,240,90.7C320,107,400,149,480,154.7C560,160,640,128,720,117.3C800,107,880,117,960,128C1040,139,1120,149,1200,133.3C1280,117,1360,75,1400,53.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
