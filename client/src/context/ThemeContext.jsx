import { createContext, useContext, useState, useEffect } from 'react';

// Create the context with default values
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load theme from local storage on initial render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no saved theme, check user's system preference
        setTheme('dark');
      }
    } catch (error) {
      console.error("Error loading theme from localStorage:", error);
    }
  }, []);

  // Save theme to local storage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
