export const professors = [
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
  },
  {
    id: 3,
    name: 'Dr. Rajesh Kumar',
    initials: 'RK',
    department: 'Computer Science',
    ratings: {
      teaching: 5,
      evaluation: 5,
      behavior: 5,
      internals: 5,
      average: 'High',
      overall: 'EXCELLENT'
    },
    review: 'One of the best professors in the department. Makes complex topics seem easy with real-world examples. Always available for doubt-clearing sessions and very supportive during project work.'
  },
  {
    id: 4,
    name: 'Prof. Sara Patel',
    initials: 'SP',
    department: 'Mathematics',
    ratings: {
      teaching: 4.5,
      evaluation: 5,
      behavior: 5,
      internals: 5,
      average: 'High',
      overall: 'EXCELLENT'
    },
    review: 'Makes mathematics fun and engaging! Her evaluation is very fair, and she provides extensive support for students who are struggling with the concepts. Regular doubt-clearing sessions are very helpful.'
  },
  {
    id: 5,
    name: 'Dr. Anil Khan',
    initials: 'AK',
    department: 'Physics',
    ratings: {
      teaching: 4,
      evaluation: 3,
      behavior: 5,
      internals: 4,
      average: 'Medium',
      overall: 'GOOD'
    },
    review: 'Strong focus on fundamental concepts and research applications. Challenging but fair evaluations. Very approachable and helpful during office hours.'
  },
  {
    id: 6,
    name: 'Dr. Meera Gupta',
    initials: 'MG',
    department: 'Chemistry',
    ratings: {
      teaching: 3,
      evaluation: 4,
      behavior: 4,
      internals: 3,
      average: 'Medium',
      overall: 'GOOD'
    },
    review: 'Good at explaining basic concepts but sometimes rushes through advanced topics. Fair in evaluations and provides good feedback on assignments. Labs are well-organized.'
  }
];

export const getTopProfessors = (limit = 3) => {
  return professors
    .sort((a, b) => {
      const aAvg = (a.ratings.teaching + a.ratings.evaluation + a.ratings.behavior + a.ratings.internals) / 4;
      const bAvg = (b.ratings.teaching + b.ratings.evaluation + b.ratings.behavior + b.ratings.internals) / 4;
      return bAvg - aAvg;
    })
    .slice(0, limit);
};

export const searchProfessors = (query, department) => {
  let results = [...professors];
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    results = results.filter(prof => 
      prof.name.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  if (department) {
    results = results.filter(prof => 
      prof.department.toLowerCase() === department.toLowerCase()
    );
  }
  
  return results;
};

export const getProfessorById = (id) => {
  return professors.find(prof => prof.id === parseInt(id));
};
