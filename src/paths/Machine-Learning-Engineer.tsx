// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as echarts from "echarts";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  useEffect(() => {
    // Initialize the progress chart
    const progressChart = echarts.init(
      document.getElementById("progress-chart")
    );
    const progressOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        formatter: "{b}: {c} hours",
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Current",
        ],
        axisLine: {
          lineStyle: {
            color: "#6B7280",
          },
        },
        axisLabel: {
          color: "#9CA3AF",
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
        name: "Hours",
        nameTextStyle: {
          color: "#9CA3AF",
        },
        min: 0,
        max: 10,
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
          data: [3, 5, 2, 7, 4, 6, 3],
          type: "line",
          smooth: true,
          lineStyle: {
            color: "#6366F1",
            width: 3,
          },
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#6366F1",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(99, 102, 241, 0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(99, 102, 241, 0.05)",
                },
              ],
            },
          },
        },
      ],
    };
    progressChart.setOption(progressOption);
    // Handle resize
    const handleResize = () => {
      progressChart.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      progressChart.dispose();
    };
  }, []);
  const toggleModule = (moduleIndex: number) => {
    if (expandedModules.includes(moduleIndex)) {
      setExpandedModules(
        expandedModules.filter((index) => index !== moduleIndex)
      );
    } else {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };
  const modules = [
    {
      title: "Introduction to Machine Learning",
      description: "Fundamentals of ML concepts and mathematics",
      lessons: 5,
      completed: 5,
      time: "4 hours",
      status: "Completed",
      statusClass: "bg-green-900/30 text-green-400",
      icon: "fas fa-check-circle text-green-400",
      lessons_list: [
        {
          title: "What is Machine Learning?",
          duration: "45 min",
          completed: true,
        },
        {
          title: "Types of Machine Learning",
          duration: "45 min",
          completed: true,
        },
        {
          title: "Mathematics for ML: Linear Algebra",
          duration: "60 min",
          completed: true,
        },
        {
          title: "Mathematics for ML: Statistics",
          duration: "60 min",
          completed: true,
        },
        { title: "Module Assessment", duration: "30 min", completed: true },
      ],
    },
    {
      title: "Python for Machine Learning",
      description: "Essential Python libraries and data manipulation",
      lessons: 8,
      completed: 3,
      time: "7 hours",
      status: "In Progress",
      statusClass: "bg-indigo-900/30 text-indigo-400",
      icon: "fas fa-spinner text-indigo-400",
      lessons_list: [
        { title: "NumPy Fundamentals", duration: "45 min", completed: true },
        {
          title: "Pandas for Data Analysis",
          duration: "60 min",
          completed: true,
        },
        {
          title: "Data Visualization with Matplotlib",
          duration: "45 min",
          completed: true,
        },
        { title: "Scikit-learn Basics", duration: "60 min", completed: false },
        { title: "Data Preprocessing", duration: "45 min", completed: false },
        { title: "Feature Engineering", duration: "45 min", completed: false },
        {
          title: "Working with Datasets",
          duration: "50 min",
          completed: false,
        },
        { title: "Module Assessment", duration: "30 min", completed: false },
      ],
    },
    {
      title: "Supervised Learning",
      description: "Classification and regression algorithms",
      lessons: 7,
      completed: 0,
      time: "8 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Linear Regression", duration: "70 min", completed: false },
        { title: "Logistic Regression", duration: "60 min", completed: false },
        { title: "Decision Trees", duration: "60 min", completed: false },
        { title: "Random Forests", duration: "60 min", completed: false },
        {
          title: "Support Vector Machines",
          duration: "60 min",
          completed: false,
        },
        { title: "Model Evaluation", duration: "50 min", completed: false },
        { title: "Module Assessment", duration: "40 min", completed: false },
      ],
    },
    {
      title: "Deep Learning Fundamentals",
      description: "Neural networks and deep learning concepts",
      lessons: 8,
      completed: 0,
      time: "10 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        {
          title: "Neural Network Basics",
          duration: "75 min",
          completed: false,
        },
        { title: "Activation Functions", duration: "60 min", completed: false },
        { title: "Backpropagation", duration: "75 min", completed: false },
        {
          title: "Optimizers and Loss Functions",
          duration: "60 min",
          completed: false,
        },
        {
          title: "Convolutional Neural Networks",
          duration: "90 min",
          completed: false,
        },
        {
          title: "Recurrent Neural Networks",
          duration: "90 min",
          completed: false,
        },
        { title: "Transfer Learning", duration: "60 min", completed: false },
        { title: "Module Assessment", duration: "50 min", completed: false },
      ],
    },
    {
      title: "Unsupervised Learning",
      description: "Clustering and dimensionality reduction",
      lessons: 6,
      completed: 0,
      time: "6 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "K-Means Clustering", duration: "60 min", completed: false },
        {
          title: "Hierarchical Clustering",
          duration: "60 min",
          completed: false,
        },
        {
          title: "Principal Component Analysis",
          duration: "60 min",
          completed: false,
        },
        { title: "t-SNE", duration: "45 min", completed: false },
        { title: "Anomaly Detection", duration: "45 min", completed: false },
        { title: "Module Assessment", duration: "30 min", completed: false },
      ],
    },
    {
      title: "MLOps and Deployment",
      description: "Model deployment and maintenance",
      lessons: 5,
      completed: 0,
      time: "5 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        { title: "Model Versioning", duration: "45 min", completed: false },
        { title: "Model Serving", duration: "60 min", completed: false },
        { title: "Model Monitoring", duration: "60 min", completed: false },
        {
          title: "Cloud Deployment (AWS/Azure/GCP)",
          duration: "75 min",
          completed: false,
        },
        { title: "Module Assessment", duration: "30 min", completed: false },
      ],
    },
    {
      title: "Capstone ML Project",
      description: "End-to-end machine learning project",
      lessons: 4,
      completed: 0,
      time: "12 hours",
      status: "Not Started",
      statusClass: "bg-gray-700/50 text-gray-400",
      icon: "fas fa-lock text-gray-400",
      lessons_list: [
        {
          title: "Problem Definition and Data Collection",
          duration: "120 min",
          completed: false,
        },
        {
          title: "Data Preprocessing and Feature Engineering",
          duration: "180 min",
          completed: false,
        },
        {
          title: "Model Development and Training",
          duration: "240 min",
          completed: false,
        },
        {
          title: "Model Deployment and Presentation",
          duration: "180 min",
          completed: false,
        },
      ],
    },
  ];
  const milestones = [
    {
      title: "ML Foundations",
      description: "Master ML concepts and mathematics",
      completed: true,
      date: "April 1, 2025",
      icon: "fas fa-brain",
    },
    {
      title: "Python & Libraries",
      description: "Master essential ML libraries",
      completed: false,
      date: "Est. April 15, 2025",
      icon: "fab fa-python",
    },
    {
      title: "Supervised Learning",
      description: "Build predictive models",
      completed: false,
      date: "Est. May 1, 2025",
      icon: "fas fa-chart-line",
    },
    {
      title: "Deep Learning",
      description: "Master neural networks",
      completed: false,
      date: "Est. May 15, 2025",
      icon: "fas fa-network-wired",
    },
    {
      title: "Unsupervised Learning",
      description: "Implement clustering algorithms",
      completed: false,
      date: "Est. May 30, 2025",
      icon: "fas fa-project-diagram",
    },
    {
      title: "ML Project",
      description: "Complete capstone project",
      completed: false,
      date: "Est. June 15, 2025",
      icon: "fas fa-rocket",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
                <button 
          onClick={() => navigate(-1)} // Goes back in history
          className="flex items-center text-indigo-400 hover:text-indigo-300 mr-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
              {/* <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <a
                  href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/d8c0089c-9e3b-49b2-afa4-b1009d086d40"
                  data-readdy="true"
                  className="hover:text-indigo-400 cursor-pointer"
                >
                  Home
                </a>
                <i className="fas fa-chevron-right text-xs"></i>
                <a href="#" className="hover:text-indigo-400 cursor-pointer">
                  Learning Paths
                </a>
                <i className="fas fa-chevron-right text-xs"></i>
                <span className="text-indigo-400">Full-Stack Development</span>
              </div> */}
              <h1 className="text-2xl lg:text-3xl font-bold">
                Machine Learning Engineer
              </h1>
              <p className="text-gray-400 mt-1">
                Build intelligent systems and algorithms through advanced
                machine learning techniques
              </p>
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
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Sign out
                  </a>
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
                        <span className="text-2xl font-bold">20%</span>
                        <span className="text-xs text-gray-400">Completed</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-indigo-900/30 text-indigo-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Current Milestone
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold">
                        Frontend Fundamentals
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Complete 2 more lessons to reach the next milestone
                      </p>
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
                        <p className="text-xs text-gray-400">
                          Lessons completed
                        </p>
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
                <h2 className="text-xl font-bold">
                  Python for Machine Learning
                </h2>
                <p className="text-gray-400 mt-1">
                  Essential Python libraries and data manipulation
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="#"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-play-circle mr-2"></i>
                  Continue Learning
                </a>
              </div>
            </div>
            <div className="bg-gray-800/70 rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold">
                    Last Accessed: Event Handling
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Learn how to handle user interactions with JavaScript events
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-400 mr-4">
                    <i className="far fa-clock mr-1"></i> 40 minutes
                  </div>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  >
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
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-clock text-green-400 mr-2"></i>
                  <span className="font-medium">Time Spent</span>
                </div>
                <p className="text-2xl font-bold">4h 30m</p>
                <p className="text-xs text-gray-400">
                  Out of 6 hours estimated
                </p>
              </div>
              <div className="bg-gray-800/70 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-check text-purple-400 mr-2"></i>
                  <span className="font-medium">Next Up</span>
                </div>
                <p className="font-semibold">Scikit-learn Basics</p>
                <p className="text-xs text-gray-400">
                  Introduction to machine learning with scikit-learn
                </p>
              </div>
            </div>
          </div>
          {/* Curriculum Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Curriculum Overview</h2>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <div
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-750"
                    onClick={() => toggleModule(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-full mr-4 ${
                          module.status === "Completed"
                            ? "bg-green-900/30"
                            : module.status === "In Progress"
                            ? "bg-indigo-900/30"
                            : "bg-gray-700/50"
                        }`}
                      >
                        <i className={module.icon}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-gray-400">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          <i className="fas fa-book mr-1"></i> {module.lessons}{" "}
                          Lessons
                        </div>
                        <div className="text-sm text-gray-400">
                          <i className="far fa-clock mr-1"></i> {module.time}
                        </div>
                        <div
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${module.statusClass}`}
                        >
                          {module.status}
                        </div>
                      </div>
                      <div className="md:hidden flex items-center">
                        <div
                          className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${module.statusClass}`}
                        >
                          {module.status}
                        </div>
                      </div>
                      <i
                        className={`fas ${
                          expandedModules.includes(index)
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        } text-gray-400`}
                      ></i>
                    </div>
                  </div>
                  {expandedModules.includes(index) && (
                    <div className="bg-gray-750 p-4 border-t border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-800/70 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-indigo-400">
                              {Math.round(
                                (module.completed / module.lessons) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-indigo-500 h-2 rounded-full"
                              style={{
                                width: `${Math.round(
                                  (module.completed / module.lessons) * 100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex md:justify-end space-x-4">
                          <div className="text-sm text-gray-400">
                            <i className="fas fa-book mr-1"></i>{" "}
                            {module.completed}/{module.lessons} Completed
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
                              lesson.completed
                                ? "bg-green-900/10 border border-green-800/20"
                                : module.status === "In Progress" &&
                                  lessonIndex === module.completed
                                ? "bg-indigo-900/10 border border-indigo-800/20"
                                : "bg-gray-800/50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                {lesson.completed ? (
                                  <i className="fas fa-check-circle text-green-400"></i>
                                ) : module.status === "In Progress" &&
                                  lessonIndex === module.completed ? (
                                  <i className="fas fa-play-circle text-indigo-400"></i>
                                ) : (
                                  <i className="far fa-circle text-gray-500"></i>
                                )}
                              </div>
                              <span
                                className={`${
                                  lesson.completed
                                    ? "text-gray-300"
                                    : module.status === "In Progress" &&
                                      lessonIndex === module.completed
                                    ? "text-white font-medium"
                                    : "text-gray-400"
                                }`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-3">
                                <i className="far fa-clock mr-1"></i>{" "}
                                {lesson.duration}
                              </span>
                              {lesson.completed ? (
                                <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Completed
                                </button>
                              ) : module.status === "In Progress" &&
                                lessonIndex === module.completed ? (
                                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Continue
                                </button>
                              ) : module.status === "In Progress" ? (
                                <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
                                  Start
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="text-xs bg-gray-700/50 text-gray-500 px-2 py-1 rounded cursor-not-allowed !rounded-button whitespace-nowrap"
                                >
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
                    <div
                      className={`absolute left-8 w-8 h-8 rounded-full flex items-center justify-center -ml-4 z-10 ${
                        milestone.completed ? "bg-green-500" : "bg-gray-700"
                      }`}
                    >
                      <i
                        className={`${milestone.icon} ${
                          milestone.completed ? "text-white" : "text-gray-400"
                        }`}
                      ></i>
                    </div>
                    <div
                      className={`ml-16 p-4 rounded-lg ${
                        milestone.completed
                          ? "bg-green-900/10 border border-green-800/20"
                          : index === 2
                          ? "bg-indigo-900/10 border border-indigo-800/20"
                          : "bg-gray-800"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <p className="text-sm text-gray-400">
                            {milestone.description}
                          </p>
                        </div>
                        <div
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            milestone.completed
                              ? "bg-green-900/30 text-green-400"
                              : index === 2
                              ? "bg-indigo-900/30 text-indigo-400"
                              : "bg-gray-700/50 text-gray-400"
                          }`}
                        >
                          {milestone.completed
                            ? "Completed"
                            : index === 2
                            ? "Current"
                            : "Upcoming"}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <i className="far fa-calendar-alt mr-1"></i>{" "}
                        {milestone.date}
                      </div>
                      {milestone.completed && (
                        <div className="mt-2">
                          <div className="flex items-center">
                            <i className="fas fa-medal text-yellow-500 mr-1"></i>
                            <span className="text-xs text-yellow-400">
                              Achievement Unlocked
                            </span>
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
                  <p className="text-sm text-gray-400 mb-3">
                    Access comprehensive documentation for all technologies
                    covered in this learning path.
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer"
                  >
                    Browse Documentation{" "}
                    <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-code text-green-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Practice Exercises</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Reinforce your learning with hands-on coding exercises and
                    challenges.
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer"
                  >
                    Start Practicing <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-download text-purple-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Project Files</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Download starter files and completed projects for each
                    module.
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer"
                  >
                    View Files <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
                <div className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-users text-yellow-400 mr-3 text-lg"></i>
                    <h3 className="font-medium">Community Forum</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Connect with fellow learners and instructors to get help and
                    share knowledge.
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center cursor-pointer"
                  >
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
                <p className="text-sm text-gray-400 mb-3">
                  Learn how to use Webpack, Babel, and other essential tools for
                  modern frontend development.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    <i className="far fa-clock mr-1"></i> 50 minutes
                  </span>
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
                    <span>
                      Understand the purpose of build tools in modern web
                      development
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>
                      Configure Webpack for bundling JavaScript applications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Set up Babel for JavaScript transpilation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>
                      Implement CSS preprocessing with tools like Sass
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium w-full flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap"
                >
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
    
  );
};
export default App;
