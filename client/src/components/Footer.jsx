import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Share2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const footerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="py-12 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerAnimation}
        >
          <motion.div className="md:col-span-1" variants={itemAnimation}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary-400 rounded-lg shadow-lg">
                <span className="text-primary-800 text-xl font-bold font-poppins">F</span>
              </div>
              <span className="font-poppins font-bold text-xl text-white">Freshmen</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Get the immersive and smooth experience through starting off your engineering career with the help of Freshmen.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <Share2 className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/professors" className="text-slate-400 hover:text-white transition-colors">ProfCheck</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Useful Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FFCS Guide</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Course Selection Tips</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Student Handbook</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Code of Conduct</a></li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>&copy; {currentYear} Freshmen. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
