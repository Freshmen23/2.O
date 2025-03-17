import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Import the Toggle styles

const ThemeSwitcher = () => {
  // Check for saved theme or default to dark mode
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme")
  );
  // Apply the theme class to the <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className=" flex justify-center items-center">
      <Toggle
        className="flex justify-center items-center"
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};

export default ThemeSwitcher;
