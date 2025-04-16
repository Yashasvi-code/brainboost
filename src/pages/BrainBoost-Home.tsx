import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// const QuizSection = () => {
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [showResult, setShowResult] = useState(false);

//   const quizQuestions = [
//     {
//       question: "What is JSX?",
//       answers: [
//         "A JavaScript syntax extension",
//         "A type of CSS preprocessor",
//         "A database query language",
//         "A state management library"
//       ],
//       correct: 0
//     },
//     {
//       question: "What is the virtual DOM in React?",
//       answers: [
//         "A lightweight copy of the actual DOM",
//         "A 3D rendering engine",
//         "A security feature",
//         "A type of cloud storage"
//       ],
//       correct: 0
//     },
//     {
//       question: "What does useEffect handle in React?",
//       answers: [
//         "Side effects",
//         "Styling components",
//         "State management",
//         "API documentation"
//       ],
//       correct: 0
//     }
//   ];

//   const handleAnswer = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex);
//     if (answerIndex === quizQuestions[currentQuestion].correct) {
//       setScore(prev => prev + 1);
//     }
    
//     setTimeout(() => {
//       if (currentQuestion < quizQuestions.length - 1) {
//         setCurrentQuestion(prev => prev + 1);
//       } else {
//         setShowResult(true);
//       }
//       setSelectedAnswer(null);
//     }, 1000);
//   };

//   const resetQuiz = () => {
//     setShowQuiz(false);
//     setCurrentQuestion(0);
//     setScore(0);
//     setSelectedAnswer(null);
//     setShowResult(false);
//   };

//   const data = {
//     labels: ['Correct', 'Incorrect'],
//     datasets: [
//       {
//         data: [score, quizQuestions.length - score],
//         backgroundColor: ['#6366f1', '#3b82f6'],
//         hoverBackgroundColor: ['#818cf8', '#60a5fa']
//       }
//     ]
//   };
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       {/* Practice Quiz Card */}
//       <div 
//         className={`bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer ${
//           showQuiz ? 'hidden' : ''
//         }`}
//         onClick={() => setShowQuiz(true)}
//       >
//         <div className="bg-green-900/50 p-3 rounded-full mb-3">
//           <i className="fas fa-question-circle text-green-400 text-xl"></i>
//         </div>
//         <h3 className="font-medium">Practice Quiz</h3>
//         <p className="text-xs text-gray-400 mt-1">Test Your Knowledge</p>
//       </div>
//        {/* Quiz Container */}
//        {showQuiz && (
//         <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 relative">
//             {/* Close Button */}
//             <button
//               onClick={resetQuiz}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//             >
//               <i className="fas fa-times"></i>
//             </button>

//             {!showResult ? (
//               /* Questions */
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-center mb-6">
//                   Question {currentQuestion + 1}/{quizQuestions.length}
//                 </h2>
                
//                 <h3 className="text-xl font-semibold mb-6">
//                   {quizQuestions[currentQuestion].question}
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {quizQuestions[currentQuestion].answers.map((answer, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleAnswer(index)}
//                       className={`p-4 rounded-xl transition-all ${
//                         selectedAnswer === index
//                           ? index === quizQuestions[currentQuestion].correct
//                             ? 'bg-green-600/50 border-2 border-green-400'
//                             : 'bg-red-600/50 border-2 border-red-400'
//                           : 'bg-gray-700 hover:bg-gray-600'
//                       }`}
//                       disabled={selectedAnswer !== null}
//                     >
//                       {answer}
//                       {selectedAnswer === index && (
//                         <span className="ml-2">
//                           {index === quizQuestions[currentQuestion].correct ? '✓' : '✗'}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               /* Results */
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold mb-6">Quiz Results</h2>
                
//                 <div className="max-w-xs mx-auto mb-8">
//                   <Doughnut 
//                     data={data}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: true
//                     }}
//                   />
//                 </div>

//                 <p className="text-xl mb-6">
//                   Score: {score}/{quizQuestions.length} (
//                   {((score / quizQuestions.length) * 100}%)
//                 </p>

//                 {/* Recommendations */}
//                 <div className="bg-gray-700 rounded-xl p-4 mt-6">
//                   <h3 className="text-lg font-semibold mb-4">
//                     {score === quizQuestions.length
//                       ? "Perfect Score! Recommended Advanced Courses:"
//                       : score >= quizQuestions.length / 2
//                       ? "Good Job! Recommended Next Steps:"
//                       : "Keep Practicing! Recommended Fundamentals:"}
//                   </h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {score >= quizQuestions.length / 2 ? (
//                       <>
//                         <div className="bg-gray-600 p-4 rounded-lg">
//                           <h4>Advanced React Patterns</h4>
//                           <p className="text-sm text-gray-400 mt-2">
//                             Master complex state management
//                           </p>
//                         </div>
//                         <div className="bg-gray-600 p-4 rounded-lg">
//                           <h4>Performance Optimization</h4>
//                           <p className="text-sm text-gray-400 mt-2">
//                             Learn memoization techniques
//                           </p>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="bg-gray-600 p-4 rounded-lg">
//                           <h4>React Fundamentals</h4>
//                           <p className="text-sm text-gray-400 mt-2">
//                             Core concepts and JSX basics
//                           </p>
//                         </div>
//                         <div className="bg-gray-600 p-4 rounded-lg">
//                           <h4>Component Architecture</h4>
//                           <p className="text-sm text-gray-400 mt-2">
//                             Building reusable components
//                           </p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={resetQuiz}
//                   className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("recommended");
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Add course enrollment functionality
  const handleEnrollment = (courseId: string) => {
    setEnrolledCourses((prev) => new Set(prev).add(courseId));
    alert(`Enrolled in ${courseId} course!`);
  };

  // Add event registration handler
  const handleEventRegistration = (eventId: number) => {
    setSelectedEvent(eventId);
    alert(`Registered for event #${eventId}`);
  };

  // Add authentication handlers
  const handleSignIn = () => {
    // Add actual authentication logic here
    alert("Sign in logic would go here");
  };

  const handleSignOut = () => {
    // Add actual sign out logic here
    alert("Signing out...");
  };

  // Add navigation handlers
  const navigateTo = (section: string) => {
    alert(`Navigating to ${section}`);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Initialize the streak chart
    const streakChart = echarts.init(document.getElementById("streak-chart"));

    const streakOption = {
      animation: false,
      grid: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: {
          lineStyle: {
            color: "#6B7280",
          },
        },
        axisLabel: {
          color: "#9CA3AF",
        },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 5,
        axisLine: {
          lineStyle: {
            color: "#6B7280",
          },
        },
        axisLabel: {
          color: "#9CA3AF",
        },
        splitLine: {
          lineStyle: {
            color: "#1F2937",
          },
        },
      },
      series: [
        {
          data: [2, 3, 4, 2, 5, 3, 4],
          type: "bar",
          barWidth: "60%",
          itemStyle: {
            color: "#6366F1",
          },
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    };

    streakChart.setOption(streakOption);

    // Handle resize
    const handleResize = () => {
      streakChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      streakChart.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Navigation */}
      {/* <div className="lg:hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">

            <h1 className="ml-2 text-xl font-bold text-indigo-400">
              BrainBoost
            </h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
          >
            <i
              className={`fas ${
                isMobileMenuOpen ? "fa-times" : "fa-bars"
              } text-xl`}
            ></i>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="bg-gray-800 shadow-lg">
            <nav className="px-4 py-3">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("home");
                    }}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-home w-6"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("homeDashboard");
                    }}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-chart-line w-6"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-book w-6"></i>
                    <span>Lessons</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-question-circle w-6"></i>
                    <span>Quizzes</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-medal w-6"></i>
                    <span>Achievements</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                  >
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
        <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
          <div className="p-4 flex items-center">
            <h1 className="ml-2 text-xl font-bold text-indigo-400">
              BrainBoost
            </h1>
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-xl font-medium">Yashasvi Tiwari</p>
                <p className="text-sm text-gray-400">Level 7 Learner</p>
              </div>
            </div>
          </div>
          {/* <nav className="flex-1 px-2 py-4 space-y-1">
            <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer">
              <i className="fas fa-home w-6"></i>
              <span>Home</span>
            </a>
            <a href="./pages/Personalized-Learning-Tutor" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-chart-line w-6"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
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
          </nav> */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold text-indigo-400">65%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-indigo-500 h-2.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Home</h1>
              <p className="text-gray-400 mt-1">
                Welcome back, Yashasvi ! Ready to continue your learning
                journey?
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                {/* img */}
                <span className="hidden md:inline">Yashasvi </span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Help
                  </a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Sign out
                  </a>{" "}
                </div>
              )}
            </div>
          </div>

          {/* Hero Welcome Section */}
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/*  */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12">
              <div className="w-full md:w-3/5 mb-6 md:mb-0">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Hello, <span className="text-indigo-400">Yashasvi!</span>
                </h2>
                <p className="text-lg text-gray-200 mb-6">
                  You're on a 7-day learning streak. Keep going to reach your
                  next milestone!
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-gray-800/80 rounded-xl p-4 flex-1">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-fire text-orange-500 mr-2"></i>
                      <span className="font-medium">Current Streak</span>
                    </div>
                    <p className="text-2xl font-bold">7 Days</p>
                  </div>
                  <div className="bg-gray-800/80 rounded-xl p-4 flex-1">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                      <span className="font-medium">Next Badge</span>
                    </div>
                    <p className="text-2xl font-bold">3 Days Left</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo("next-lesson")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Continue Learning
                </button>
              </div>
              <div className="w-full md:w-2/5 h-40 md:h-64">
                <div id="streak-chart" className="w-full h-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <div className="bg-indigo-900/50 p-3 rounded-full mb-3">
                <i className="fas fa-play text-indigo-400 text-xl"></i>
              </div>
              <h3 className="font-medium">Resume Learning</h3>
              <p className="text-xs text-gray-400 mt-1">Machine Learning</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <div className="bg-purple-900/50 p-3 rounded-full mb-3">
                <i className="fas fa-tasks text-purple-400 text-xl"></i>
              </div>
              <h3 className="font-medium">Today's Tasks</h3>
              <p className="text-xs text-gray-400 mt-1">3 Remaining</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <div className="bg-blue-900/50 p-3 rounded-full mb-3">
                <i className="fas fa-calendar-alt text-blue-400 text-xl"></i>
              </div>
              <h3 className="font-medium">Upcoming Events</h3>
              <p className="text-xs text-gray-400 mt-1">Live Session Today</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <div className="bg-green-900/50 p-3 rounded-full mb-3">
                <i className="fas fa-question-circle text-green-400 text-xl"></i>
              </div>
              {/* <h3 className="font-medium">Practice Quiz</h3>
              <p className="text-xs text-gray-400 mt-1">Test Your Knowledge</p> }
            </div>
            {/* <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
    <QuizSection />
  </div> */}
</div>

          </div>

          {/* Featured Courses */}
          <div className="mb-10">
            {/* <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Featured Courses</h2>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer"
              >
                View All Courses
              </a>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://www.datamanagementblog.com/wp-content/uploads/2024/03/Getting-the-Fundamentals-Right-for-Gen-AI.png"
                    alt="AI Fundamentals"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                      Beginner
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="far fa-clock mr-1"></i> 12 hours
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Artificial Intelligence Fundamentals
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Learn the core concepts of AI and how it's transforming
                    industries worldwide.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star-half-alt text-yellow-400 text-sm"></i>
                      </div>
                      <span className="text-xs text-gray-400 ml-1">4.5</span>
                    </div>
                    <button onClick={() => handleEnrollment('ai-fundamentals')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
    Enroll Now
  </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg"
                    alt="Data Science"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="far fa-clock mr-1"></i> 18 hours
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Data Science Masterclass
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Master the tools and techniques for analyzing complex
                    datasets and extracting insights.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-gray-600 text-sm"></i>
                      </div>
                      <span className="text-xs text-gray-400 ml-1">4.2</span>
                    </div>
                    <button onClick={() => handleEnrollment('ai-fundamentals')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
    Enroll Now
  </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E12AQFENQINiyC4hw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1718586825812?e=2147483647&v=beta&t=AkysOREzQ8guCzmXsLCOOZeO-K6B9uoCMqBB75dCmRA"
                    alt="Cybersecurity"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 bg-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">
                      Advanced
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="far fa-clock mr-1"></i> 15 hours
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Advanced Cybersecurity
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Develop expertise in protecting systems and networks from
                    sophisticated cyber threats.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                      </div>
                      <span className="text-xs text-gray-400 ml-1">4.9</span>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Learning Paths</h2>
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer"
              >
                View All Paths
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition-colors duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full mr-4">
                    <i className="fas fa-laptop-code text-indigo-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Full-Stack Development
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Master both frontend and backend technologies
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="text-indigo-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>
                    <i className="fas fa-book mr-1"></i> 8 Courses
                  </span>
                  <span>
                    <i className="far fa-clock mr-1"></i> Est. 4 months
                  </span>
                </div>
                <button onClick={() => navigateTo('fullstack-path')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
    Continue Path
  </button>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:bg-gray-750 transition-colors duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-4">
                    <i className="fas fa-brain text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Machine Learning Engineer
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Build intelligent systems and algorithms
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="text-purple-400">20%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>
                    <i className="fas fa-book mr-1"></i> 12 Courses
                  </span>
                  <span>
                    <i className="far fa-clock mr-1"></i> Est. 6 months
                  </span>
                </div>
                <button onClick={() => navigateTo('fullstack-path')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
    Continue Path
  </button>
              </div>
            </div>
          </div>

          {/* Tabs for Recommendations, Announcements, and Events */}
          <div className="bg-gray-800 rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setCurrentTab("recommended")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentTab === "recommended"
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <i className="fas fa-star mr-2"></i> Recommended For You
                </button>
                <button
                  onClick={() => setCurrentTab("announcements")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentTab === "announcements"
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <i className="fas fa-bullhorn mr-2"></i> Announcements
                </button>
                <button
                  onClick={() => setCurrentTab("events")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentTab === "events"
                      ? "border-indigo-500 text-indigo-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  <i className="fas fa-calendar-alt mr-2"></i> Upcoming Events
                </button>
              </nav>
            </div>
            <div className="p-6">
              {currentTab === "recommended" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Personalized Recommendations
                    </h3>
                    <span className="text-xs text-gray-400">
                      Based on your learning history
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                      <div className="bg-blue-900/30 p-3 rounded-lg mr-4">
                        <i className="fas fa-book-reader text-blue-400 text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            Python for Data Analysis
                          </h4>
                          <div className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                            Course
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Learn how to use Python libraries for effective data
                          analysis
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="far fa-clock mr-1"></i> 8 hours
                          </span>
                          <button onClick={() => navigateTo('python-data-analysis')} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
    Start Learning
  </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                      <div className="bg-green-900/30 p-3 rounded-lg mr-4">
                        <i className="fas fa-file-alt text-green-400 text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            Web Security Best Practices
                          </h4>
                          <div className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                            Article
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Essential security practices for modern web
                          applications
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="far fa-clock mr-1"></i> 15 min read
                          </span>
                          <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                            Read Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                      <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
                        <i className="fas fa-puzzle-piece text-purple-400 text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            JavaScript Coding Challenge
                          </h4>
                          <div className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">
                            Practice
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Test your JS skills with these intermediate-level
                          challenges
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="fas fa-code mr-1"></i> 5 challenges
                          </span>
                          <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                            Start Practice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === "announcements" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Recent Announcements
                    </h3>
                    <a
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer"
                    >
                      View All
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 bg-gray-750 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">New Courses Added</h4>
                        <span className="text-xs text-gray-400">
                          April 1, 2025
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        We've added 5 new courses on Cloud Computing and DevOps.
                        Check them out in the course catalog!
                      </p>
                      <a
                        href="#"
                        className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block cursor-pointer"
                      >
                        Learn More
                      </a>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-gray-750 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Platform Update</h4>
                        <span className="text-xs text-gray-400">
                          March 28, 2025
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        We've improved our recommendation engine to better match
                        your learning goals and preferences.
                      </p>
                      <a
                        href="#"
                        className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block cursor-pointer"
                      >
                        Learn More
                      </a>
                    </div>
                    <div className="border-l-4 border-yellow-500 bg-gray-750 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Community Highlight</h4>
                        <span className="text-xs text-gray-400">
                          March 25, 2025
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Congratulations to our community members who completed
                        the Machine Learning challenge last week!
                      </p>
                      <a
                        href="#"
                        className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block cursor-pointer"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {currentTab === "events" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Upcoming Events</h3>
                    <a
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer"
                    >
                      View Calendar
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex bg-gray-750 rounded-lg overflow-hidden">
                      <div className="bg-indigo-600 px-3 py-4 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">03</span>
                        <span className="text-xs">APR</span>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">
                            Live Coding Session: Building a React App
                          </h4>
                          <span className="text-xs bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded-full">
                            Live
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Join our expert instructor for a hands-on coding
                          session
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="far fa-clock mr-1"></i> 2:00 PM - 4:00
                            PM
                          </span>
                          <button onClick={() => handleEventRegistration(1)} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
    Add to Calendar
  </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex bg-gray-750 rounded-lg overflow-hidden">
                      <div className="bg-purple-600 px-3 py-4 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">05</span>
                        <span className="text-xs">APR</span>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">
                            Data Science Weekly Quiz
                          </h4>
                          <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">
                            Quiz
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Test your knowledge and compete with other learners
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="far fa-clock mr-1"></i> 6:00 PM - 7:00
                            PM
                          </span>
                          <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                            Set Reminder
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex bg-gray-750 rounded-lg overflow-hidden">
                      <div className="bg-green-600 px-3 py-4 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">10</span>
                        <span className="text-xs">APR</span>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">
                            Industry Expert AMA: Cybersecurity
                          </h4>
                          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                            Webinar
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Ask questions to a leading cybersecurity professional
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            <i className="far fa-clock mr-1"></i> 1:00 PM - 2:30
                            PM
                          </span>
                          <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {/* <footer className="bg-gray-800 rounded-xl p-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    >
                      Community Forums
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    >
                      Learning Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    >
                      Career Services
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4 mb-4">
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer"
                  >
                    <i className="fab fa-twitter text-gray-300"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer"
                  >
                    <i className="fab fa-linkedin-in text-gray-300"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer"
                  >
                    <i className="fab fa-github text-gray-300"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer"
                  >
                    <i className="fab fa-discord text-gray-300"></i>
                  </a>
                </div>
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter for updates
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">BrainBoost</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Empowering learners worldwide with cutting-edge education in
                  technology and beyond.
                </p>
                <p className="text-xs text-gray-500">
                  © 2025 BrainBoost Learning. All rights reserved.
                </p>
              </div>
            </div>
          </footer> */}
        </main>
      </div>
    </div>
  );
};

export default App;
