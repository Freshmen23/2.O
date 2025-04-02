import { Switch, Route } from "wouter";
import { motion } from 'framer-motion';
import { useTheme } from "./context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import SubmitReview from "./pages/SubmitReview";
import NotFound from "@/pages/not-found";

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen`}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/submit-review" component={SubmitReview} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
