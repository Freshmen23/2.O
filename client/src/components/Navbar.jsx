import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation variants
  const navAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-slate-900 dark:shadow-slate-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-secondary-400 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-primary-800 text-xl font-bold font-poppins">F</span>
              </motion.div>
              <span className="font-poppins font-bold text-xl text-primary-700 dark:text-primary-300">Freshmen</span>
            </Link>
          </div>
          
          <motion.div 
            className="hidden md:flex md:items-center md:space-x-8"
            initial="hidden"
            animate="visible"
            variants={navAnimation}
          >
            <motion.div variants={itemAnimation}>
              <Link href="/" className={`text-sm font-medium ${location === '/' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'} hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 dark:after:bg-primary-400 after:transition-all`}>
                Home
              </Link>
            </motion.div>
            <motion.div variants={itemAnimation}>
              <Link href="/about" className={`text-sm font-medium ${location === '/about' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'} hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 dark:after:bg-primary-400 after:transition-all`}>
                About
              </Link>
            </motion.div>
            <motion.div variants={itemAnimation}>
              <Link href="/faq" className={`text-sm font-medium ${location === '/faq' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'} hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 dark:after:bg-primary-400 after:transition-all`}>
                FAQ
              </Link>
            </motion.div>
            <motion.div variants={itemAnimation}>
              <Link href="/contact" className={`text-sm font-medium ${location === '/contact' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'} hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 dark:after:bg-primary-400 after:transition-all`}>
                Contact
              </Link>
            </motion.div>
            <motion.button 
              variants={itemAnimation}
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.div 
              variants={itemAnimation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/submit-review" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Submit Review
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center p-2 rounded-md transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Home</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</Link>
              <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">FAQ</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Contact</Link>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark Mode</span>
                <button 
                  onClick={toggleTheme}
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <span 
                    className={`${theme === 'dark' ? 'translate-x-5 bg-primary-500' : 'translate-x-0 bg-white'} pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
              <Link href="/submit-review" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all duration-300">Submit Review</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
