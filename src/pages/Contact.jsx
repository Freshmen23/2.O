import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bug, Send } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Contact = () => {
  const [bugMode, setBugMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    bugTitle: '',
    bugDescription: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message, bugTitle, bugDescription } = formData;

    let subject = bugMode ? `Bug: ${bugTitle}` : `Message from ${name}`;
    let body = bugMode ? bugDescription : message;

    window.location.href = `mailto:discoverfreshmen@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + `\n\nFrom: ${name} (${email})`)}`;
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={item} className="text-center mb-12">
        <h1 className="mt-[2rem] text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {bugMode ? "Report a bug and help us improve!" : "Have questions or feedback? We'd love to hear from you!"}
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.form
          variants={container}
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 border-2 border-indigo-100 dark:border-indigo-900 space-y-6"
        >
          <motion.div variants={item}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white/50 dark:bg-gray-800/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white/50 dark:bg-gray-800/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
            />
          </motion.div>

          {bugMode ? (
            <>
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bug Title
                </label>
                <input
                  name="bugTitle"
                  type="text"
                  value={formData.bugTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white/50 dark:bg-gray-800/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                />
              </motion.div>
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bug Description
                </label>
                <textarea
                  name="bugDescription"
                  rows={4}
                  value={formData.bugDescription}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white/50 dark:bg-gray-800/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                ></textarea>
              </motion.div>
            </>
          ) : (
            <motion.div variants={item}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 bg-white/50 dark:bg-gray-800/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
              ></textarea>
            </motion.div>
          )}

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>{bugMode ? "Report Bug" : "Send Message"}</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>

        <motion.div variants={container} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="cursor-default rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-3 text-indigo-600 dark:text-indigo-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">discoverfreshmen@gmail.com</p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            onClick={() => setBugMode(true)}
            className="cursor-pointer rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-3 text-indigo-600 dark:text-indigo-400">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Report Bug</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Submit technical issues</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};