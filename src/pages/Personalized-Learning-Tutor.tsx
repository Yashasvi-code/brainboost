// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import * as echarts from "echarts";
const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  // Initialize charts after component mounts
  React.useEffect(() => {
    const progressChart = echarts.init(
      document.getElementById("progress-chart")
    );
    const quizScoreChart = echarts.init(
      document.getElementById("quiz-score-chart")
    );
    // Progress chart options
    const progressOption = {
      animation: false,
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Learning Progress",
          type: "pie",
          radius: ["60%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#121212",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 65, name: "Completed", itemStyle: { color: "#6366F1" } },
            { value: 35, name: "Remaining", itemStyle: { color: "#1F2937" } },
          ],
        },
      ],
    };
    // Quiz score chart options
    const quizScoreOption = {
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
        max: 100,
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
          data: [75, 82, 90, 68, 95, 88, 78],
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: "#6366F1",
            width: 3,
          },
          itemStyle: {
            color: "#6366F1",
          },
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    };
    // Render charts
    progressChart.setOption(progressOption);
    quizScoreChart.setOption(quizScoreOption);
    // Handle resize
    const handleResize = () => {
      progressChart.resize();
      quizScoreChart.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      progressChart.dispose();
      quizScoreChart.dispose();
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
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
                    href="/"
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                  >
                    <i className="fas fa-home w-6"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
      </div>
      <div className="flex">
        {/* Desktop Sidebar */}
        {/* <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
          <div className="p-4 flex items-center">
            
            <h1 className="ml-2 text-xl font-bold text-indigo-400">
              BrainBoost
            </h1>
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              
              <div className="ml-3">
                <p className="text-sm font-medium">Yashasvi Tiwari</p>
                <p className="text-xs text-gray-400">Level 7 Learner</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a
              href=""
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
            >
              <i className="fas fa-home w-6"></i>
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer"
            >
              <i className="fas fa-chart-line w-6"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
            >
              <i className="fas fa-book w-6"></i>
              <span>Lessons</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
            >
              <i className="fas fa-question-circle w-6"></i>
              <span>Quizzes</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
            >
              <i className="fas fa-medal w-6"></i>
              <span>Achievements</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
            >
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
                <div
                  className="bg-indigo-500 h-2.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </aside> */}
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Welcome back, Yashasvi! Continue your learning journey.
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
               
                <span className="hidden md:inline">Yashasvi Tiwari</span>
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
                    onClick={() => setShowSignOutModal(true)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Completed Lessons</h2>
                <div className="p-2 bg-indigo-900/50 text-indigo-400 rounded-lg">
                  <i className="fas fa-book-open text-xl"></i>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold">13</p>
                <p className="ml-2 text-sm text-gray-400">of 20 lessons</p>
              </div>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Average Score</h2>
                <div className="p-2 bg-purple-900/50 text-purple-400 rounded-lg">
                  <i className="fas fa-chart-bar text-xl"></i>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold">82%</p>
                <p className="ml-2 text-sm text-green-400">+5% this week</p>
              </div>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Earned Badges</h2>
                <div className="p-2 bg-blue-900/50 text-blue-400 rounded-lg">
                  <i className="fas fa-medal text-xl"></i>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold">7</p>
                <p className="ml-2 text-sm text-gray-400">of 15 total</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <div className="bg-blue-600/20 p-1.5 rounded-full">
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <div className="bg-blue-600/20 p-1.5 rounded-full">
                  <i className="fas fa-trophy text-yellow-400"></i>
                </div>
                <div className="bg-blue-600/20 p-1.5 rounded-full">
                  <i className="fas fa-award text-yellow-400"></i>
                </div>
                <div className="bg-blue-600/20 p-1.5 rounded-full">
                  <i className="fas fa-certificate text-yellow-400"></i>
                </div>
                <div className="bg-blue-600/20 p-1.5 rounded-full text-gray-600">
                  <i className="fas fa-medal"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Learning Progress</h2>
                <div className="relative">
                  <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                    This Month <i className="fas fa-chevron-down ml-1"></i>
                  </button>
                </div>
              </div>
              <div id="progress-chart" className="h-64 w-full"></div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Time Spent</p>
                  <p className="text-lg font-bold">32.5 hours</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Completion Rate</p>
                  <p className="text-lg font-bold">65%</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Quiz Performance</h2>
                <div className="relative">
                  <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                    Last 7 Days <i className="fas fa-chevron-down ml-1"></i>
                  </button>
                </div>
              </div>
              <div id="quiz-score-chart" className="h-64 w-full"></div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Best Score</p>
                  <p className="text-lg font-bold">95%</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Average Score</p>
                  <p className="text-lg font-bold">82%</p>
                </div>
              </div>
            </div>
          </div>
          {/* Recommended Lessons */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recommended For You</h2>
              <a
                onClick={() => {
                  const modal = document.createElement("div");
                  modal.className =
                    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                  modal.innerHTML = `
<div class="bg-gray-800 rounded-xl p-6 max-w-5xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h3 class="text-xl font-bold">All Recommended Lessons</h3>
<button class="text-gray-400 hover:text-white">
<i class="fas fa-times"></i>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=abstract visualization of machine learning algorithms with neural networks, digital technology concept with blue and purple glowing connections on dark background, futuristic AI representation&width=400&height=200&seq=5&orientation=landscape"
alt="Machine Learning Basics"
class="w-full h-full object-cover object-top"
/>
<div class="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
AI Recommended
</div>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">Advanced</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 45 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">Machine Learning Fundamentals</h3>
<p class="text-sm text-gray-400 mb-4">Learn the core concepts of machine learning algorithms and their applications.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-gray-600 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.2</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=data visualization dashboard with colorful charts and graphs on dark background, business analytics concept, professional data science illustration with glowing elements&width=400&height=200&seq=6&orientation=landscape"
alt="Data Visualization"
class="w-full h-full object-cover object-top"
/>
<div class="absolute top-2 right-2 bg-green-600 text-xs font-semibold px-2 py-1 rounded-full">
New
</div>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-green-900/30 text-green-400 px-2 py-1 rounded-full">Intermediate</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 30 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">Data Visualization Techniques</h3>
<p class="text-sm text-gray-400 mb-4">Master the art of presenting data through effective visualization methods.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.5</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=cybersecurity concept with digital lock and shield protection, network security visualization with glowing blue elements on dark background, high-tech data protection illustration&width=400&height=200&seq=7&orientation=landscape"
alt="Cybersecurity Basics"
class="w-full h-full object-cover object-top"
/>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">Beginner</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 25 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">Cybersecurity Fundamentals</h3>
<p class="text-sm text-gray-400 mb-4">Learn essential practices to protect your digital assets and personal information.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-gray-600 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.0</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/b5719277a42380652b962fe2c90644a5.jpg"
alt="AI Ethics"
class="w-full h-full object-cover object-top"
/>
<div class="absolute top-2 right-2 bg-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">
Popular
</div>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">Advanced</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 40 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">AI Ethics and Responsibility</h3>
<p class="text-sm text-gray-400 mb-4">Explore the ethical considerations and responsible development of AI systems.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.7</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/b0735b90a7414bf1f8f633fcd1ed3af5.jpg"
alt="Cloud Computing"
class="w-full h-full object-cover object-top"
/>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-green-900/30 text-green-400 px-2 py-1 rounded-full">Intermediate</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 35 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">Cloud Computing Essentials</h3>
<p class="text-sm text-gray-400 mb-4">Understand the fundamentals of cloud infrastructure and services.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-gray-600 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.3</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
<div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
<div class="relative h-40 overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/bcf0f52de3efe81e0374415a20306e5c.jpg"
alt="Blockchain Basics"
class="w-full h-full object-cover object-top"
/>
<div class="absolute top-2 right-2 bg-green-600 text-xs font-semibold px-2 py-1 rounded-full">
New
</div>
</div>
<div class="p-4">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-medium bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">Beginner</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 30 min</span>
</div>
<h3 class="text-lg font-semibold mb-2">Blockchain Fundamentals</h3>
<p class="text-sm text-gray-400 mb-4">Discover how blockchain technology works and its potential applications.</p>
<div class="flex justify-between items-center">
<div class="flex items-center">
<div class="flex">
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-yellow-400 text-sm"></i>
<i class="fas fa-star text-gray-600 text-sm"></i>
</div>
<span class="text-xs text-gray-400 ml-1">4.1</span>
</div>
<button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
Start Lesson
</button>
</div>
</div>
</div>
</div>
</div>
`;
                  document.body.appendChild(modal);
                  // Add event listeners to close the modal
                  const closeBtn = modal.querySelector("button");
                  closeBtn.addEventListener("click", () => {
                    document.body.removeChild(modal);
                  });
                  // Close on click outside
                  modal.addEventListener("click", (e) => {
                    if (e.target === modal) {
                      document.body.removeChild(modal);
                    }
                  });
                }}
                className="text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://xiengineering.com/wp-content/uploads/2023/10/AdobeStock_519767884-1-scaled.jpeg"
                    alt="Machine Learning Basics"
                    className="w-full h-full object-cover object-centre"
                  />
                  <div className="absolute top-2 right-2 bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
                    AI Recommended
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                      Advanced
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="far fa-clock mr-1"></i> 45 min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Machine Learning Fundamentals
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Learn the core concepts of machine learning algorithms and
                    their applications.
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
                    <button
                      onClick={() => {
                        const modal = document.createElement("div");
                        modal.className =
                          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                        modal.innerHTML = `
<div class="bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 shadow-2xl">
<div class="flex justify-between items-center mb-4">
<h3 class="text-xl font-bold">Machine Learning Fundamentals</h3>
<button class="text-gray-400 hover:text-white">
<i class="fas fa-times"></i>
</button>
</div>
<div class="mb-4">
<span class="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full mr-2">Advanced</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 45 min</span>
</div>
<p class="text-gray-300 mb-4">Learn the core concepts of machine learning algorithms and their applications. This comprehensive lesson covers supervised and unsupervised learning, neural networks, and practical implementation examples.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">Topics Covered</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-check text-green-400 mr-2"></i>Supervised Learning</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Neural Networks</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Decision Trees</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Practical Applications</li>
</ul>
</div>
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">Prerequisites</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Basic Python Knowledge</li>
<li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Statistics Fundamentals</li>
<li><i class="fas fa-circle text-xs text-indigo-400 mr-2"></i>Data Structures</li>
</ul>
</div>
</div>
<div class="flex justify-end space-x-4">
<button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg !rounded-button whitespace-nowrap">
Save for Later
</button>
<a href="/" ">
<a href="/" ">
<a href="/" ">
<button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg !rounded-button whitespace-nowrap">
Begin Lesson
</button>
</a>
</a>
</a>
</div>
</div>
`;
                        document.body.appendChild(modal);
                        // Add event listeners to close the modal
                        const closeBtn = modal.querySelector("button");
                        closeBtn.addEventListener("click", () => {
                          document.body.removeChild(modal);
                        });
                        // Close on click outside
                        modal.addEventListener("click", (e) => {
                          if (e.target === modal) {
                            document.body.removeChild(modal);
                          }
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      Start Lesson
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://www.turnb.com/_next/image?url=https%3A%2F%2Fmanage.turnb.com%2Fuploads%2Fmedia%2Fdata-v672b2c308b950.jpg&w=3840&q=75"
                    alt="Data Visualization"
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
                      <i className="far fa-clock mr-1"></i> 30 min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Data Visualization Techniques
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Master the art of presenting data through effective
                    visualization methods.
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
                    <button
                      onClick={() => {
                        const modal = document.createElement("div");
                        modal.className =
                          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                        modal.innerHTML = `
<div class="bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 shadow-2xl">
<div class="flex justify-between items-center mb-4">
<h3 class="text-xl font-bold">Data Visualization Techniques</h3>
<button class="text-gray-400 hover:text-white">
<i class="fas fa-times"></i>
</button>
</div>
<div class="mb-4">
<span class="text-xs font-medium bg-green-900/30 text-green-400 px-2 py-1 rounded-full mr-2">Intermediate</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 30 min</span>
</div>
<p class="text-gray-300 mb-4">Master the art of presenting data through effective visualization methods. Learn how to choose the right charts, create interactive dashboards, and communicate insights clearly through visual storytelling.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">Topics Covered</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-check text-green-400 mr-2"></i>Chart Selection</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Color Theory</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Interactive Dashboards</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Visual Storytelling</li>
</ul>
</div>
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">Tools Used</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-circle text-xs text-green-400 mr-2"></i>Tableau</li>
<li><i class="fas fa-circle text-xs text-green-400 mr-2"></i>D3.js</li>
<li><i class="fas fa-circle text-xs text-green-400 mr-2"></i>Python (Matplotlib/Seaborn)</li>
</ul>
</div>
</div>
<div class="flex justify-end space-x-4">
<button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg !rounded-button whitespace-nowrap">
Save for Later
</button>
<a href="/" >
<a href="/" >
<a href="/" >
<button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg !rounded-button whitespace-nowrap">
Begin Lesson
</button>
</a>
</a>
</a>
</div>
</div>
`;
                        document.body.appendChild(modal);
                        // Add event listeners to close the modal
                        const closeBtn = modal.querySelector("button");
                        closeBtn.addEventListener("click", () => {
                          document.body.removeChild(modal);
                        });
                        // Close on click outside
                        modal.addEventListener("click", (e) => {
                          if (e.target === modal) {
                            document.body.removeChild(modal);
                          }
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      Start Lesson
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-homzR8zv3W7Hn3N8fQYdVsA6ZchbH1MJA&s"
                    alt="Cybersecurity Basics"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full">
                      Beginner
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="far fa-clock mr-1"></i> 25 min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Cybersecurity Fundamentals
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Learn essential practices to protect your digital assets and
                    personal information.
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
                      <span className="text-xs text-gray-400 ml-1">4.0</span>
                    </div>
                    <button
                      onClick={() => {
                        const modal = document.createElement("div");
                        modal.className =
                          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                        modal.innerHTML = `
<div class="bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 shadow-2xl">
<div class="flex justify-between items-center mb-4">
<h3 class="text-xl font-bold">Cybersecurity Fundamentals</h3>
<button class="text-gray-400 hover:text-white">
<i class="fas fa-times"></i>
</button>
</div>
<div class="mb-4">
<span class="text-xs font-medium bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full mr-2">Beginner</span>
<span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> 25 min</span>
</div>
<p class="text-gray-300 mb-4">Learn essential practices to protect your digital assets and personal information. This introductory course covers the basics of cybersecurity threats, prevention methods, and best practices for maintaining digital safety.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">Topics Covered</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-check text-green-400 mr-2"></i>Common Cyber Threats</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Password Security</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Safe Browsing Practices</li>
<li><i class="fas fa-check text-green-400 mr-2"></i>Data Protection</li>
</ul>
</div>
<div class="bg-gray-700/50 p-3 rounded-lg">
<p class="text-sm text-gray-400">What You'll Learn</p>
<ul class="text-sm mt-2 space-y-1">
<li><i class="fas fa-circle text-xs text-purple-400 mr-2"></i>Identify security threats</li>
<li><i class="fas fa-circle text-xs text-purple-400 mr-2"></i>Create strong passwords</li>
<li><i class="fas fa-circle text-xs text-purple-400 mr-2"></i>Protect personal information</li>
<li><i class="fas fa-circle text-xs text-purple-400 mr-2"></i>Recognize phishing attempts</li>
</ul>
</div>
</div>
<div class="flex justify-end space-x-4">
<button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg !rounded-button whitespace-nowrap">
Save for Later
</button>
<a href="/" ">
<a href="/" ">
<a href="/" ">
<button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg !rounded-button whitespace-nowrap">
Begin Lesson
</button>
</a>
</a>
</a>
</div>
</div>
`;
                        document.body.appendChild(modal);
                        // Add event listeners to close the modal
                        const closeBtn = modal.querySelector("button");
                        closeBtn.addEventListener("click", () => {
                          document.body.removeChild(modal);
                        });
                        // Close on click outside
                        modal.addEventListener("click", (e) => {
                          if (e.target === modal) {
                            document.body.removeChild(modal);
                          }
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      Start Lesson
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <button
                onClick={() => {
                  const modal = document.createElement("div");
                  modal.className =
                    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                  modal.innerHTML = `
<div class="bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h3 class="text-xl font-bold">All Activity</h3>
<button class="text-gray-400 hover:text-white">
<i class="fas fa-times"></i>
</button>
</div>
<div class="space-y-4">
<div class="flex items-start">
<div class="bg-green-600/20 p-2 rounded-full mr-4">
<i class="fas fa-check text-green-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Completed "Data Structures" Quiz</h3>
<span class="text-xs text-gray-400">2 hours ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">You scored 92% - Great job!</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-blue-600/20 p-2 rounded-full mr-4">
<i class="fas fa-play text-blue-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Started "Machine Learning Fundamentals"</h3>
<span class="text-xs text-gray-400">Yesterday</span>
</div>
<p class="text-sm text-gray-400 mt-1">Lesson 1 of 5 completed</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-yellow-600/20 p-2 rounded-full mr-4">
<i class="fas fa-medal text-yellow-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Earned "Fast Learner" Badge</h3>
<span class="text-xs text-gray-400">2 days ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">Completed 5 lessons in a single day</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-purple-600/20 p-2 rounded-full mr-4">
<i class="fas fa-book text-purple-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Completed "Python Basics" Course</h3>
<span class="text-xs text-gray-400">3 days ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">All 8 lessons completed with an average score of 88%</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-red-600/20 p-2 rounded-full mr-4">
<i class="fas fa-times text-red-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Failed "Advanced Algorithms" Quiz</h3>
<span class="text-xs text-gray-400">4 days ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">You scored 45% - Review recommended</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-indigo-600/20 p-2 rounded-full mr-4">
<i class="fas fa-comment text-indigo-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Commented on "Data Visualization" Forum</h3>
<span class="text-xs text-gray-400">5 days ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">Your comment received 5 likes</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-green-600/20 p-2 rounded-full mr-4">
<i class="fas fa-check text-green-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Completed "Web Development Basics" Quiz</h3>
<span class="text-xs text-gray-400">1 week ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">You scored 85% - Good job!</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-blue-600/20 p-2 rounded-full mr-4">
<i class="fas fa-play text-blue-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Started "Cybersecurity Fundamentals"</h3>
<span class="text-xs text-gray-400">1 week ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">Lesson 2 of 4 completed</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-yellow-600/20 p-2 rounded-full mr-4">
<i class="fas fa-medal text-yellow-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Earned "Consistent Learner" Badge</h3>
<span class="text-xs text-gray-400">2 weeks ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">Logged in for 10 consecutive days</p>
</div>
</div>
<div class="flex items-start">
<div class="bg-purple-600/20 p-2 rounded-full mr-4">
<i class="fas fa-book text-purple-400"></i>
</div>
<div class="flex-1">
<div class="flex justify-between items-center">
<h3 class="font-medium">Completed "JavaScript Fundamentals" Course</h3>
<span class="text-xs text-gray-400">2 weeks ago</span>
</div>
<p class="text-sm text-gray-400 mt-1">All 6 lessons completed with an average score of 91%</p>
</div>
</div>
</div>
</div>
`;
                  document.body.appendChild(modal);
                  // Add event listeners to close the modal
                  const closeBtn = modal.querySelector("button");
                  closeBtn.addEventListener("click", () => {
                    document.body.removeChild(modal);
                  });
                  // Close on click outside
                  modal.addEventListener("click", (e) => {
                    if (e.target === modal) {
                      document.body.removeChild(modal);
                    }
                  });
                }}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-600/20 p-2 rounded-full mr-4">
                  <i className="fas fa-check text-green-400"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      Completed "Data Structures" Quiz
                    </h3>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    You scored 92% - Great job!
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                  <i className="fas fa-play text-blue-400"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      Started "Machine Learning Fundamentals"
                    </h3>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Lesson 1 of 5 completed
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-600/20 p-2 rounded-full mr-4">
                  <i className="fas fa-medal text-yellow-400"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Earned "Fast Learner" Badge</h3>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Completed 5 lessons in a single day
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600/20 p-2 rounded-full mr-4">
                  <i className="fas fa-book text-purple-400"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      Completed "Python Basics" Course
                    </h3>
                    <span className="text-xs text-gray-400">3 days ago</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    All 8 lessons completed with an average score of 88%
                  </p>
                </div>
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
            <p className="text-gray-300 mb-6">
              Are you sure you want to sign out?
            </p>
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
export default App;
