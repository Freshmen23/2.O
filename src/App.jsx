import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar"; // default export used
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReviewPage from "./pages/Review";
import AdminLogin from "./pages/AdminLogin";

/*
  Key points:
  - Navbar is fixed; we add top padding to main content (pt-16) so it doesn't get covered.
  - /admin/* renders AdminLogin alone (no navbar).
  - All other routes render with Navbar + AnimatePresence exactly like your old app.
*/

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-950">
        <Routes>
          {/* Admin path is isolated and does not render the main navbar */}
          <Route path="/admin/*" element={<AdminLogin />} />

          {/* All other routes keep the navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                {/* offset content so fixed navbar doesn't overlap */}
                <main className="pt-16">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/review" element={<ReviewPage />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
