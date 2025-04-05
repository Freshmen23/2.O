import { motion } from 'framer-motion';
import { Search, Star, ArrowRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Home = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div
        variants={item}
        className="text-center mb-12"
      >
        <h1 className="mt-[2rem] text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Find Your Perfect Professor
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Make informed decisions about your education with real student reviews
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for a professor..."
            className="w-full px-6 py-3 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                     transition-all duration-300"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white
                     shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                     transition-all duration-300"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            className="group rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6
                     border-2 border-indigo-100 dark:border-indigo-900
                     hover:border-indigo-500 dark:hover:border-indigo-500
                     transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                <p className="text-gray-600 dark:text-gray-400">Computer Science</p>
              </div>
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-yellow-700 dark:text-yellow-300">4.5</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "Excellent professor who really cares about student success..."
            </p>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};