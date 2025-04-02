import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Star, ChevronRight } from 'lucide-react';

const FeaturedProfessors = () => {
  // Mock data for top professors
  const topProfessors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      initials: 'RK',
      department: 'Computer Science',
      rating: 5.0,
      reviews: 48,
      tags: ['Clear explanations', 'Fair grading', 'Helpful']
    },
    {
      id: 2,
      name: 'Prof. Sara Patel',
      initials: 'SP',
      department: 'Mathematics',
      rating: 4.9,
      reviews: 35,
      tags: ['Engaging', 'Supportive', 'Patient']
    },
    {
      id: 3,
      name: 'Dr. Anil Khan',
      initials: 'AK',
      department: 'Physics',
      rating: 4.0,
      reviews: 29,
      tags: ['Knowledgeable', 'Research oriented', 'Challenging']
    }
  ];

  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Top Rated Professors</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Meet the professors that students love the most</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {topProfessors.map(professor => (
            <motion.div 
              key={professor.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`h-3 ${professor.rating >= 4.5 ? 'bg-green-500' : professor.rating >= 4 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center text-xl font-bold text-primary-700 dark:text-primary-300">
                    {professor.initials}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{professor.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{professor.department}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={20}
                        className={`${i < Math.floor(professor.rating) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                        fill={i < Math.floor(professor.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">{professor.rating.toFixed(1)} ({professor.reviews} reviews)</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {professor.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link href={`/professor/${professor.id}`} className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    View full profile
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            href="/professors" 
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-primary-600 dark:text-primary-400 font-medium rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300"
          >
            Explore all professors
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProfessors;
