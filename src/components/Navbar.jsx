import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full top-0 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ProfCheck
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' },
              { path: '/review', label: 'review' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 
                  ${location.pathname === item.path ? 'text-white' : 'hover:text-indigo-600'}`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-indigo-600 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                )}
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};