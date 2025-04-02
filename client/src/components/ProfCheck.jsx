import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const ProfCheck = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);

  // Mock professors data - in a real app, this would come from an API or database
  const professors = [
    {
      id: 1,
      name: 'Ujjwal Kumar Mishra',
      initials: 'UKM',
      department: 'Computer Science',
      ratings: {
        teaching: 2,
        evaluation: 1,
        behavior: 4,
        internals: 4,
        average: 'Low',
        overall: 'BAD'
      },
      review: 'Not the best teaching experience. Evaluations are quite harsh, but behavior is good and internals are manageable.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      initials: 'PS',
      department: 'Electronics and Communication',
      ratings: {
        teaching: 5,
        evaluation: 4,
        behavior: 5,
        internals: 4,
        average: 'High',
        overall: 'EXCELLENT'
      },
      review: 'Amazing professor! Clear explanations, fair grading, and always willing to help students understand complex concepts.'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
    
    // In a real app, this would filter the professors based on query and department
    if (searchQuery.toLowerCase().includes('ujjwal')) {
      setCurrentProfessor(professors[0]);
    } else if (searchQuery.toLowerCase().includes('priya')) {
      setCurrentProfessor(professors[1]);
    } else {
      // Default to first professor
      setCurrentProfessor(professors[0]);
    }
  };

  const getRatingColor = (parameter) => {
    if (!currentProfessor) return '';
    
    const rating = currentProfessor.ratings[parameter];
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingStarColor = (parameter) => {
    if (!currentProfessor) return '';
    
    const rating = currentProfessor.ratings[parameter];
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingBarColor = (parameter) => {
    if (!currentProfessor) return '';
    
    const rating = currentProfessor.ratings[parameter];
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getOverallRatingBadgeColor = () => {
    if (!currentProfessor) return '';
    
    const overall = currentProfessor.ratings.overall;
    if (overall === 'EXCELLENT') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (overall === 'GOOD') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (overall === 'AVERAGE') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">
            <span className="gradient-text">ProfCheck</span> is a tool to filter Professors for FFCS
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Freshman will help you filter profs before FFCS so that you'll not regret later!
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:text-white transition-colors" 
                placeholder="Search by name..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </div>
            </div>
            <div className="relative flex-1">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:text-white transition-colors appearance-none"
              >
                <option value="">All Departments</option>
                <option value="computer-science">Computer Science</option>
                <option value="electronics-communication">Electronics and Communication</option>
                <option value="mechanical-engineering">Mechanical Engineering</option>
                <option value="electrical-engineering">Electrical Engineering</option>
                <option value="civil-engineering">Civil Engineering</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </div>
            </div>
            <motion.button 
              onClick={handleSearch} 
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5 flex-none md:w-auto w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find out!
            </motion.button>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {showResults && (
            <motion.div 
              className="mt-12"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Review:</h3>
              
              {currentProfessor && (
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl dark:shadow-primary-900/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-48 bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center p-6">
                      <div className="text-center">
                        <div className="h-24 w-24 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">{currentProfessor.initials}</span>
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-white">{currentProfessor.name}</h3>
                        <p className="mt-1 text-sm text-primary-200">{currentProfessor.department}</p>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Teaching</div>
                              <div className="flex items-center">
                                <span className={`text-sm font-semibold mr-2 ${getRatingColor('teaching')}`}>
                                  {currentProfessor.ratings.teaching}/5
                                </span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <svg 
                                      key={i}
                                      className={`w-4 h-4 rating-star ${i <= currentProfessor.ratings.teaching ? getRatingStarColor('teaching') : 'text-slate-300 dark:text-slate-600'}`} 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getRatingBarColor('teaching')}`} 
                                style={{width: `${currentProfessor.ratings.teaching * 20}%`}}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Evaluation</div>
                              <div className="flex items-center">
                                <span className={`text-sm font-semibold mr-2 ${getRatingColor('evaluation')}`}>
                                  {currentProfessor.ratings.evaluation}/5
                                </span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <svg 
                                      key={i}
                                      className={`w-4 h-4 rating-star ${i <= currentProfessor.ratings.evaluation ? getRatingStarColor('evaluation') : 'text-slate-300 dark:text-slate-600'}`} 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getRatingBarColor('evaluation')}`} 
                                style={{width: `${currentProfessor.ratings.evaluation * 20}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Behavior</div>
                              <div className="flex items-center">
                                <span className={`text-sm font-semibold mr-2 ${getRatingColor('behavior')}`}>
                                  {currentProfessor.ratings.behavior}/5
                                </span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <svg 
                                      key={i}
                                      className={`w-4 h-4 rating-star ${i <= currentProfessor.ratings.behavior ? getRatingStarColor('behavior') : 'text-slate-300 dark:text-slate-600'}`} 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getRatingBarColor('behavior')}`} 
                                style={{width: `${currentProfessor.ratings.behavior * 20}%`}}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Internals</div>
                              <div className="flex items-center">
                                <span className={`text-sm font-semibold mr-2 ${getRatingColor('internals')}`}>
                                  {currentProfessor.ratings.internals}/5
                                </span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <svg 
                                      key={i}
                                      className={`w-4 h-4 rating-star ${i <= currentProfessor.ratings.internals ? getRatingStarColor('internals') : 'text-slate-300 dark:text-slate-600'}`} 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getRatingBarColor('internals')}`} 
                                style={{width: `${currentProfessor.ratings.internals * 20}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Average</div>
                            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{currentProfessor.ratings.average}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Rating</div>
                            <div className={`mt-1 px-3 py-1 text-sm font-semibold rounded-full ${getOverallRatingBadgeColor()}`}>
                              {currentProfessor.ratings.overall}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student Reviews</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{currentProfessor.review}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {!showResults && (
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-xl p-8 max-w-lg text-center">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Students in classroom" 
                className="w-64 h-64 object-cover rounded-lg mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Search for a professor to get started</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Enter a professor's name or select a department to view their reviews and ratings.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProfCheck;
