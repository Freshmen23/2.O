import { motion } from 'framer-motion';
import { Users, Shield, Heart, AlertCircle, Mail } from 'lucide-react';

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
      {/* Header Section */}
      <motion.div
        variants={item}
        className="text-center mb-12"
      >
        <h1 className="mt-[2rem] text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          About ProfCheck
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Your companion for the <strong>Fully Flexible Credit System (FFCS)</strong>. 
          We help students make informed decisions to build their perfect timetable by choosing the best faculties that match their learning style.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {[
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Totally Anonymous",
            description: "Your privacy is our priority. All reviews are completely anonymous, allowing you to share honest feedback without hesitation."
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "For Students, By Students",
            description: "A platform built to help peers navigate the FFCS process smoothly by sharing real experiences and insights."
          },
          {
            icon: <Heart className="w-8 h-8" />,
            title: "Positive Intent",
            description: "Our goal is to help you find the right fit. We believe every faculty has strengths, and this platform helps match them to your needs."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            className="group rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8
                     border-2 border-indigo-100 dark:border-indigo-900
                     hover:border-indigo-500 dark:hover:border-indigo-500
                     transition-all duration-300 text-center shadow-sm dark:shadow-none"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6 text-indigo-600 dark:text-indigo-400
                       group-hover:text-indigo-800 dark:group-hover:text-indigo-300"
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Disclaimer / Mission Section */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-300" />
              <h2 className="text-3xl font-bold">Our Mission & Disclaimer</h2>
            </div>
            <div className="space-y-4 text-indigo-50 text-lg leading-relaxed">
              <p>
                Our aim is <strong>not to downgrade any faculty or offend anyone</strong>. 
                We firmly believe that every faculty member is good and knowledgeable.
              </p>
              <p>
                This platform is purely dedicated to helping students choose faculties that 
                align with their specific learning preferences and scheduling needs during the FFCS registration.
              </p>
            </div>
          </div>
          <div className="hidden md:block w-1/3">
             {/* Abstract illustration or simple visual */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
               <p className="italic text-center text-indigo-100">
                 "Education is not just about learning facts, but about finding the right mentors."
               </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={item}
        className="text-center bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Have Questions or Concerns?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          In case of any issues, incorrect information, or concerns regarding the content on this platform, please reach out to us.
        </p>
        <a 
          href="mailto:discoverfreshmen@gmail.com" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
        >
          <Mail className="w-5 h-5" />
          Contact Us
        </a>
      </motion.div>

    </motion.div>
  );
};

export default About;