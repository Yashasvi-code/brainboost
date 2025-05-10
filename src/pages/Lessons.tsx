import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LessonsPage: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    duration: [] as string[],
    rating: 0,
    progress: [] as string[],
  });

  const categories = [
    'All Courses',
    'Programming',
    'Data Science',
    'Cybersecurity',
    'Web Development',
    'Machine Learning'
  ];

  const courses = [
    {
      id: 1,
      title: 'Python Programming Fundamentals',
      category: 'Programming',
      difficulty: 'Beginner',
      duration: '8 hours',
      description: 'Learn Python from scratch with hands-on exercises and projects.',
      progress: 65,
      rating: 4.5,
      reviews: 128,
      thumbnail: 'https://public.readdy.ai/ai/img_res/b5719277a42380652b962fe2c90644a5.jpg',
      started: true
    },
    {
      id: 2,
      title: 'Machine Learning with Python',
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      duration: '12 hours',
      description: 'Build ML models using scikit-learn and TensorFlow.',
      progress: 0,
      rating: 4.7,
      reviews: 95,
      thumbnail: 'https://public.readdy.ai/ai/img_res/b0735b90a7414bf1f8f633fcd1ed3af5.jpg',
      started: false
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      category: 'Web Development',
      difficulty: 'Beginner',
      duration: '20 hours',
      description: 'Full-stack development with HTML, CSS, JavaScript and Node.js',
      progress: 30,
      rating: 4.8,
      reviews: 215,
      thumbnail: 'https://public.readdy.ai/ai/img_res/bcf0f52de3efe81e0374415a20306e5c.jpg',
      started: true
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      category: 'Cybersecurity',
      difficulty: 'Beginner',
      duration: '6 hours',
      description: 'Learn to protect systems and networks from digital attacks.',
      progress: 0,
      rating: 4.3,
      reviews: 72,
      thumbnail: 'https://public.readdy.ai/ai/img_res/68330198ec2468f80bf6e737b7da4ed7.jpg',
      started: false
    },
    {
      id: 5,
      title: 'Data Science with R',
      category: 'Data Science',
      difficulty: 'Intermediate',
      duration: '10 hours',
      description: 'Data analysis and visualization using R programming.',
      progress: 90,
      rating: 4.6,
      reviews: 143,
      thumbnail: 'https://public.readdy.ai/ai/img_res/4b5a323437900e6f811ee45175ec1fb8.jpg',
      started: true
    },
    {
      id: 6,
      title: 'Advanced JavaScript Patterns',
      category: 'Programming',
      difficulty: 'Advanced',
      duration: '5 hours',
      description: 'Master advanced JavaScript concepts and design patterns.',
      progress: 0,
      rating: 4.9,
      reviews: 87,
      thumbnail: 'https://public.readdy.ai/ai/img_res/f29e82bf036f1c592768b1ad905f93bf.jpg',
      started: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    // Filter by active category
    if (activeCategory !== 'All Courses' && course.category !== activeCategory) {
      return false;
    }
    
    // Filter by difficulty
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(course.difficulty)) {
      return false;
    }
    
    // Filter by progress status
    if (filters.progress.length > 0) {
      if (filters.progress.includes('Not Started') && course.progress > 0) return false;
      if (filters.progress.includes('In Progress') && (course.progress === 0 || course.progress === 100)) return false;
      if (filters.progress.includes('Completed') && course.progress !== 100) return false;
    }
    
    // Filter by rating
    if (course.rating < filters.rating) {
      return false;
    }
    
    return true;
  });

  const toggleFilter = (type: string, value: string) => {
    setFilters(prev => {
      const currentValues = Array.isArray(prev[type as keyof typeof prev]) ? [...(prev[type as keyof typeof prev] as string[])] : [];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        return { ...prev, [type]: [...currentValues, value] };
      } else {
        return { ...prev, [type]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      duration: [],
      rating: 0,
      progress: [],
    });
  };

  const openCourseModal = (course: typeof courses[0]) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">${course.title}</h3>
          <button class="text-gray-400 hover:text-white">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="relative h-48 overflow-hidden rounded-lg mb-4">
          <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-full object-cover" />
          <div class="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
            ${course.category}
          </div>
        </div>
        
        <div class="flex items-center space-x-4 mb-4">
          <span class="text-xs font-medium ${
            course.difficulty === 'Beginner' ? 'bg-purple-900/30 text-purple-400' :
            course.difficulty === 'Intermediate' ? 'bg-green-900/30 text-green-400' :
            'bg-blue-900/30 text-blue-400'
          } px-2 py-1 rounded-full">
            ${course.difficulty}
          </span>
          <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> ${course.duration}</span>
          <div class="flex items-center">
            <div class="flex mr-1">
              ${[1, 2, 3, 4, 5].map(i => 
                i <= Math.floor(course.rating) ? 
                  '<i class="fas fa-star text-yellow-400 text-sm"></i>' :
                  i === Math.ceil(course.rating) && course.rating % 1 > 0 ?
                  '<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>' :
                  '<i class="fas fa-star text-gray-600 text-sm"></i>'
              ).join('')}
            </div>
            <span class="text-xs text-gray-400">${course.rating} (${course.reviews} reviews)</span>
          </div>
        </div>
        
        <p class="text-gray-300 mb-6">${course.description}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-700/50 p-3 rounded-lg">
            <p class="text-sm text-gray-400">Learning Objectives</p>
            <ul class="text-sm mt-2 space-y-1">
              <li><i class="fas fa-check text-green-400 mr-2"></i>Master core concepts</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Hands-on projects</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Practical applications</li>
              <li><i class="fas fa-check text-green-400 mr-2"></i>Best practices</li>
            </ul>
          </div>
          <div class="bg-gray-700/50 p-3 rounded-lg">
            <p class="text-sm text-gray-400">Prerequisites</p>
            <ul class="text-sm mt-2 space-y-1">
              <li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Basic computer skills</li>
              <li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Internet connection</li>
              <li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Dedication to learn</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <p class="text-sm font-medium text-gray-400 mb-2">Course Progress</p>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="bg-indigo-500 h-2 rounded-full" style="width: ${course.progress}%"></div>
          </div>
          <p class="text-xs text-gray-400 mt-1">${course.progress}% completed</p>
        </div>
        
        <div class="flex justify-end space-x-4">
          <button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg !rounded-button whitespace-nowrap">
            Save for Later
          </button>
          <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg !rounded-button whitespace-nowrap">
            ${course.started ? 'Continue' : 'Start'} Learning
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners to close the modal
    const closeBtn = modal.querySelector('button');
    closeBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://public.readdy.ai/ai/img_res/f29e82bf036f1c592768b1ad905f93bf.jpg"
              alt="BrainBoost Logo"
              className="h-10 w-10"
            />
            <h1 className="ml-2 text-xl font-bold text-indigo-400">BrainBoost</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="bg-gray-800 shadow-lg">
            <nav className="px-4 py-3">
              <ul className="space-y-2">
                <li>
                  <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/d8c0089c-9e3b-49b2-afa4-b1009d086d40" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-home w-6"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-chart-line w-6"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer">
                    <i className="fas fa-book w-6"></i>
                    <span>Lessons</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-question-circle w-6"></i>
                    <span>Quizzes</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-medal w-6"></i>
                    <span>Achievements</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-cog w-6"></i>
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
          <div className="p-4 flex items-center">
            <img
              src="https://public.readdy.ai/ai/img_res/4b5a323437900e6f811ee45175ec1fb8.jpg"
              alt="BrainBoost Logo"
              className="h-10 w-10"
            />
            <h1 className="ml-2 text-xl font-bold text-indigo-400">BrainBoost</h1>
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <img
                src="https://public.readdy.ai/ai/img_res/68330198ec2468f80bf6e737b7da4ed7.jpg"
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover object-top"
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Alex Johnson</p>
                <p className="text-xs text-gray-400">Level 7 Learner</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/d8c0089c-9e3b-49b2-afa4-b1009d086d40" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-home w-6"></i>
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-chart-line w-6"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer">
              <i className="fas fa-book w-6"></i>
              <span>Lessons</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-question-circle w-6"></i>
              <span>Quizzes</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-medal w-6"></i>
              <span>Achievements</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-cog w-6"></i>
              <span>Settings</span>
            </a>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold text-indigo-400">65%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Lessons</h1>
              <p className="text-gray-400 mt-1">Browse and continue your learning journey</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                <img
                  src="https://public.readdy.ai/ai/img_res/bf7c4f57ccf1d03af1df9386dcac12b1.jpg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover object-top"
                />
                <span className="hidden md:inline">Alex Johnson</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Help</a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a onClick={() => setShowSignOutModal(true)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Sign out</a>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-sliders-h mr-2"></i>
                <span>Filters</span>
              </button>
              
              <div className="relative">
                <select className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Shortest Duration</option>
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3 text-xs text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Difficulty</p>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => toggleFilter('difficulty', level)}
                        className={`text-xs px-3 py-1 rounded-full ${
                          filters.difficulty.includes(level) ? 
                          (level === 'Beginner' ? 'bg-purple-900/30 text-purple-400' :
                           level === 'Intermediate' ? 'bg-green-900/30 text-green-400' :
                           'bg-blue-900/30 text-blue-400') :
                          'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Progress</p>
                  <div className="flex flex-wrap gap-2">
                    {['Not Started', 'In Progress', 'Completed'].map(status => (
                      <button
                        key={status}
                        onClick={() => toggleFilter('progress', status)}
                        className={`text-xs px-3 py-1 rounded-full ${
                          filters.progress.includes(status) ? 'bg-indigo-900/30 text-indigo-400' : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Minimum Rating</p>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                        className={`text-lg ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      >
                        {star <= filters.rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-400 hover:text-indigo-300 mt-2"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-gray-800 rounded-xl p-4 sticky top-6">
                <h3 className="font-medium mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Difficulty</p>
                    <div className="space-y-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <div key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`difficulty-${level}`}
                            checked={filters.difficulty.includes(level)}
                            onChange={() => toggleFilter('difficulty', level)}
                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`difficulty-${level}`} className="ml-2 text-sm text-gray-300">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Progress</p>
                    <div className="space-y-2">
                      {['Not Started', 'In Progress', 'Completed'].map(status => (
                        <div key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`progress-${status}`}
                            checked={filters.progress.includes(status)}
                            onChange={() => toggleFilter('progress', status)}
                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`progress-${status}`} className="ml-2 text-sm text-gray-300">
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Minimum Rating</p>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                          className={`text-lg ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          {star <= filters.rating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-400 hover:text-indigo-300 mt-2"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Course Content */}
            <div className="flex-1">
              {/* Category Tabs */}
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                        activeCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Progress Courses */}
              {filteredCourses.some(course => course.started && course.progress < 100) && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses
                      .filter(course => course.started && course.progress < 100)
                      .map(course => (
                        <div 
                          key={course.id}
                          onClick={() => openCourseModal(course)}
                          className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
                              {course.category}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                course.difficulty === 'Beginner' ? 'bg-purple-900/30 text-purple-400' :
                                course.difficulty === 'Intermediate' ? 'bg-green-900/30 text-green-400' :
                                'bg-blue-900/30 text-blue-400'
                              }`}>
                                {course.difficulty}
                              </span>
                              <span className="text-xs text-gray-400"><i className="far fa-clock mr-1"></i> {course.duration}</span>
                            </div>
                            <h3 className="font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-indigo-500 h-2 rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {[1, 2, 3, 4, 5].map(i => 
                                    i <= Math.floor(course.rating) ? 
                                      <i key={i} className="fas fa-star text-yellow-400 text-sm"></i> :
                                      i === Math.ceil(course.rating) && course.rating % 1 > 0 ?
                                      <i key={i} className="fas fa-star-half-alt text-yellow-400 text-sm"></i> :
                                      <i key={i} className="fas fa-star text-gray-600 text-sm"></i>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400">({course.reviews})</span>
                              </div>
                              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* All Courses */}
              <div>
                <h2 className="text-xl font-bold mb-4">{activeCategory === 'All Courses' ? 'All Courses' : activeCategory}</h2>
                {filteredCourses.length === 0 ? (
                  <div className="bg-gray-800 rounded-xl p-8 text-center">
                    <i className="fas fa-book-open text-4xl text-gray-600 mb-4"></i>
                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your filters or search term</p>
                    <button 
                      onClick={clearFilters}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses
                      .filter(course => !course.started || course.progress >= 100)
                      .map(course => (
                        <div 
                          key={course.id}
                          onClick={() => openCourseModal(course)}
                          className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105 cursor-pointer"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
                              {course.category}
                            </div>
                            {course.progress === 100 && (
                              <div className="absolute top-2 left-2 bg-green-600 text-xs font-semibold px-2 py-1 rounded-full">
                                Completed
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                course.difficulty === 'Beginner' ? 'bg-purple-900/30 text-purple-400' :
                                course.difficulty === 'Intermediate' ? 'bg-green-900/30 text-green-400' :
                                'bg-blue-900/30 text-blue-400'
                              }`}>
                                {course.difficulty}
                              </span>
                              <span className="text-xs text-gray-400"><i className="far fa-clock mr-1"></i> {course.duration}</span>
                            </div>
                            <h3 className="font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                            
                            {course.started && (
                              <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-indigo-500 h-2 rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {[1, 2, 3, 4, 5].map(i => 
                                    i <= Math.floor(course.rating) ? 
                                      <i key={i} className="fas fa-star text-yellow-400 text-sm"></i> :
                                      i === Math.ceil(course.rating) && course.rating % 1 > 0 ?
                                      <i key={i} className="fas fa-star-half-alt text-yellow-400 text-sm"></i> :
                                      <i key={i} className="fas fa-star text-gray-600 text-sm"></i>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400">({course.reviews})</span>
                              </div>
                              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                                {course.started ? 'Continue' : 'Start'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Sign Out</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutModal(false);
                  window.location.href = "/login";
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg !rounded-button whitespace-nowrap"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;