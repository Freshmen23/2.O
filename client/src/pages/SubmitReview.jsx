import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Star, Info } from 'lucide-react';

const SubmitReview = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    professorName: '',
    department: '',
    courseCode: '',
    semester: '',
    academicYear: '',
    teachingRating: 0,
    evaluationRating: 0,
    behaviorRating: 0,
    internalsRating: 0,
    comments: '',
    anonymous: false
  });

  const [hoveredRatings, setHoveredRatings] = useState({
    teaching: 0,
    evaluation: 0,
    behavior: 0,
    internals: 0
  });

  // Department options
  const departments = [
    'Computer Science',
    'Electronics and Communication',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Other'
  ];

  // Semester options
  const semesters = [
    'Fall',
    'Winter',
    'Spring',
    'Summer'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [`${category}Rating`]: value
    }));
  };

  const handleRatingHover = (category, value) => {
    setHoveredRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const resetRatingHover = (category) => {
    setHoveredRatings(prev => ({
      ...prev,
      [category]: 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.professorName || !formData.department || !formData.courseCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.teachingRating === 0 || formData.evaluationRating === 0 || 
        formData.behaviorRating === 0 || formData.internalsRating === 0) {
      toast({
        title: "Ratings required",
        description: "Please provide ratings for all categories.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, we would send this data to an API
    console.log('Submitting review:', formData);
    
    // Show success message
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. It will help other students make better choices.",
      variant: "success"
    });
    
    // Reset form
    setFormData({
      professorName: '',
      department: '',
      courseCode: '',
      semester: '',
      academicYear: '',
      teachingRating: 0,
      evaluationRating: 0,
      behaviorRating: 0,
      internalsRating: 0,
      comments: '',
      anonymous: false
    });
  };

  const getRatingLabel = (category, rating) => {
    const labels = {
      teaching: ["Poor", "Below Average", "Average", "Good", "Excellent"],
      evaluation: ["Very Harsh", "Harsh", "Fair", "Lenient", "Very Lenient"],
      behavior: ["Unprofessional", "Somewhat Unprofessional", "Professional", "Supportive", "Very Supportive"],
      internals: ["Disorganized", "Somewhat Organized", "Organized", "Well Organized", "Extremely Well Organized"]
    };
    
    return rating > 0 ? labels[category][rating - 1] : "";
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      <div className="pt-20 pb-12 bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-poppins font-bold text-slate-900 dark:text-white">Submit a Review</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Share your experience to help other students make informed decisions during FFCS registration.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-6 bg-primary-500 text-white">
              <div className="flex items-center">
                <Info className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-semibold">Guidelines for Submitting a Review</h2>
              </div>
              <p className="mt-2 text-primary-100">
                Be honest, respectful, and constructive. Focus on your experience with the professor's teaching style, evaluation methods, behavior, and internal assessment rather than personal attributes.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Professor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="professorName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Professor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="professorName"
                      name="professorName"
                      value={formData.professorName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                      placeholder="e.g. Dr. Rajesh Kumar"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Course Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="courseCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Course Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="courseCode"
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                      placeholder="e.g. CS101"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Semester
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                    >
                      <option value="">Select Semester</option>
                      {semesters.map((sem, index) => (
                        <option key={index} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="academicYear" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Academic Year
                    </label>
                    <input
                      type="text"
                      id="academicYear"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                      placeholder="e.g. 2023-2024"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Ratings <span className="text-red-500">*</span></h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Teaching Quality
                    </label>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange('teaching', value)}
                            onMouseEnter={() => handleRatingHover('teaching', value)}
                            onMouseLeave={() => resetRatingHover('teaching')}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-all ${
                                (hoveredRatings.teaching || formData.teachingRating) >= value
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="ml-4 text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px]">
                        {hoveredRatings.teaching > 0
                          ? getRatingLabel('teaching', hoveredRatings.teaching)
                          : formData.teachingRating > 0
                          ? getRatingLabel('teaching', formData.teachingRating)
                          : 'Not Rated'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Evaluation Fairness
                    </label>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange('evaluation', value)}
                            onMouseEnter={() => handleRatingHover('evaluation', value)}
                            onMouseLeave={() => resetRatingHover('evaluation')}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-all ${
                                (hoveredRatings.evaluation || formData.evaluationRating) >= value
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="ml-4 text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px]">
                        {hoveredRatings.evaluation > 0
                          ? getRatingLabel('evaluation', hoveredRatings.evaluation)
                          : formData.evaluationRating > 0
                          ? getRatingLabel('evaluation', formData.evaluationRating)
                          : 'Not Rated'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Behavior & Approachability
                    </label>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange('behavior', value)}
                            onMouseEnter={() => handleRatingHover('behavior', value)}
                            onMouseLeave={() => resetRatingHover('behavior')}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-all ${
                                (hoveredRatings.behavior || formData.behaviorRating) >= value
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="ml-4 text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px]">
                        {hoveredRatings.behavior > 0
                          ? getRatingLabel('behavior', hoveredRatings.behavior)
                          : formData.behaviorRating > 0
                          ? getRatingLabel('behavior', formData.behaviorRating)
                          : 'Not Rated'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Internals Management
                    </label>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange('internals', value)}
                            onMouseEnter={() => handleRatingHover('internals', value)}
                            onMouseLeave={() => resetRatingHover('internals')}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-all ${
                                (hoveredRatings.internals || formData.internalsRating) >= value
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="ml-4 text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[120px]">
                        {hoveredRatings.internals > 0
                          ? getRatingLabel('internals', hoveredRatings.internals)
                          : formData.internalsRating > 0
                          ? getRatingLabel('internals', formData.internalsRating)
                          : 'Not Rated'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Additional Comments</h3>
                <div>
                  <textarea
                    id="comments"
                    name="comments"
                    rows="4"
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                    placeholder="Share your experience with this professor. What did you like? What could be improved? This helps other students make informed decisions."
                  ></textarea>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Comments should be respectful and focus on teaching style, not personal attributes.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-offset-slate-800"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Submit this review anonymously
                </label>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <motion.button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Review
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div 
            className="mt-8 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Privacy Matters</h3>
            <p className="text-slate-600 dark:text-slate-300">
              We value your honest feedback. Reviews can be submitted anonymously, and we don't share your personal information with professors or other students. Your review helps improve the academic experience for everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmitReview;
