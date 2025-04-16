// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
// import * as echarts from 'echarts';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [progress, setProgress] = useState(20);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const totalSections = 5;

  useEffect(() => {
    // Update progress when section changes
    setProgress((currentSection / totalSections) * 100);
  }, [currentSection]);

  const handlePrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Navigation */}
      {/* <div className="lg:hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
           
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
                  <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
                    <i className="fas fa-home w-6"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
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
      </div> */}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
          <div className="p-4 flex items-center">
            <h1 className="ml-2 text-xl font-bold text-indigo-400">BrainBoost</h1>
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              
              <div className="ml-3">
                <p className="text-xl font-medium">Yashasvi Tiwari</p>
                <p className="text-sm text-gray-400">Level 7 Learner</p>
              </div>
            </div>
          </div>
          {/* <nav className="flex-1 px-2 py-4 space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
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
          </nav> */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Lesson Progress</span>
                <span className="text-sm font-bold text-indigo-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Header with Progress */}
          <div className="bg-gray-800 sticky top-0 z-10 shadow-md">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <a 
                    href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" 
                    data-readdy="true" 
                    className="mr-4 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </a>
                  <h1 className="text-xl font-bold">Machine Learning Fundamentals</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block text-sm text-gray-400">
                    <i className="far fa-clock mr-1"></i> 25 min remaining
                  </div>
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="text-gray-400 hover:text-yellow-400 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className={`${isBookmarked ? 'fas text-yellow-400' : 'far'} fa-bookmark`}></i>
                  </button>
                  <button 
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-gray-400 hover:text-indigo-400 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="far fa-sticky-note"></i>
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <span className="hidden md:inline text-sm">Section {currentSection}/{totalSections}</span>
                      <i className="fas fa-chevron-down text-xs"></i>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                        {[...Array(totalSections)].map((_, index) => (
                          <button 
                            key={index}
                            onClick={() => {
                              setCurrentSection(index + 1);
                              setIsDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${currentSection === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'} cursor-pointer`}
                          >
                            Section {index + 1}: {getSectionTitle(index + 1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-4">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="container mx-auto px-6 py-8">
            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{getSectionTitle(currentSection)}</h2>
              <p className="text-gray-400">
                {currentSection === 1 && "Introduction to the core concepts of machine learning algorithms and their applications."}
                {currentSection === 2 && "Understanding the different types of machine learning algorithms and when to use them."}
                {currentSection === 3 && "Deep dive into neural networks and their architecture."}
                {currentSection === 4 && "Practical applications and case studies of machine learning in the real world."}
                {currentSection === 5 && "Future trends and ethical considerations in machine learning."}
              </p>
            </div>

            {/* Content based on current section */}
            {renderSectionContent(currentSection)}

            {/* Notes Panel (Slide from right) */}
            <div className={`fixed inset-y-0 right-0 w-80 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${showNotes ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Your Notes</h3>
                  <button 
                    onClick={() => setShowNotes(false)}
                    className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <textarea
                  className="flex-1 w-full bg-gray-700 text-white rounded-lg p-3 mb-4 border-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Take notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between items-center">
              <button
                onClick={handlePrevSection}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap ${currentSection === 1 ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                disabled={currentSection === 1}
              >
                <i className="fas fa-arrow-left"></i>
                <span>Previous</span>
              </button>
              
              <div className="flex space-x-1">
                {[...Array(totalSections)].map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${currentSection === index + 1 ? 'bg-indigo-500' : 'bg-gray-600'}`}
                  ></div>
                ))}
              </div>
              
              {currentSection < totalSections ? (
                <button
                  onClick={handleNextSection}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <span>Next</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <a 
                  href="#" 
                  data-readdy="true"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <span>Complete Lesson</span>
                  <i className="fas fa-check"></i>
                </a>
              )}
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

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Knowledge Check</h3>
              <button 
                onClick={() => setShowQuiz(false)}
                className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Which of the following is NOT a type of machine learning?</h4>
              
              <div className="space-y-3">
                <div 
                  onClick={() => !isAnswerSubmitted && setSelectedAnswer(0)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAnswer === 0 
                      ? isAnswerSubmitted 
                        ? 'bg-red-900/30 border-red-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 0 
                        ? isAnswerSubmitted 
                          ? 'border-red-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 0 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Supervised Learning</span>
                    {isAnswerSubmitted && selectedAnswer === 0 && (
                      <i className="fas fa-times text-red-500 ml-auto"></i>
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => !isAnswerSubmitted && setSelectedAnswer(1)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAnswer === 1 
                      ? isAnswerSubmitted 
                        ? 'bg-red-900/30 border-red-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 1 
                        ? isAnswerSubmitted 
                          ? 'border-red-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 1 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Unsupervised Learning</span>
                    {isAnswerSubmitted && selectedAnswer === 1 && (
                      <i className="fas fa-times text-red-500 ml-auto"></i>
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => !isAnswerSubmitted && setSelectedAnswer(2)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAnswer === 2 
                      ? isAnswerSubmitted 
                        ? 'bg-green-900/30 border-green-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 2 
                        ? isAnswerSubmitted 
                          ? 'border-green-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 2 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Prescriptive Learning</span>
                    {isAnswerSubmitted && selectedAnswer === 2 && (
                      <i className="fas fa-check text-green-500 ml-auto"></i>
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => !isAnswerSubmitted && setSelectedAnswer(3)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAnswer === 3 
                      ? isAnswerSubmitted 
                        ? 'bg-red-900/30 border-red-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 3 
                        ? isAnswerSubmitted 
                          ? 'border-red-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 3 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Reinforcement Learning</span>
                    {isAnswerSubmitted && selectedAnswer === 3 && (
                      <i className="fas fa-times text-red-500 ml-auto"></i>
                    )}
                  </div>
                </div>
              </div>
              
              {isAnswerSubmitted && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <p className="font-semibold text-green-400 mb-2">Correct Answer: Prescriptive Learning</p>
                  <p className="text-sm text-gray-300">
                    The three main types of machine learning are Supervised Learning, Unsupervised Learning, and Reinforcement Learning. 
                    Prescriptive Learning is not a standard type of machine learning.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className={`px-4 py-2 rounded-lg !rounded-button whitespace-nowrap ${
                    selectedAnswer === null 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setIsAnswerSubmitted(false);
                    setSelectedAnswer(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get section titles
function getSectionTitle(sectionNumber: number): string {
  switch (sectionNumber) {
    case 1:
      return "Introduction to Machine Learning";
    case 2:
      return "Types of Machine Learning Algorithms";
    case 3:
      return "Neural Networks and Deep Learning";
    case 4:
      return "Practical Applications";
    case 5:
      return "Future Trends and Ethics";
    default:
      return "";
  }
}

// Helper function to render content based on section
function renderSectionContent(sectionNumber: number) {
  switch (sectionNumber) {
    case 1:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*ikEB53J-pPJCXy1Ub1XUsQ.jpeg"
              alt="Machine Learning Introduction"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">What is Machine Learning?</h3>
              <p className="text-gray-300 mb-4">
                Machine Learning (ML) is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The primary aim is to allow computers to learn automatically without human intervention and adjust actions accordingly.
              </p>
              <p className="text-gray-300 mb-4">
                At its core, machine learning involves algorithms that parse data, learn from that data, and then apply what they've learned to make informed decisions. For instance, when you shop online, ML algorithms use your browsing history to recommend items you might want to purchase.
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-indigo-400 mb-2">Key Concepts</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Machine learning algorithms build a model based on sample data, known as "training data".</li>
                  <li>The goal is to make predictions or decisions without being explicitly programmed to perform the task.</li>
                  <li>ML systems improve their performance with more data over time.</li>
                  <li>The quality and size of the training dataset significantly impact the model's performance.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-900/50 p-3 rounded-full mr-3">
                  <i className="fas fa-history text-indigo-400"></i>
                </div>
                <h3 className="text-lg font-semibold">Historical Context</h3>
              </div>
              <p className="text-gray-300">
                The term "Machine Learning" was coined by Arthur Samuel in 1959 while at IBM. The field has evolved significantly since then, with major breakthroughs occurring in the 1990s and 2000s. The explosion of data availability and computing power in recent years has accelerated advancements in machine learning techniques and applications.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-900/50 p-3 rounded-full mr-3">
                  <i className="fas fa-cogs text-purple-400"></i>
                </div>
                <h3 className="text-lg font-semibold">How ML Works</h3>
              </div>
              <p className="text-gray-300">
                Machine learning systems work by extracting patterns from large datasets. These patterns are then used to identify similar patterns in new data or to make predictions. The process typically involves data collection, data preparation, model selection, training, evaluation, and deployment. The model improves as it processes more data.
              </p>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-lightbulb text-yellow-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Did You Know?</h3>
                <p className="text-gray-300">
                  Machine learning is already a part of your daily life! From the recommendations you see on streaming platforms and social media, to spam filters in your email, to voice assistants like Siri and Yashasvia – all these technologies use machine learning algorithms to function and improve over time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Real-World Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-heartbeat text-blue-400"></i>
                  </div>
                  <h4 className="font-semibold">Healthcare</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Disease identification, personalized treatment, medical imaging analysis, and drug discovery.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-green-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-chart-line text-green-400"></i>
                  </div>
                  <h4 className="font-semibold">Finance</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Fraud detection, algorithmic trading, risk assessment, and customer service automation.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-shopping-cart text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Retail</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Personalized recommendations, inventory management, price optimization, and customer insights.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                // This would typically be implemented with state management
                const quizModal = document.getElementById('quiz-modal');
                if (quizModal) quizModal.classList.remove('hidden');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-question-circle mr-2"></i>
              Take Knowledge Check
            </button>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://www.ejable.com/wp-content/uploads/2023/11/three-types-of-machine-learning-2.webp"
              alt="Types of Machine Learning Algorithms"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Types of Machine Learning Algorithms</h3>
              <p className="text-gray-300 mb-4">
                Machine learning algorithms are typically classified into three main categories based on their learning approach and the type of data they work with. Each type serves different purposes and is suitable for specific kinds of problems.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">Supervised Learning</h3>
                <p className="text-gray-300 mb-4">
                  In supervised learning, algorithms learn from labeled training data, and make predictions based on that data. The algorithm receives a set of inputs along with the corresponding correct outputs, and learns by comparing its actual output with the correct outputs to find errors.
                </p>
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Common Algorithms</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Linear Regression</li>
                    <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Logistic Regression</li>
                    <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Decision Trees</li>
                    <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Random Forest</li>
                    <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Support Vector Machines</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Use Cases</h4>
                  <p className="text-sm text-gray-300">
                    Spam detection, sentiment analysis, price prediction, image classification, and medical diagnosis.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">Unsupervised Learning</h3>
                <p className="text-gray-300 mb-4">
                  Unsupervised learning algorithms work with unlabeled data. These algorithms discover hidden patterns or intrinsic structures in the input data. The goal is to model the underlying structure or distribution in the data to learn more about it.
                </p>
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-400 mb-2">Common Algorithms</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>K-means Clustering</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Hierarchical Clustering</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Principal Component Analysis</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Association Rules</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Autoencoders</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Use Cases</h4>
                  <p className="text-sm text-gray-300">
                    Customer segmentation, anomaly detection, feature extraction, recommendation systems, and pattern recognition.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="h-3 bg-purple-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">Reinforcement Learning</h3>
                <p className="text-gray-300 mb-4">
                  Reinforcement learning is about taking suitable actions to maximize reward in a particular situation. The algorithm learns by interacting with its environment and receiving rewards or penalties for its actions. Over time, it learns the best strategy, called a policy, to earn the most reward.
                </p>
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Common Algorithms</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Q-Learning</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Deep Q Network (DQN)</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Policy Gradient Methods</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Actor-Critic Methods</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Monte Carlo Tree Search</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Use Cases</h4>
                  <p className="text-sm text-gray-300">
                    Game playing, robotics, autonomous vehicles, resource management, and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Choosing the Right Algorithm</h3>
            <p className="text-gray-300 mb-6">
              Selecting the appropriate machine learning algorithm depends on several factors including the size and type of data, the insights you want to derive, and the specific problem you're trying to solve. Here's a simplified decision framework:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      If you want to...
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      And your data is...
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      Consider using...
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Predict a category
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Labeled
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Classification algorithms (Decision Trees, Random Forest, SVM)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Predict a value
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Labeled
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Regression algorithms (Linear Regression, Random Forest, Neural Networks)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Discover patterns
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Unlabeled
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Clustering algorithms (K-means, Hierarchical Clustering)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Reduce dimensionality
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      High-dimensional
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Dimensionality reduction (PCA, t-SNE)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Learn through interaction
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Environment feedback
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Reinforcement Learning (Q-learning, Policy Gradient)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-code text-indigo-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Code Example: Simple Classification</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-300 text-sm">
                    <code>
{`# Import libraries
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    features, labels, test_size=0.2, random_state=42
)

# Create and train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate model
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy:.2f}")`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://digitalaptech.com/wp-content/uploads/2023/07/Deep-Learning-and-Neural-Networks-a-detailed-analysis-Banner.png"
              alt="Neural Networks and Deep Learning"
              className="w-full h-64 object-cover object-centre"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Neural Networks and Deep Learning</h3>
              <p className="text-gray-300 mb-4">
                Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. They are the foundation of deep learning, a subset of machine learning where algorithms are structured in layers to create an "artificial neural network" that can learn and make decisions.
              </p>
              <p className="text-gray-300">
                Deep learning has revolutionized many fields including computer vision, natural language processing, and speech recognition. The "deep" in deep learning refers to the number of layers through which the data is transformed.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Anatomy of a Neural Network</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-400 mb-3">Input Layer</h4>
                <p className="text-sm text-gray-300">
                  The input layer receives the initial data. Each neuron in this layer represents a feature in your dataset. For example, in an image recognition task, each pixel might be an input neuron.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-400 mb-3">Hidden Layers</h4>
                <p className="text-sm text-gray-300">
                  Hidden layers perform computations and transfer information from the input layer to the output layer. Deep neural networks have multiple hidden layers, allowing them to learn complex patterns in the data.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-400 mb-3">Output Layer</h4>
                <p className="text-sm text-gray-300">
                  The output layer produces the final result. The number of neurons in this layer depends on the type of task. For binary classification, there might be just one output neuron, while for multi-class classification, there could be multiple neurons.
                </p>
              </div>
            </div>
            
            <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">How Information Flows</h4>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-indigo-900 text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong>Forward Propagation:</strong> Data enters through the input layer, is processed through the hidden layers, and produces an output.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-900 text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong>Error Calculation:</strong> The output is compared to the expected result, and the error is calculated.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-900 text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong>Backpropagation:</strong> The error is propagated back through the network, and the weights are adjusted to minimize the error.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-900 text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span><strong>Iteration:</strong> This process is repeated many times with different data samples until the network learns to make accurate predictions.</span>
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Activation Functions</h4>
                <p className="text-gray-300 mb-3">
                  Activation functions determine the output of a neural network node given a set of inputs. They introduce non-linearity into the network, allowing it to learn complex patterns.
                </p>
                <div className="bg-gray-700 rounded-lg p-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><strong className="text-indigo-400">ReLU (Rectified Linear Unit):</strong> Returns 0 for negative inputs and the input value for positive inputs.</li>
                    <li><strong className="text-indigo-400">Sigmoid:</strong> Maps inputs to values between 0 and 1, useful for binary classification.</li>
                    <li><strong className="text-indigo-400">Tanh:</strong> Maps inputs to values between -1 and 1, similar to sigmoid but zero-centered.</li>
                    <li><strong className="text-indigo-400">Softmax:</strong> Used in the output layer for multi-class classification, converts outputs to probabilities.</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3">Loss Functions</h4>
                <p className="text-gray-300 mb-3">
                  Loss functions measure how well the neural network performs on the training data. The goal during training is to minimize this loss.
                </p>
                <div className="bg-gray-700 rounded-lg p-4">
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><strong className="text-indigo-400">Mean Squared Error (MSE):</strong> Common for regression problems, measures the average squared difference between predictions and actual values.</li>
                    <li><strong className="text-indigo-400">Binary Cross-Entropy:</strong> Used for binary classification problems.</li>
                    <li><strong className="text-indigo-400">Categorical Cross-Entropy:</strong> Used for multi-class classification problems.</li>
                    <li><strong className="text-indigo-400">Hinge Loss:</strong> Used for maximum-margin classification, commonly with Support Vector Machines.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Types of Neural Networks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-network-wired text-blue-400"></i>
                  </div>
                  <h4 className="font-semibold">Feedforward Neural Networks (FNN)</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  The simplest type of neural network where information moves in one direction from input to output. There are no cycles or loops in the network.
                </p>
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">Use cases:</strong> Simple classification and regression tasks, pattern recognition.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-brain text-purple-400"></i>
                  </div>
                  <h4 className="font-semibold">Convolutional Neural Networks (CNN)</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Specialized for processing grid-like data such as images. CNNs use convolutional layers to automatically and adaptively learn spatial hierarchies of features.
                </p>
                <p className="text-sm text-gray-300">
                  <strong className="text-purple-400">Use cases:</strong> Image recognition, video analysis, computer vision tasks.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-green-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-history text-green-400"></i>
                  </div>
                  <h4 className="font-semibold">Recurrent Neural Networks (RNN)</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Designed for sequential data by maintaining a memory of previous inputs. RNNs have connections that form directed cycles, allowing the network to maintain an internal state.
                </p>
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">Use cases:</strong> Natural language processing, time series prediction, speech recognition.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-memory text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Long Short-Term Memory (LSTM)</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  A special kind of RNN capable of learning long-term dependencies. LSTMs have a more complex internal structure with gates that regulate the flow of information.
                </p>
                <p className="text-sm text-gray-300">
                  <strong className="text-red-400">Use cases:</strong> Speech recognition, machine translation, complex sequence prediction.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-code text-indigo-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Code Example: Simple Neural Network with TensorFlow</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-300 text-sm">
                    <code>
{`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Create a simple neural network
model = Sequential([
    Dense(64, activation='relu', input_shape=(input_dim,)),
    Dense(32, activation='relu'),
    Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=32,
    validation_data=(X_val, y_val)
)

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f'Test accuracy: {test_acc:.3f}')`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://www.ceo-review.com/wp-content/uploads/2021/10/Machine-Learning.jpg"
              alt="Practical Applications of Machine Learning"
              className="w-full h-64 object-cover object-centre"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Practical Applications of Machine Learning</h3>
              <p className="text-gray-300 mb-4">
                Machine learning has transformed from an academic pursuit to a technology with widespread practical applications across industries. Organizations are leveraging ML to gain insights, automate processes, and create innovative products and services.
              </p>
              <p className="text-gray-300">
                In this section, we'll explore real-world applications of machine learning across different sectors and examine case studies that demonstrate its impact.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-blue-900/30 p-6">
                <div className="flex items-center">
                  <div className="bg-blue-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-heartbeat text-blue-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Healthcare</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Machine learning is revolutionizing healthcare by improving diagnostics, treatment plans, and patient care. From predictive analytics to medical imaging analysis, ML is enhancing medical decision-making and outcomes.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Disease Diagnosis</h4>
                    <p className="text-sm text-gray-300">
                      ML algorithms can analyze medical images like X-rays, MRIs, and CT scans to detect anomalies and assist in early diagnosis of conditions like cancer, diabetic retinopathy, and neurological disorders.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Personalized Treatment</h4>
                    <p className="text-sm text-gray-300">
                      By analyzing patient data, genetic information, and treatment outcomes, ML can help doctors develop personalized treatment plans that are more effective for individual patients.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Drug Discovery</h4>
                    <p className="text-sm text-gray-300">
                      ML accelerates the drug discovery process by predicting how different chemical compounds will behave and identifying potential drug candidates for further testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-green-900/30 p-6">
                <div className="flex items-center">
                  <div className="bg-green-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-chart-line text-green-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Finance</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  The financial sector has embraced machine learning for risk assessment, fraud detection, algorithmic trading, and customer service. ML helps financial institutions make data-driven decisions and enhance security.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Fraud Detection</h4>
                    <p className="text-sm text-gray-300">
                      ML algorithms can analyze transaction patterns to identify suspicious activities and potential fraud in real-time, protecting both institutions and customers.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Algorithmic Trading</h4>
                    <p className="text-sm text-gray-300">
                      ML models analyze market data, news, and social media to make trading decisions at speeds and volumes impossible for human traders, optimizing investment strategies.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Credit Scoring</h4>
                    <p className="text-sm text-gray-300">
                      ML improves credit risk assessment by analyzing traditional and alternative data sources to evaluate borrowers' creditworthiness more accurately than conventional methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-purple-900/30 p-6">
                <div className="flex items-center">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-shopping-cart text-purple-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Retail</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Machine learning is transforming retail by personalizing customer experiences, optimizing inventory, and streamlining operations. Retailers use ML to understand customer preferences and behavior.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Recommendation Systems</h4>
                    <p className="text-sm text-gray-300">
                      ML algorithms analyze customer browsing and purchase history to recommend products they're likely to be interested in, increasing sales and customer satisfaction.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Demand Forecasting</h4>
                    <p className="text-sm text-gray-300">
                      ML models predict future demand by analyzing historical sales data, seasonal trends, and external factors, helping retailers optimize inventory levels and reduce costs.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Price Optimization</h4>
                    <p className="text-sm text-gray-300">
                      ML algorithms determine optimal pricing strategies by analyzing factors like competitor pricing, demand elasticity, and customer behavior to maximize revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-red-900/30 p-6">
                <div className="flex items-center">
                  <div className="bg-red-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-car text-red-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Transportation</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  The transportation industry is leveraging machine learning for autonomous vehicles, route optimization, predictive maintenance, and traffic management, making transportation safer and more efficient.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Autonomous Vehicles</h4>
                    <p className="text-sm text-gray-300">
                      ML enables self-driving cars to perceive their environment, make decisions, and navigate safely by processing data from sensors, cameras, and radar systems.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Predictive Maintenance</h4>
                    <p className="text-sm text-gray-300">
                      ML algorithms analyze sensor data from vehicles and infrastructure to predict when maintenance is needed, preventing breakdowns and reducing downtime.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Traffic Management</h4>
                    <p className="text-sm text-gray-300">
                      ML models analyze traffic patterns and predict congestion, helping authorities optimize traffic signal timing and suggest alternative routes to reduce congestion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Case Study: Netflix Recommendation System</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src="https://readdy.ai/api/search-image?query=netflix%20logo%20and%20streaming%20interface%20with%20recommendation%20system%2C%20personalized%20content%20suggestions%20on%20TV%20screen%2C%20dark%20background%20with%20red%20accents%2C%20professional%20product%20visualization&width=400&height=600&seq=15&orientation=portrait"
                  alt="Netflix Recommendation System"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-300">
                  Netflix uses a sophisticated recommendation system powered by machine learning to suggest content to its users. This system is responsible for about 80% of the content watched on the platform.
                </p>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-400 mb-2">How It Works</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Collects data on viewing habits, search queries, ratings, and even when users pause, rewind, or fast-forward</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Uses collaborative filtering to find users with similar tastes</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Employs content-based filtering to recommend similar content</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Personalizes thumbnails for movies and shows based on user preferences</li>
                  </ul>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-400 mb-2">Business Impact</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Estimated to save Netflix $1 billion per year in customer retention</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Increases user engagement and time spent on the platform</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Helps Netflix determine which original content to produce</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Creates a personalized experience that competitors find difficult to replicate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-lightbulb text-yellow-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Implementation Challenges</h3>
                <p className="text-gray-300 mb-4">
                  While machine learning offers tremendous potential, implementing ML solutions in real-world settings comes with several challenges:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Data Quality and Quantity</h4>
                    <p className="text-sm text-gray-300">
                      ML models require large amounts of high-quality, relevant data. Organizations often struggle with data collection, cleaning, and preparation.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Technical Expertise</h4>
                    <p className="text-sm text-gray-300">
                      Implementing ML solutions requires specialized skills in data science, programming, and domain knowledge, which can be difficult to find and retain.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Integration with Existing Systems</h4>
                    <p className="text-sm text-gray-300">
                      Incorporating ML models into legacy systems and workflows can be complex and may require significant changes to infrastructure.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Ethical and Regulatory Concerns</h4>
                    <p className="text-sm text-gray-300">
                      ML applications must navigate privacy regulations, bias issues, and ethical considerations, especially in sensitive areas like healthcare and finance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://www.techspian.com/wp-content/uploads/2024/09/Major-Trends-Shaping-the-Future-of-Machine-Learning-1024x536.jpg"
              alt="Future Trends and Ethics in Machine Learning"
              className="w-full h-64 object-cover object-centre"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Future Trends and Ethics in Machine Learning</h3>
              <p className="text-gray-300 mb-4">
                As machine learning continues to evolve at a rapid pace, it's important to consider both the exciting future developments and the ethical implications of these powerful technologies. This section explores emerging trends in ML and the ethical considerations that should guide its development and application.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Emerging Trends in Machine Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-robot text-indigo-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Automated Machine Learning (AutoML)</h4>
                </div>
                <p className="text-gray-300 mb-3">
                  AutoML aims to automate the end-to-end process of applying machine learning to real-world problems, making ML more accessible to non-experts. It includes automated data preparation, feature engineering, model selection, and hyperparameter tuning.
                </p>
                <p className="text-gray-300">
                  This democratization of ML will allow more organizations to leverage its benefits without requiring specialized data science teams.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-green-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-microchip text-green-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Edge AI</h4>
                </div>
                <p className="text-gray-300 mb-3">
                  Edge AI involves running ML algorithms locally on a hardware device rather than in the cloud. This enables real-time processing, reduces latency, enhances privacy, and decreases bandwidth usage.
                </p>
                <p className="text-gray-300">
                  Applications include smart home devices, autonomous vehicles, wearable health monitors, and industrial IoT systems that need to make decisions quickly without relying on cloud connectivity.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-brain text-purple-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Federated Learning</h4>
                </div>
                <p className="text-gray-300 mb-3">
                  Federated learning enables multiple devices or servers to collaboratively train a shared ML model while keeping the training data decentralized. Each participant updates the model locally and only shares the model updates, not the raw data.
                </p>
                <p className="text-gray-300">
                  This approach addresses privacy concerns and regulatory requirements by allowing organizations to benefit from collective learning without sharing sensitive data.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-comment-alt text-blue-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Large Language Models</h4>
                </div>
                <p className="text-gray-300 mb-3">
                  Large language models like GPT (Generative Pre-trained Transformer) are transforming natural language processing with their ability to understand context, generate human-like text, and perform a wide range of language tasks.
                </p>
                <p className="text-gray-300">
                  These models are enabling more natural human-computer interaction, automated content creation, and sophisticated language understanding capabilities across industries.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Ethical Considerations in Machine Learning</h3>
            <p className="text-gray-300 mb-6">
              As machine learning becomes more pervasive in society, it's crucial to address the ethical implications of these technologies. Responsible AI development requires careful consideration of several key ethical dimensions:
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-red-900/50 p-3 rounded-full mr-4 mt-1">
                    <i className="fas fa-balance-scale text-red-400"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Bias and Fairness</h4>
                    <p className="text-gray-300 mb-3">
                      ML models can perpetuate or amplify existing biases in the training data, leading to unfair or discriminatory outcomes. This is particularly concerning in high-stakes domains like hiring, lending, criminal justice, and healthcare.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h5 className="font-semibold text-red-400 mb-2">Addressing Bias</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Diverse and representative training data</li>
                        <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Regular auditing of models for bias</li>
                        <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Fairness-aware algorithm design</li>
                        <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Diverse development teams</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-900/50 p-3 rounded-full mr-4 mt-1">
                    <i className="fas fa-user-shield text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Privacy and Data Protection</h4>
                    <p className="text-gray-300 mb-3">
                      ML systems often require large amounts of data, which raises concerns about privacy, data ownership, and consent. The ability of ML to identify patterns and make inferences can potentially reveal sensitive information about individuals.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-400 mb-2">Privacy-Preserving Techniques</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Differential privacy</li>
                        <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Federated learning</li>
                        <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Homomorphic encryption</li>
                        <li><i className="fas fa-angle-right text-blue-400 mr-2"></i>Data minimization principles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-green-900/50 p-3 rounded-full mr-4 mt-1">
                    <i className="fas fa-search text-green-400"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Transparency and Explainability</h4>
                    <p className="text-gray-300 mb-3">
                      Many advanced ML models, particularly deep learning systems, function as "black boxes" where it's difficult to understand how they arrive at specific decisions. This lack of transparency can be problematic in contexts where explanations are legally required or ethically important.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h5 className="font-semibold text-green-400 mb-2">Approaches to Explainability</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Explainable AI (XAI) techniques</li>
                        <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Local Interpretable Model-agnostic Explanations (LIME)</li>
                        <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Feature importance analysis</li>
                        <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Model documentation and transparency reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-4 mt-1">
                    <i className="fas fa-exclamation-triangle text-purple-400"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Accountability and Governance</h4>
                    <p className="text-gray-300 mb-3">
                      As ML systems make more consequential decisions, questions arise about who is responsible when things go wrong. Clear accountability frameworks and governance structures are needed to ensure responsible development and deployment.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-400 mb-2">Governance Mechanisms</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Ethical review boards</li>
                        <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Algorithmic impact assessments</li>
                        <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Regular auditing and monitoring</li>
                        <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Clear policies for human oversight</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-lightbulb text-yellow-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Responsible AI Development Framework</h3>
                <p className="text-gray-300 mb-4">
                  Developing and deploying ML systems responsibly requires a comprehensive approach that addresses ethical considerations throughout the entire lifecycle:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Design Phase</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>Define clear ethical guidelines</li>
                      <li>Conduct stakeholder analysis</li>
                      <li>Perform risk assessment</li>
                      <li>Establish success metrics that include ethical dimensions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Development Phase</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>Ensure diverse and representative data</li>
                      <li>Test for bias and fairness</li>
                      <li>Implement privacy-preserving techniques</li>
                      <li>Document model decisions and limitations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Deployment Phase</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>Establish monitoring systems</li>
                      <li>Create feedback mechanisms</li>
                      <li>Implement human oversight</li>
                      <li>Develop incident response plans</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Conclusion: Balancing Innovation and Responsibility</h3>
            <p className="text-gray-300 mb-4">
              Machine learning has the potential to transform industries and improve lives in countless ways. However, realizing this potential requires a balanced approach that embraces innovation while taking ethical considerations seriously.
            </p>
            <p className="text-gray-300 mb-4">
              As practitioners and users of machine learning, we have a responsibility to develop and deploy these technologies in ways that are fair, transparent, privacy-preserving, and accountable. By integrating ethical considerations into every stage of the ML lifecycle, we can build systems that not only perform well technically but also contribute positively to society.
            </p>
            <p className="text-gray-300">
              The future of machine learning is not just about what's technically possible, but about making thoughtful choices regarding how we develop and apply these powerful tools. By doing so, we can ensure that machine learning serves humanity's best interests and helps create a more equitable and prosperous future for all.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                // This would typically be implemented with state management
                const quizModal = document.getElementById('quiz-modal');
                if (quizModal) quizModal.classList.remove('hidden');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-question-circle mr-2"></i>
              Take Final Assessment
            </button>
          </div>
        </div>
      );
    default:
      return <div>Section not found</div>;
  }
}

export default App;

