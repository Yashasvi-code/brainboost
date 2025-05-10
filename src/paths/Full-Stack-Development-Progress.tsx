// Project: Full-Stack Development Progress Tracker
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  useEffect(() => {
    // Initialize the progress chart
    const progressChart = echarts.init(document.getElementById('progress-chart'));
    
    const progressOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} hours'
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Current'],
        axisLine: {
          lineStyle: {
            color: '#6B7280'
          }
        },
        axisLabel: {
          color: '#9CA3AF',
          rotate: 30
        }
      },
      yAxis: {
        type: 'value',
        name: 'Hours',
        nameTextStyle: {
          color: '#9CA3AF'
        },
        min: 0,
        max: 10,
        axisLine: {
          lineStyle: {
            color: '#6B7280'
          }
        },
        axisLabel: {
          color: '#9CA3AF'
        },
        splitLine: {
          lineStyle: {
            color: '#1F2937'
          }
        }
      },
      series: [
        {
          data: [3, 5, 2, 7, 4, 6, 3],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#6366F1',
            width: 3
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#6366F1'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(99, 102, 241, 0.5)'
              }, {
                offset: 1, color: 'rgba(99, 102, 241, 0.05)'
              }]
            }
          }
        }
      ]
    };
    
    progressChart.setOption(progressOption);
    
    // Handle resize
    const handleResize = () => {
      progressChart.resize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      progressChart.dispose();
    };
  }, []);

  const toggleModule = (moduleIndex: number) => {
    if (expandedModules.includes(moduleIndex)) {
      setExpandedModules(expandedModules.filter(index => index !== moduleIndex));
    } else {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };

  const modules = [
    {
      title: "Introduction to Full-Stack Development",
      description: "Overview of full-stack development concepts and tools",
      lessons: 5,
      completed: 5,
      time: "3 hours",
      status: "Completed",
      statusClass: "bg-green-900/30 text-green-400",
      icon: "fas fa-check-circle text-green-400",
      lessons_list: [
        { title: "What is Full-Stack Development?", duration: "30 min", completed: true },
        { title: "The Role of a Full-Stack Developer", duration: "25 min", completed: true },
        { title: "Development Environments Setup", duration: "45 min", completed: true },
        { title: "Essential Tools for Full-Stack Developers", duration: "40 min", completed: true },
        { title: "Module Assessment", duration: "30 min", completed: true }
      ]
    },
    {
      title: "Frontend Fundamentals",
      description: "HTML, CSS, and JavaScript essentials",
      lessons: 8,
      completed: 6,
      time: "6 hours",
      status: "In Progress",
      statusClass: "bg-indigo-900/30 text-indigo-400",
      icon: "fas fa-spinner text-indigo-400",
      lessons_list: [
        { title: "HTML5 Structure and Semantics", duration: "45 min", completed: true },
        { title: "CSS3 Styling and Layouts", duration: "50 min", completed: true },
        { title: "Responsive Design Principles", duration: "40 min", completed: true },
        { title: "JavaScript Fundamentals", duration: "60 min", completed: true },
        { title: "DOM Manipulation", duration: "45 min", completed: true },
        { title: "Event Handling", duration: "40 min", completed: true },
        { title: "Frontend Build Tools", duration: "50 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false }
      ]
    },
    {
      title: "Frontend Frameworks",
      description: "Modern JavaScript frameworks and libraries",
      lessons: 6,
      completed: 0,
      time: "5 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Introduction to React", duration: "50 min", completed: false },
        { title: "Components and Props", duration: "45 min", completed: false },
        { title: "State Management", duration: "55 min", completed: false },
        { title: "Routing in Single Page Applications", duration: "40 min", completed: false },
        { title: "API Integration", duration: "50 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false }
      ]
    },
    {
      title: "Backend Development",
      description: "Server-side programming and API development",
      lessons: 7,
      completed: 0,
      time: "7 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Server-Side Programming Concepts", duration: "45 min", completed: false },
        { title: "Node.js Fundamentals", duration: "60 min", completed: false },
        { title: "Express.js Framework", duration: "55 min", completed: false },
        { title: "RESTful API Design", duration: "50 min", completed: false },
        { title: "Authentication and Authorization", duration: "60 min", completed: false },
        { title: "Error Handling and Middleware", duration: "40 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false }
      ]
    },
    {
      title: "Databases",
      description: "SQL, NoSQL, and database design",
      lessons: 6,
      completed: 0,
      time: "5 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Database Concepts and Design", duration: "45 min", completed: false },
        { title: "SQL Databases: MySQL/PostgreSQL", duration: "60 min", completed: false },
        { title: "NoSQL Databases: MongoDB", duration: "55 min", completed: false },
        { title: "ORM and ODM Tools", duration: "50 min", completed: false },
        { title: "Database Performance and Optimization", duration: "40 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false }
      ]
    },
    {
      title: "DevOps and Deployment",
      description: "Deployment, CI/CD, and cloud services",
      lessons: 5,
      completed: 0,
      time: "4 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Version Control with Git", duration: "45 min", completed: false },
        { title: "Containerization with Docker", duration: "55 min", completed: false },
        { title: "CI/CD Pipelines", duration: "50 min", completed: false },
        { title: "Cloud Deployment (AWS/Azure/GCP)", duration: "60 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false }
      ]
    },
    {
      title: "Full-Stack Project",
      description: "Capstone project applying all learned skills",
      lessons: 4,
      completed: 0,
      time: "10 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Project Planning and Architecture", duration: "90 min", completed: false },
        { title: "Frontend Implementation", duration: "180 min", completed: false },
        { title: "Backend and Database Implementation", duration: "180 min", completed: false },
        { title: "Deployment and Project Presentation", duration: "150 min", completed: false }
      ]
    }
  ];

  const milestones = [
    {
      title: "HTML & CSS Mastery",
      description: "Complete all HTML and CSS fundamentals",
      completed: true,
      date: "April 1, 2025",
      icon: "fas fa-code"
    },
    {
      title: "JavaScript Proficiency",
      description: "Master core JavaScript concepts",
      completed: true,
      date: "April 5, 2025",
      icon: "fab fa-js"
    },
    {
      title: "Frontend Framework",
      description: "Build applications with React",
      completed: false,
      date: "Est. April 15, 2025",
      icon: "fab fa-react"
    },
    {
      title: "Backend Development",
      description: "Create server-side applications",
      completed: false,
      date: "Est. May 1, 2025",
      icon: "fas fa-server"
    },
    {
      title: "Database Integration",
      description: "Implement database solutions",
      completed: false,
      date: "Est. May 15, 2025",
      icon: "fas fa-database"
    },
    {
      title: "Full-Stack Project",
      description: "Complete capstone project",
      completed: false,
      date: "Est. June 1, 2025",
      icon: "fas fa-project-diagram"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Navigation */}
      {/* <div className="lg:hidden">
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
                  <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer">
                    <i className="fas fa-book w-6"></i>
                    <span>Learning Paths</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-chart-line w-6"></i>
                    <span>Dashboard</span>
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
      </div> */}
      <div className="flex">
        {/* Desktop Sidebar */}
        {/* <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
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
            <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer">
              <i className="fas fa-book w-6"></i>
              <span>Learning Paths</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-chart-line w-6"></i>
              <span>Dashboard</span>
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
        </aside> */}
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
          <button 
          onClick={() => navigate(-1)} // Goes back in history
          className="flex items-center text-indigo-400 hover:text-indigo-300 mr-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Full-Stack Development</h1>
              <p className="text-gray-400 mt-1">Master both frontend and backend technologies to build complete web applications</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                <span className="hidden md:inline">Captain-Cool</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Help</a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Sign out</a>
                </div>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Your Progress</h2>
                  <div className="flex items-center mb-6">
                    <div className="relative w-24 h-24 mr-6">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="3"
                          strokeDasharray="45, 100"
                          className="progress-ring"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">45%</span>
                        <span className="text-xs text-gray-400">Completed</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-indigo-900/30 text-indigo-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Current Milestone
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold">Frontend Fundamentals</h3>
                      <p className="text-sm text-gray-400 mb-2">Complete 2 more lessons to reach the next milestone</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="flex items-center mr-4">
                          <i className="far fa-clock mr-1"></i>
                          <span>20 hours spent</span>
                        </div>
                        <div className="flex items-center">
                          <i className="far fa-calendar-alt mr-1"></i>
                          <span>Est. completion: June 1, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-750 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-book-open text-indigo-400 mr-2"></i>
                        <span className="font-medium">Total Lessons</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-2xl font-bold">11/41</p>
                        <p className="text-xs text-gray-400">Lessons completed</p>
                      </div>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-clock text-green-400 mr-2"></i>
                        <span className="font-medium">Time Remaining</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-2xl font-bold">~30h</p>
                        <p className="text-xs text-gray-400">To completion</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Weekly Activity</h2>
                    <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      Last 7 weeks
                    </div>
                  </div>
                  <div className="h-64">
                    <div id="progress-chart" className="w-full h-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Module */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-2xl p-6 md:p-8 mb-8 shadow-lg border border-indigo-800/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-900/30 text-indigo-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Currently Learning
                  </div>
                </div>
                <h2 className="text-xl font-bold">Frontend Fundamentals</h2>
                <p className="text-gray-400 mt-1">HTML, CSS, and JavaScript essentials</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-play-circle mr-2"></i>
                  Continue Learning
                </a>
              </div>
            </div>
            <div className="bg-gray-800/70 rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold">Last Accessed: Event Handling</h3>
                  <p className="text-sm text-gray-400 mt-1">Learn how to handle user interactions with JavaScript events</p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 mr-4">
                    <i className="far fa-clock mr-1"></i> 40 minutes
                  </div>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap">
                    Resume
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/70 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-tasks text-indigo-400 mr-2"></i>
                  <span className="font-medium">Module Progress</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">6/8 Lessons</span>
                  <span className="text-sm text-indigo-400">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-clock text-green-400 mr-2"></i>
                  <span className="font-medium">Time Spent</span>
                </div>
                <p className="text-2xl font-bold">4h 30m</p>
                <p className="text-xs text-gray-400">Out of 6 hours estimated</p>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-check text-purple-400 mr-2"></i>
                  <span className="font-medium">Next Up</span>
                </div>
                <p className="font-semibold">Frontend Build Tools</p>
                <p className="text-xs text-gray-400">Webpack, Babel, and other essential tools</p>
              </div>
            </div>
          </div>

          {/* Curriculum Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Curriculum Overview</h2>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-750"
                    onClick={() => toggleModule(index)}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${module.status === "Completed" ? "bg-green-900/30" : module.status === "In Progress" ? "bg-indigo-900/30" : "bg-gray-700/50"}`}>
                        <i className={module.icon}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-gray-400">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          <i className="fas fa-book mr-1"></i> {module.lessons} Lessons
                        </div>
                        <div className="text-sm text-gray-400">
                          <i className="far fa-clock mr-1"></i> {module.time}
                        </div>
                        <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${module.statusClass}`}>
                          {module.status}
                        </div>
                      </div>
                      <div className="md:hidden flex items-center">
                        <div className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${module.statusClass}`}>
                          {module.status}
                        </div>
                      </div>
                      <i className={`fas ${expandedModules.includes(index) ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400`}></i>
                    </div>
                  </div>
                  {expandedModules.includes(index) && (
                    <div className="bg-gray-750 p-4 border-t border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-800/70 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium text-indigo-400">{Math.round((module.completed / module.lessons) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full" 
                              style={{ width: `${Math.round((module.completed / module.lessons) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex md:justify-end space-x-4">
                          <div className="text-sm text-gray-400">
                            <i className="fas fa-book mr-1"></i> {module.completed}/{module.lessons} Completed
                          </div>
                          <div className="text-sm text-gray-400">
                            <i className="far fa-clock mr-1"></i> {module.time}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {module.lessons_list.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex} 
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              lesson.completed ? 'bg-green-900/10 border border-green-800/20' : 
                              module.status === "In Progress" && lessonIndex === module.completed ? 'bg-indigo-900/10 border border-indigo-800/20' : 
                              'bg-gray-800/50'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                {lesson.completed ? (
                                  <i className="fas fa-check-circle text-green-400"></i>
                                ) : module.status === "In Progress" && lessonIndex === module.completed ? (
                                  <i className="fas fa-play-circle text-indigo-400"></i>
                                ) : (
                                  <i className="far fa-circle text-gray-500"></i>
                                )}
                              </div>
                              <span className={`${lesson.completed ? 'text-gray-300' : module.status === "In Progress" && lessonIndex === module.completed ? 'text-white font-medium' : 'text-gray-400'}`}>
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-3">
                                <i className="far fa-clock mr-1"></i> {lesson.duration}
                              </span>
                              {lesson.completed ? (
                                <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Completed
                                </button>
                              ) : module.status === "In Progress" && lessonIndex === module.completed ? (
                                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Continue
                                </button>
                              ) : module.status === "In Progress" ? (
                                <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Start
                                </button>
                              ) : (
                                <button disabled className="text-xs bg-gray-700/50 text-gray-500 px-2 py-1 rounded cursor-not-allowed !rounded-button whitespace-nowrap">
                                  Locked
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Milestones */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Learning Milestones</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className={`absolute left-8 w-8 h-8 rounded-full flex items-center justify-center -ml-4 z-10 ${
                      milestone.completed ? 'bg-green-500' : 'bg-gray-700'
                    }`}>
                      <i className={`${milestone.icon} ${milestone.completed ? 'text-white' : 'text-gray-400'}`}></i>
                    </div>
                    <div className={`ml-16 p-4 rounded-lg ${
                      milestone.completed ? 'bg-green-900/10 border border-green-800/20' : 
                      index === 2 ? 'bg-indigo-900/10 border border-indigo-800/20' : 
                      'bg-gray-800'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <p className="text-sm text-gray-400">{milestone.description}</p>
                        </div>
                        <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          milestone.completed ? 'bg-green-900/30 text-green-400' : 
                          index === 2 ? 'bg-indigo-900/30 text-indigo-400' : 
                          'bg-gray-700/50 text-gray-400'
                        }`}>
                          {milestone.completed ? 'Completed' : index === 2 ? 'Current' : 'Upcoming'}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <i className="far fa-calendar-alt mr-1"></i> {milestone.date}
                      </div>
                      {milestone.completed && (
                        <div className="mt-2">
                          <div className="flex items-center">
                            <i className="fas fa-medal text-yellow-500 mr-1"></i>
                            <span className="text-xs text-yellow-400">Achievement Unlocked</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources and Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-file-alt text-blue-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Documentation</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Access comprehensive documentation for all technologies covered in this learning path.</p>
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer">
                    Browse Documentation <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-code text-green-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Practice Exercises</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Reinforce your learning with hands-on coding exercises and challenges.</p>
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer">
                    Start Practicing <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-download text-purple-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Project Files</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Download starter files and completed projects for each module.</p>
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer">
                    View Files <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-users text-yellow-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Community Forum</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Connect with fellow learners and instructors to get help and share knowledge.</p>
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer">
                    Join Discussion <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-xl p-6 shadow-lg border border-indigo-800/20">
              <h2 className="text-xl font-bold mb-4">Next Steps</h2>
              <div className="bg-gray-800/70 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-900/30 p-2 rounded-full mr-3">
                    <i className="fas fa-laptop-code text-indigo-400"></i>
                  </div>
                  <h3 className="font-medium">Frontend Build Tools</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">Learn how to use Webpack, Babel, and other essential tools for modern frontend development.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500"><i className="far fa-clock mr-1"></i> 50 minutes</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                    Start Lesson
                  </button>
                </div>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-4">
                <h3 className="font-medium mb-3">Learning Objectives</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Understand the purpose of build tools in modern web development</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Configure Webpack for bundling JavaScript applications</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Set up Babel for JavaScript transpilation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Implement CSS preprocessing with tools like Sass</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium w-full flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-play-circle mr-2"></i>
                  Continue Learning
                </a>
              </div>
            </div>
          </div>

          {/* Progress Statistics */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Your Learning Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-clock text-indigo-400 mr-2"></i>
                  <span className="font-medium">Time Spent</span>
                </div>
                <p className="text-2xl font-bold">20h 15m</p>
                <p className="text-xs text-gray-400">Total learning time</p>
              </div>
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-day text-green-400 mr-2"></i>
                  <span className="font-medium">Learning Streak</span>
                </div>
                <p className="text-2xl font-bold">7 days</p>
                <p className="text-xs text-gray-400">Current streak</p>
              </div>
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-tasks text-purple-400 mr-2"></i>
                  <span className="font-medium">Completion Rate</span>
                </div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-gray-400">Of started modules</p>
              </div>
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-star text-yellow-400 mr-2"></i>
                  <span className="font-medium">Quiz Score</span>
                </div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-gray-400">Average score</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

