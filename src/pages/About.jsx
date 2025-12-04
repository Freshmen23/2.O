import { motion } from 'framer-motion';
import { Users, Target, Shield, CheckCircle } from 'lucide-react';

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

const About = () => {
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
          About ProfCheck
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Helping students make informed decisions about their education
        </p>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        {[
          {
            icon: <Users className="w-8 h-8" />,
            title: "Community Driven",
            description: "Built by students, for students. Our platform thrives on community feedback."
          },
          {
            icon: <Target className="w-8 h-8" />,
            title: "Accurate Reviews",
            description: "We ensure all reviews are from verified students for maximum accuracy."
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Safe & Anonymous",
            description: "Share your honest feedback while maintaining your privacy."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            className="group rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8
                     border-2 border-indigo-100 dark:border-indigo-900
                     hover:border-indigo-500 dark:hover:border-indigo-500
                     transition-all duration-300 text-center"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6 text-indigo-600 dark:text-indigo-400
                       group-hover:text-indigo-800 dark:group-hover:text-indigo-300"
            >
              {item.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="space-y-4">
              {[
                "Real, verified student reviews",
                "Comprehensive professor profiles",
                "Easy-to-use interface",
                "Regular updates and improvements"
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500"
              alt="Students studying"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
