import { motion } from 'framer-motion';
import { Mail, MessageSquare, Bug, Send } from 'lucide-react';

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

export const Contact = () => {
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
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.form
          variants={container}
          className="rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8
                   border-2 border-indigo-100 dark:border-indigo-900 space-y-6"
        >
          <motion.div variants={item}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900
                       bg-white/50 dark:bg-gray-800/50
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                       transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900
                       bg-white/50 dark:bg-gray-800/50
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                       transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900
                       bg-white/50 dark:bg-gray-800/50
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                       transition-all duration-300"
            ></textarea>
          </motion.div>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white
                     shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                     transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>

        <motion.div
          variants={container}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Mail className="w-6 h-6" />,
              title: "Email",
              info: "support@profcheck.com"
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "Live Chat",
              info: "Available 9AM-5PM EST"
            },
            {
              icon: <Bug className="w-6 h-6" />,
              title: "Report Bug",
              info: "Submit technical issues"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5 }}
              className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6
                       border-2 border-indigo-100 dark:border-indigo-900
                       hover:border-indigo-500 dark:hover:border-indigo-500
                       transition-all duration-300 text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-3 text-indigo-600 dark:text-indigo-400"
              >
                {item.icon}
              </motion.div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.info}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};