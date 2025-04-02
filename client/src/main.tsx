import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from 'framer-motion';
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  </ThemeProvider>
);
