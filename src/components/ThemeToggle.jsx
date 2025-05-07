import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Set theme on root element
    document.documentElement.setAttribute('data-theme', theme);
    // Add/remove dark class on html element
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Add/remove theme class on body
    document.body.className = theme;

    // console.log(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        )}
      </motion.div>
    </motion.button>
  );
};