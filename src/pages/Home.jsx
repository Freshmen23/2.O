import { motion } from 'framer-motion';
import { Search, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [topProfessors, setTopProfessors] = useState([]);
  const [allProfessors, setAllProfessors] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [professorReviews, setProfessorReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const searchRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch Data Effect
  useEffect(() => {
    const fetchData = async () => {
      // For top professors
      const professorsQuery = query(
        collection(db, 'faculties'),
        orderBy('overall', 'desc'),
        limit(3)
      );
      
      // Real-time listener for top professors
      const unsubscribe = onSnapshot(professorsQuery, (snapshot) => {
        const updated = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            Teaching: parseFloat(data.Teaching) || 0,
            Evaluation: parseFloat(data.Evaluation) || 0,
            Behaviour: parseFloat(data.Behaviour) || 0,
            Internals: parseFloat(data.Internals) || 0,
            ClassAverage: data.ClassAverage || 'N/A', // Fetch Text Value
            overall: parseFloat(data.overall) || 0,
            reviewCount: data.reviewCount || 0,
            name: data.name,
            department: data.department
          };
        });
        setTopProfessors(updated);
      });

      // Initial Fetch for search list (all professors)
      const allSnapshot = await getDocs(collection(db, 'faculties'));
      const allProfessors = allSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          Teaching: parseFloat(data.Teaching) || 0,
          Evaluation: parseFloat(data.Evaluation) || 0,
          Behaviour: parseFloat(data.Behaviour) || 0,
          Internals: parseFloat(data.Internals) || 0,
          ClassAverage: data.ClassAverage || 'N/A', // Fetch Text Value
          overall: parseFloat(data.overall) || 0,
          reviewCount: data.reviewCount || 0,
          name: data.name,
        };
      });
      setAllProfessors(allProfessors);
    };
    fetchData();
  }, []);

  // Fetch Reviews Effect
  useEffect(() => {
    const fetchReviews = async () => {
      if (!selectedProfessor) return;
      setLoading(true);
      try {
        const reviewsQuery = query(
          collection(db, `faculties/${selectedProfessor.id}/reviews`),
          orderBy('timestamp', 'desc'),
          limit(5)
        );
        const snapshot = await getDocs(reviewsQuery);
        setProfessorReviews(snapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      setLoading(false);
    };
    fetchReviews();
  }, [selectedProfessor]);

  const filteredProfessors = allProfessors.filter(professor =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RatingItem = ({ label, value }) => {
    // Convert value to number and handle undefined/null cases
    const numericValue = Number(value) || 0;

    return (
      <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
          {numericValue.toFixed(1)}
        </span>
      </div>
    );
  };

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
        <h1 className="mt-[2rem] text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Find Your Perfect Professor
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Make informed decisions about your education with real student reviews
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        ref={searchRef}
        variants={item}
        className="max-w-2xl mx-auto mb-12 relative"
      >
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for a professor..."
            className=" dark:text-white w-full px-6 py-3 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none
                     transition-all duration-300"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
        </div>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto
                     bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 border
                     border-indigo-100 dark:border-gray-700"
          >
            {filteredProfessors.map(professor => (
              <div
                key={professor.id}
                className="p-3 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer
                         transition-colors border-b border-indigo-50 dark:border-gray-700"
                onClick={() => {
                  setSelectedProfessor(professor);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="dark:text-white font-medium truncate">{professor.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-300">
                      {((Number(professor.Teaching) * 35
                        + Number(professor.Evaluation) * 35
                        + Number(professor.Internals) * 20 +
                        Number(professor.Behaviour) * 10) / 100).toFixed(2) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Selected Professor Detailed View */}
      {selectedProfessor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg
                   border border-indigo-100 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className=" text-white text-2xl font-bold mb-2">{selectedProfessor.name}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-yellow-700 dark:text-yellow-300">
                    {(((selectedProfessor.Teaching) * 35 +
                      (selectedProfessor.Evaluation) * 35 +
                      (selectedProfessor.Internals) * 20 +
                      (selectedProfessor.Behaviour) * 10) / 100).toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {selectedProfessor.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <RatingItem label="Teaching" value={selectedProfessor.Teaching} />
            <RatingItem label="Evaluation" value={selectedProfessor.Evaluation} />
            <RatingItem label="Behaviour" value={selectedProfessor.Behaviour} />
            <RatingItem label="Internals" value={selectedProfessor.Internals} />
            
            {/* Added Class Average Display */}
            <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">Class Avg</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {selectedProfessor.ClassAverage}
              </span>
            </div>
          </div>

          {/* Show Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Reviews</h3>

            {(loading ? Array(3).fill({}) : professorReviews
              .slice(0, showAllReviews ? undefined : 3))
              .map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg"
                >
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>Teaching: {review.teaching?.toFixed(1)}</div>
                        <div>Evaluation: {review.evaluation?.toFixed(1)}</div>
                        <div>Behaviour: {review.behaviour?.toFixed(1)}</div>
                        <div>Internals: {review.internals?.toFixed(1)}</div>
                        {/* Display Class Average in Review */}
                        <div className="col-span-2 text-indigo-600 dark:text-indigo-400 font-medium">
                          Class Avg: {review.classAverage || 'N/A'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {review.timestamp?.toDate
                          ? new Date(review.timestamp.toDate()).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </>
                  )}
                </motion.div>
              ))}

            {professorReviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {showAllReviews ? 'Show Less' : 'Show All'}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Top Professors Cards */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {topProfessors.map((professor) => (
          <motion.div
            key={professor.id}
            variants={item}
            whileHover={{ y: -5 }}
            className="group rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6
                     border-2 border-indigo-100 dark:border-indigo-900
                     hover:border-indigo-500 dark:hover:border-indigo-500
                     transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h3 className=" dark:text-white text-lg font-semibold truncate">{professor.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                    <span className=" text-sm text-green-700 dark:text-green-300">
                      Teaching: {professor.Teaching || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-yellow-700 dark:text-yellow-300">
                  {((Number(professor.Teaching) * 35
                    + Number(professor.Evaluation) * 35
                    + Number(professor.Internals) * 20 +
                    Number(professor.Behaviour) * 10) / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Evaluation:</span>
                <span className="dark:text-white ml-2 font-medium">{((professor.Evaluation).toFixed(2)) || 'N/A'}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Behaviour:</span>
                <span className=" dark:text-white ml-2 font-medium">{(professor.Behaviour).toFixed(2) || 'N/A'}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Internals:</span>
                <span className="dark:text-white ml-2 font-medium">{(professor.Internals).toFixed(2) || 'N/A'}</span>
              </div>
              {/* Added Class Average to Card */}
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Class Avg:</span>
                <span className="dark:text-white ml-2 font-medium">{professor.ClassAverage}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300"
              onClick={() => setSelectedProfessor(professor)}
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;