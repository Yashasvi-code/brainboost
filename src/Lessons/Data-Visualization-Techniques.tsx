import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
    const navigate = useNavigate();
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
  const chartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const scatterChartRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update progress when section changes
    setProgress((currentSection / totalSections) * 100);
  }, [currentSection]);

  useEffect(() => {
    // Initialize charts when in section 2
    if (currentSection === 2 && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        title: {
          text: 'Monthly Sales Data',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2023', '2024'],
          textStyle: {
            color: '#ddd'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: {
            color: '#ddd'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#ddd'
          }
        },
        series: [
          {
            name: '2023',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230],
            lineStyle: {
              color: '#5470c6'
            },
            itemStyle: {
              color: '#5470c6'
            }
          },
          {
            name: '2024',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330],
            lineStyle: {
              color: '#91cc75'
            },
            itemStyle: {
              color: '#91cc75'
            }
          }
        ]
      };
      chart.setOption(option);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentSection]);

  useEffect(() => {
    // Initialize bar chart when in section 3
    if (currentSection === 3 && barChartRef.current) {
      const chart = echarts.init(barChartRef.current);
      const option = {
        animation: false,
        title: {
          text: 'Product Sales by Category',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2023', '2024'],
          textStyle: {
            color: '#ddd'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Electronics', 'Clothing', 'Food', 'Books', 'Home'],
          axisLabel: {
            color: '#ddd'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#ddd'
          }
        },
        series: [
          {
            name: '2023',
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
              color: '#5470c6'
            }
          },
          {
            name: '2024',
            type: 'bar',
            data: [420, 382, 391, 434, 490],
            itemStyle: {
              color: '#91cc75'
            }
          }
        ]
      };
      chart.setOption(option);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }

    // Initialize pie chart when in section 3
    if (currentSection === 3 && pieChartRef.current) {
      const chart = echarts.init(pieChartRef.current);
      const option = {
        animation: false,
        title: {
          text: 'Market Share Distribution',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['Company A', 'Company B', 'Company C', 'Company D', 'Others'],
          textStyle: {
            color: '#ddd'
          }
        },
        series: [
          {
            name: 'Market Share',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: 'Company A', itemStyle: { color: '#5470c6' } },
              { value: 310, name: 'Company B', itemStyle: { color: '#91cc75' } },
              { value: 234, name: 'Company C', itemStyle: { color: '#fac858' } },
              { value: 135, name: 'Company D', itemStyle: { color: '#ee6666' } },
              { value: 148, name: 'Others', itemStyle: { color: '#73c0de' } }
            ]
          }
        ]
      };
      chart.setOption(option);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentSection]);

  useEffect(() => {
    // Initialize scatter chart when in section 4
    if (currentSection === 4 && scatterChartRef.current) {
      const chart = echarts.init(scatterChartRef.current);
      const option = {
        animation: false,
        title: {
          text: 'Product Price vs. Customer Rating',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params: any) {
            return `Product: ${params.data[2]}<br/>Price: $${params.data[0]}<br/>Rating: ${params.data[1]}`;
          }
        },
        xAxis: {
          type: 'value',
          name: 'Price ($)',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: {
            color: '#ddd'
          },
          axisLabel: {
            color: '#ddd'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Customer Rating',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: {
            color: '#ddd'
          },
          axisLabel: {
            color: '#ddd'
          }
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 20,
            data: [
              [10.0, 4.2, 'Product A'],
              [15.5, 4.5, 'Product B'],
              [25.0, 3.8, 'Product C'],
              [30.5, 4.1, 'Product D'],
              [45.0, 4.9, 'Product E'],
              [50.5, 3.5, 'Product F'],
              [60.0, 4.7, 'Product G'],
              [70.5, 4.3, 'Product H'],
              [80.0, 3.9, 'Product I'],
              [90.5, 4.8, 'Product J']
            ],
            itemStyle: {
              color: function(params: any) {
                // Color based on rating
                const rating = params.data[1];
                if (rating >= 4.5) return '#91cc75'; // High rating
                if (rating >= 4.0) return '#5470c6'; // Medium rating
                return '#ee6666'; // Low rating
              }
            }
          }
        ]
      };
      chart.setOption(option);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }

    // Initialize heatmap when in section 4
    if (currentSection === 4 && heatmapRef.current) {
      const chart = echarts.init(heatmapRef.current);
      const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
      const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

      const option = {
        animation: false,
        title: {
          text: 'Website Traffic Heatmap',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          position: 'top',
          formatter: function (params: any) {
            return `${days[params.data[1]]}, ${hours[params.data[0]]}: ${params.data[2]} visits`;
          }
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          },
          axisLabel: {
            color: '#ddd'
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          },
          axisLabel: {
            color: '#ddd'
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          textStyle: {
            color: '#ddd'
          },
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        series: [{
          name: 'Website Traffic',
          type: 'heatmap',
          data: data,
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      chart.setOption(option);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
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
      <div className="lg:hidden">
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://readdy.ai/api/search-image?query=modern%20minimalist%20data%20visualization%20logo%20with%20purple%20and%20blue%20gradient%20on%20dark%20background%2C%20professional%20tech%20company%20logo%20design%2C%20clean%20lines%2C%20abstract%20chart%20concept&width=50&height=50&seq=1&orientation=squarish"
              alt="DataViz Logo"
              className="h-10 w-10"
            />
            <h1 className="ml-2 text-xl font-bold text-indigo-400">DataViz</h1>
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
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-gray-800 h-screen sticky top-0">
          <div className="p-4 flex items-center">
            <img
              src="https://readdy.ai/api/search-image?query=modern%20minimalist%20data%20visualization%20logo%20with%20purple%20and%20blue%20gradient%20on%20dark%20background%2C%20professional%20tech%20company%20logo%20design%2C%20clean%20lines%2C%20abstract%20chart%20concept&width=50&height=50&seq=2&orientation=squarish"
              alt="DataViz Logo"
              className="h-10 w-10"
            />
            <h1 className="ml-2 text-xl font-bold text-indigo-400">DataViz</h1>
          </div>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20young%20diverse%20person%20with%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%20soft%20lighting%2C%20professional%20appearance&width=50&height=50&seq=3&orientation=squarish"
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
            <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <i className="fas fa-home w-6"></i>
              <span>Home</span>
            </a>
            <a href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" data-readdy="true" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
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
                  <h1 className="text-xl font-bold">Data Visualization Techniques</h1>
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
                {currentSection === 1 && "Introduction to the fundamentals of data visualization and its importance in modern data analysis."}
                {currentSection === 2 && "Exploring different types of charts and graphs and when to use each for effective data communication."}
                {currentSection === 3 && "Deep dive into advanced visualization techniques and interactive dashboards."}
                {currentSection === 4 && "Best practices for creating clear, effective, and ethical data visualizations."}
                {currentSection === 5 && "Tools and technologies for creating professional data visualizations and future trends."}
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
                  href="https://readdy.ai/home/93431ca8-7bfe-40a5-a2ff-332620bfb63e/a1160d7d-b821-4c64-8105-be967a8aeb9a" 
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
              <h4 className="text-lg font-semibold mb-4">Which chart type is best for showing the composition of a whole?</h4>
              
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
                    <span>Line Chart</span>
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
                        ? 'bg-green-900/30 border-green-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 1 
                        ? isAnswerSubmitted 
                          ? 'border-green-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 1 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Pie Chart</span>
                    {isAnswerSubmitted && selectedAnswer === 1 && (
                      <i className="fas fa-check text-green-500 ml-auto"></i>
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => !isAnswerSubmitted && setSelectedAnswer(2)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedAnswer === 2 
                      ? isAnswerSubmitted 
                        ? 'bg-red-900/30 border-red-500' 
                        : 'bg-indigo-900/30 border-indigo-500' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === 2 
                        ? isAnswerSubmitted 
                          ? 'border-red-500' 
                          : 'border-indigo-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === 2 && (
                        <div className={`w-3 h-3 rounded-full ${isAnswerSubmitted ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                      )}
                    </div>
                    <span>Scatter Plot</span>
                    {isAnswerSubmitted && selectedAnswer === 2 && (
                      <i className="fas fa-times text-red-500 ml-auto"></i>
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
                    <span>Histogram</span>
                    {isAnswerSubmitted && selectedAnswer === 3 && (
                      <i className="fas fa-times text-red-500 ml-auto"></i>
                    )}
                  </div>
                </div>
              </div>
              
              {isAnswerSubmitted && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <p className="font-semibold text-green-400 mb-2">Correct Answer: Pie Chart</p>
                  <p className="text-sm text-gray-300">
                    Pie charts are ideal for showing how different parts make up a whole. They display the proportion of each category as a slice of the pie, making it easy to see the relative sizes of different components.
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
      return "Introduction to Data Visualization";
    case 2:
      return "Types of Charts and Graphs";
    case 3:
      return "Advanced Visualization Techniques";
    case 4:
      return "Data Visualization Best Practices";
    case 5:
      return "Tools and Future Trends";
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
              src="https://readdy.ai/api/search-image?query=abstract%20visualization%20of%20data%20visualization%20concept%20with%20colorful%20charts%2C%20graphs%2C%20and%20dashboards%20floating%20in%20digital%20space%2C%20futuristic%20technology%20representation%20with%20blue%20and%20purple%20glowing%20elements%20on%20dark%20background%2C%20high%20quality%20professional%20illustration&width=1200&height=500&seq=11&orientation=landscape"
              alt="Data Visualization Introduction"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">What is Data Visualization?</h3>
              <p className="text-gray-300 mb-4">
                Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.
              </p>
              <p className="text-gray-300 mb-4">
                In today's data-driven world, visualization has become an essential tool for making sense of the trillions of rows of data that are generated every day. Effective data visualization helps users analyze and reason about data and evidence, making complex data more accessible, understandable, and usable.
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-indigo-400 mb-2">Key Benefits</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Quickly identifies patterns, trends, and outliers in large datasets</li>
                  <li>Makes complex data more accessible and understandable</li>
                  <li>Facilitates communication of insights to diverse audiences</li>
                  <li>Supports data-driven decision making across organizations</li>
                  <li>Enables exploration and discovery of hidden relationships in data</li>
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
                Data visualization has deep historical roots. Early examples include maps and diagrams dating back to the 17th century. In the late 18th century, William Playfair invented several common graphs we still use today, including the line chart, bar chart, and pie chart. Florence Nightingale's rose diagrams in the 1850s and Charles Minard's flow map of Napoleon's Russian campaign (1869) are considered pioneering works in statistical graphics.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-900/50 p-3 rounded-full mr-3">
                  <i className="fas fa-brain text-purple-400"></i>
                </div>
                <h3 className="text-lg font-semibold">The Science Behind Visualization</h3>
              </div>
              <p className="text-gray-300">
                Data visualization leverages the human visual system's ability to process information quickly. Our brains can interpret visual information much faster than text. When data is presented visually, we can identify patterns, trends, and outliers almost instantly. This is because approximately 30% of the brain's cortex is dedicated to visual processing, compared to just 8% for touch and 3% for hearing.
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
                  The human brain processes visual information 60,000 times faster than text. This is why a well-designed data visualization can communicate complex information much more effectively than tables of numbers or lengthy descriptions. Additionally, people remember 80% of what they see, compared to just 20% of what they read and 10% of what they hear.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">The Data Visualization Process</h3>
            <p className="text-gray-300 mb-6">
              Creating effective data visualizations involves a systematic process that transforms raw data into meaningful visual representations:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-database text-blue-400"></i>
                  </div>
                  <h4 className="font-semibold">1. Data Collection & Preparation</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Gather relevant data from various sources, clean it to remove errors and inconsistencies, and structure it in a format suitable for visualization.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-green-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-search text-green-400"></i>
                  </div>
                  <h4 className="font-semibold">2. Data Exploration & Analysis</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Examine the data to understand its characteristics, identify patterns, relationships, and outliers, and determine which aspects are most important to visualize.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-palette text-purple-400"></i>
                  </div>
                  <h4 className="font-semibold">3. Visual Mapping</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Select appropriate visual representations (charts, graphs, maps) based on the data type and the story you want to tell. Map data attributes to visual properties like position, size, color, and shape.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-pencil-alt text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">4. Design & Refinement</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Create the visualization with attention to layout, color schemes, typography, and other design elements. Refine it to enhance clarity and eliminate distractions.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-comment text-yellow-400"></i>
                  </div>
                  <h4 className="font-semibold">5. Interpretation & Storytelling</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Add context, annotations, and explanations to help viewers understand the significance of the data. Craft a narrative that guides viewers through the insights.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-share-alt text-indigo-400"></i>
                  </div>
                  <h4 className="font-semibold">6. Sharing & Iteration</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Present the visualization to your audience, gather feedback, and iterate to improve its effectiveness. Consider interactive elements for deeper exploration.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Applications Across Industries</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-chart-line text-blue-400"></i>
                  </div>
                  <h4 className="font-semibold">Business & Finance</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Sales dashboards, financial reports, market analysis, performance metrics, customer segmentation, and investment portfolio analysis.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-green-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-heartbeat text-green-400"></i>
                  </div>
                  <h4 className="font-semibold">Healthcare</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Patient monitoring, disease tracking, treatment outcomes, healthcare resource allocation, and public health surveillance.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-graduation-cap text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Education</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Student performance tracking, learning analytics, educational resource allocation, and research data presentation.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-globe text-purple-400"></i>
                  </div>
                  <h4 className="font-semibold">Government</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Census data, budget allocation, public service performance, election results, and policy impact assessment.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-flask text-yellow-400"></i>
                  </div>
                  <h4 className="font-semibold">Science & Research</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Experimental results, genomic data, climate models, astronomical observations, and research findings communication.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-newspaper text-indigo-400"></i>
                  </div>
                  <h4 className="font-semibold">Media & Journalism</h4>
                </div>
                <p className="text-sm text-gray-300">
                  News data stories, election coverage, sports statistics, social media trends, and investigative reporting.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowQuiz(true)}
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
              src="https://readdy.ai/api/search-image?query=collection%20of%20different%20chart%20types%20and%20graphs%20including%20bar%20charts%2C%20line%20charts%2C%20pie%20charts%2C%20scatter%20plots%20arranged%20in%20a%20grid%20layout%2C%20colorful%20data%20visualization%20examples%20on%20dark%20background%2C%20professional%20educational%20illustration&width=1200&height=500&seq=12&orientation=landscape"
              alt="Types of Charts and Graphs"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Types of Charts and Graphs</h3>
              <p className="text-gray-300 mb-4">
                Selecting the right type of chart or graph is crucial for effective data visualization. Different chart types are designed to represent different types of data relationships and serve different analytical purposes. This section explores the most common types of charts and graphs and provides guidance on when to use each one.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Comparison Charts</h3>
            <p className="text-gray-300 mb-6">
              Comparison charts are used to compare values across different categories or over time. They help identify patterns, trends, and differences between data points.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Bar Charts</h4>
                <p className="text-gray-300 mb-3">
                  Bar charts use rectangular bars to represent categorical data. The length of each bar is proportional to the value it represents, making it easy to compare values across categories.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-indigo-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Comparing values across different categories</li>
                    <li>• Showing rankings or distributions</li>
                    <li>• Displaying survey results or discrete data</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Line Charts</h4>
                <p className="text-gray-300 mb-3">
                  Line charts display information as a series of data points connected by straight lines. They are ideal for showing trends over continuous time periods or sequences.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-green-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Tracking changes over time</li>
                    <li>• Showing trends and patterns</li>
                    <li>• Comparing multiple data series over time</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="h-80 bg-gray-700 rounded-lg p-4 mb-6">
              <div ref={chartRef} className="w-full h-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-purple-400 mb-3">Radar Charts</h4>
                <p className="text-gray-300 mb-3">
                  Radar charts (also known as spider or web charts) display multivariate data in the form of a two-dimensional chart with three or more quantitative variables represented on axes starting from the same point.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-purple-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Comparing multiple variables for multiple items</li>
                    <li>• Performance analysis across different dimensions</li>
                    <li>• Identifying strengths and weaknesses</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-400 mb-3">Bullet Charts</h4>
                <p className="text-gray-300 mb-3">
                  Bullet charts are a variation of bar charts designed to show progress toward a goal, comparing actual values to target values while also showing qualitative ranges.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-yellow-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Tracking performance against targets</li>
                    <li>• Showing progress within context</li>
                    <li>• Displaying KPIs with benchmarks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Composition Charts</h3>
            <p className="text-gray-300 mb-6">
              Composition charts show how individual parts make up a whole. They help visualize the relative proportions of different categories within a total.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Pie Charts</h4>
                <p className="text-gray-300 mb-3">
                  Pie charts divide a circle into slices to illustrate numerical proportions. The size of each slice is proportional to the quantity it represents.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-indigo-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Showing proportions of a whole</li>
                    <li>• Displaying percentage distributions</li>
                    <li>• Comparing parts of a whole (with few categories)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Stacked Bar Charts</h4>
                <p className="text-gray-300 mb-3">
                  Stacked bar charts are bar charts where bars are divided into segments representing different categories. They show both the total value and the composition of that total.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-green-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Showing both total values and their composition</li>
                    <li>• Comparing compositions across categories</li>
                    <li>• Tracking changes in composition over time</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-purple-400 mb-3">Treemaps</h4>
                <p className="text-gray-300 mb-3">
                  Treemaps display hierarchical data as nested rectangles. The size of each rectangle represents a quantitative value, while color can represent another variable.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-purple-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Showing hierarchical data with part-to-whole relationships</li>
                    <li>• Displaying large datasets with many categories</li>
                    <li>• Comparing proportions across multiple levels</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-400 mb-3">Area Charts</h4>
                <p className="text-gray-300 mb-3">
                  Area charts are similar to line charts but with the area below the line filled in. Stacked area charts show how multiple categories contribute to a total over time.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-yellow-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Showing how parts contribute to a whole over time</li>
                    <li>• Visualizing cumulative totals</li>
                    <li>• Highlighting the magnitude of trends</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Distribution Charts</h3>
            <p className="text-gray-300 mb-6">
              Distribution charts show the frequency or distribution of values within a dataset. They help identify patterns, central tendencies, and outliers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Histograms</h4>
                <p className="text-gray-300 mb-3">
                  Histograms use bars to represent the distribution of a continuous variable. The data is divided into bins (intervals), and the height of each bar shows the frequency of values in that bin.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-indigo-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Showing the distribution of a continuous variable</li>
                    <li>• Identifying the shape of a distribution</li>
                    <li>• Finding central tendencies and outliers</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Box Plots</h4>
                <p className="text-gray-300 mb-3">
                  Box plots (or box-and-whisker plots) display the distribution of a dataset through quartiles. They show the median, quartiles, and potential outliers in a compact format.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-green-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Comparing distributions across groups</li>
                    <li>• Showing the spread and skewness of data</li>
                    <li>• Identifying outliers in a dataset</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Relationship Charts</h3>
            <p className="text-gray-300 mb-6">
              Relationship charts show how variables relate to each other. They help identify correlations, patterns, and clusters in multivariate data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Scatter Plots</h4>
                <p className="text-gray-300 mb-3">
                  Scatter plots display values for two variables as points on a Cartesian coordinate system. They are used to identify relationships, correlations, or clusters between variables.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-indigo-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Examining relationships between two variables</li>
                    <li>• Identifying correlations or patterns</li>
                    <li>• Detecting clusters or outliers</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Bubble Charts</h4>
                <p className="text-gray-300 mb-3">
                  Bubble charts are an extension of scatter plots where a third variable is represented by the size of the bubbles. A fourth variable can be represented by color.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-green-300 mb-2">When to use:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Visualizing three or four variables simultaneously</li>
                    <li>• Comparing items across multiple dimensions</li>
                    <li>• Showing relationships with additional context</li>
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
                <h3 className="text-lg font-semibold mb-2">Chart Selection Guide</h3>
                <p className="text-gray-300 mb-4">
                  Choosing the right chart type is crucial for effective data visualization. Here's a quick reference guide to help you select the most appropriate chart based on what you want to show:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-300 mb-2">To Compare Values:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Bar charts for categories</li>
                      <li>• Line charts for trends over time</li>
                      <li>• Radar charts for multiple variables</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-300 mb-2">To Show Composition:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Pie charts for simple proportions</li>
                      <li>• Stacked bar/area charts for changing composition</li>
                      <li>• Treemaps for hierarchical data</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-300 mb-2">To Display Distribution:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Histograms for frequency distribution</li>
                      <li>• Box plots for statistical summaries</li>
                      <li>• Density plots for smooth distributions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-300 mb-2">To Analyze Relationships:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Scatter plots for correlations</li>
                      <li>• Bubble charts for three variables</li>
                      <li>• Heatmaps for matrix data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowQuiz(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-question-circle mr-2"></i>
              Take Knowledge Check
            </button>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://readdy.ai/api/search-image?query=advanced%20data%20visualization%20techniques%20with%20interactive%20dashboards%2C%203D%20visualizations%2C%20and%20complex%20data%20representations%2C%20futuristic%20technology%20interface%20with%20multiple%20charts%20and%20graphs%2C%20blue%20and%20purple%20color%20scheme%20on%20dark%20background&width=1200&height=500&seq=13&orientation=landscape"
              alt="Advanced Visualization Techniques"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Advanced Visualization Techniques</h3>
              <p className="text-gray-300 mb-4">
                Beyond basic charts and graphs, advanced visualization techniques offer more sophisticated ways to represent complex data and enable deeper analysis. These techniques often incorporate interactivity, multiple dimensions, and specialized visual encodings to reveal insights that might be hidden in simpler visualizations.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div ref={barChartRef} className="w-full h-64 mb-4"></div>
              <h3 className="text-lg font-semibold mb-3">Interactive Visualizations</h3>
              <p className="text-gray-300 mb-4">
                Interactive visualizations allow users to explore data dynamically by changing parameters, filtering data, zooming in on areas of interest, and revealing additional information on demand. This interactivity transforms passive charts into powerful analytical tools.
              </p>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-400 mb-2">Key Features</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Filtering and sorting data in real-time</li>
                  <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Drill-down capabilities for hierarchical data</li>
                  <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Tooltips and hover effects for additional details</li>
                  <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Linked views where selections in one chart affect others</li>
                  <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Animation to show transitions and changes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div ref={pieChartRef} className="w-full h-64 mb-4"></div>
              <h3 className="text-lg font-semibold mb-3">Multi-dimensional Visualizations</h3>
              <p className="text-gray-300 mb-4">
                Multi-dimensional visualizations represent data with more than two variables, allowing for the exploration of complex relationships and patterns that might not be visible in simpler charts.
              </p>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2">Techniques</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Parallel coordinates for visualizing many dimensions</li>
                  <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Radar charts for comparing multiple variables</li>
                  <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>3D visualizations for spatial data</li>
                  <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Color, size, shape, and opacity as additional dimensions</li>
                  <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Small multiples for comparing across categories</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Specialized Visualization Types</h3>
            <p className="text-gray-300 mb-6">
              Specialized visualization types are designed for specific types of data or analytical needs. These visualizations often employ unique visual encodings to represent complex relationships or structures.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-project-diagram text-blue-400"></i>
                  </div>
                  <h4 className="font-semibold">Network Graphs</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Network graphs (or node-link diagrams) visualize relationships between entities. Nodes represent entities, while edges represent connections between them.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-blue-300 mb-1">Applications:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Social network analysis</li>
                    <li>• Organizational structures</li>
                    <li>• System dependencies</li>
                    <li>• Citation networks</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-green-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-tree text-green-400"></i>
                  </div>
                  <h4 className="font-semibold">Hierarchical Visualizations</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Hierarchical visualizations represent nested structures or parent-child relationships, showing how elements are organized into levels or categories.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-green-300 mb-1">Types:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Tree diagrams</li>
                    <li>• Sunburst charts</li>
                    <li>• Treemaps</li>
                    <li>• Dendrogram</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-map-marked-alt text-purple-400"></i>
                  </div>
                  <h4 className="font-semibold">Geospatial Visualizations</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Geospatial visualizations display data in a geographical context, showing how values vary across locations and revealing spatial patterns.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-purple-300 mb-1">Formats:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Choropleth maps</li>
                    <li>• Heat maps</li>
                    <li>• Point maps</li>
                    <li>• Flow maps</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-fire text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Heat Maps</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Heat maps use color intensity to represent values in a matrix. They are effective for showing patterns and variations across two categorical dimensions.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-red-300 mb-1">Use cases:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Website click patterns</li>
                    <li>• Correlation matrices</li>
                    <li>• Seasonal patterns</li>
                    <li>• Performance comparisons</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-stream text-yellow-400"></i>
                  </div>
                  <h4 className="font-semibold">Flow Visualizations</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Flow visualizations represent the movement or transfer of quantities between states or categories, showing how values change or are redistributed.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-yellow-300 mb-1">Examples:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Sankey diagrams</li>
                    <li>• Alluvial diagrams</li>
                    <li>• Flow maps</li>
                    <li>• Chord diagrams</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-900/50 p-2 rounded-full mr-2">
                    <i className="fas fa-clock text-indigo-400"></i>
                  </div>
                  <h4 className="font-semibold">Time-based Visualizations</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Time-based visualizations are specialized for temporal data, showing how values change over time and revealing patterns, cycles, and anomalies.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-indigo-300 mb-1">Variations:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Time series charts</li>
                    <li>• Gantt charts</li>
                    <li>• Stream graphs</li>
                    <li>• Calendar heatmaps</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Interactive Dashboards</h3>
            <p className="text-gray-300 mb-6">
              Interactive dashboards combine multiple visualizations into a cohesive interface, providing a comprehensive view of data and enabling users to explore relationships across different metrics and dimensions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Key Components</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span><strong>Multiple coordinated views</strong> that update together when filters are applied</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span><strong>Interactive controls</strong> like filters, sliders, and dropdown menus</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span><strong>Key performance indicators (KPIs)</strong> and summary metrics</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span><strong>Drill-down capabilities</strong> for exploring data at different levels of detail</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span><strong>Responsive design</strong> that adapts to different screen sizes and devices</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-purple-400 mb-3">Dashboard Design Principles</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span><strong>Purpose-driven design</strong> focused on specific user needs and questions</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span><strong>Logical organization</strong> with related metrics grouped together</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span><strong>Progressive disclosure</strong> showing essential information first with details on demand</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span><strong>Consistent visual language</strong> across all components</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span><strong>Clear context and guidance</strong> to help users understand the data</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-indigo-900/20 border border-indigo-800 rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3">Dashboard Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-indigo-400 mb-2">Strategic Dashboards</h5>
                  <p className="text-sm text-gray-300">
                    Provide high-level metrics for executives and decision-makers. Focus on KPIs and long-term trends with less interactivity but clear insights.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-indigo-400 mb-2">Analytical Dashboards</h5>
                  <p className="text-sm text-gray-300">
                    Enable in-depth analysis with multiple dimensions and filters. Designed for analysts to explore data, identify patterns, and generate insights.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="font-semibold text-indigo-400 mb-2">Operational Dashboards</h5>
                  <p className="text-sm text-gray-300">
                    Monitor real-time or near-real-time data for day-to-day operations. Focus on current status and immediate actions with frequent updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-code text-indigo-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Visualization Libraries and Tools</h3>
                <p className="text-gray-300 mb-4">
                  Modern data visualization relies on powerful libraries and tools that provide the building blocks for creating advanced visualizations and interactive dashboards.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-400 mb-2">JavaScript Libraries</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li><strong>D3.js:</strong> Powerful, flexible library for creating custom visualizations</li>
                      <li><strong>ECharts:</strong> Feature-rich charting library with strong interactive capabilities</li>
                      <li><strong>Chart.js:</strong> Simple yet flexible JavaScript charting library</li>
                      <li><strong>Plotly.js:</strong> High-level, declarative charting library</li>
                      <li><strong>Three.js:</strong> 3D visualization library for web browsers</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Dashboard Platforms</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li><strong>Tableau:</strong> Powerful visual analytics platform</li>
                      <li><strong>Power BI:</strong> Microsoft's business analytics service</li>
                      <li><strong>Looker:</strong> Business intelligence and big data analytics platform</li>
                      <li><strong>Grafana:</strong> Open-source analytics and monitoring solution</li>
                      <li><strong>Kibana:</strong> Data visualization dashboard for Elasticsearch</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowQuiz(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-question-circle mr-2"></i>
              Take Knowledge Check
            </button>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://readdy.ai/api/search-image?query=data%20visualization%20best%20practices%20with%20clean%2C%20well-designed%20charts%20and%20dashboards%2C%20comparison%20of%20good%20vs%20poor%20visualization%20examples%2C%20professional%20design%20principles%20illustration%20with%20annotations%20and%20guidelines%2C%20blue%20and%20purple%20color%20scheme%20on%20dark%20background&width=1200&height=500&seq=14&orientation=landscape"
              alt="Data Visualization Best Practices"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Data Visualization Best Practices</h3>
              <p className="text-gray-300 mb-4">
                Creating effective data visualizations requires more than just technical skills—it demands an understanding of design principles, human perception, and ethical considerations. This section explores best practices for designing clear, accurate, and impactful data visualizations that effectively communicate insights.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div ref={scatterChartRef} className="w-full h-64 mb-4"></div>
              <h3 className="text-lg font-semibold mb-3">Design Principles</h3>
              <p className="text-gray-300 mb-4">
                Effective data visualizations follow fundamental design principles that enhance clarity, focus attention on important information, and create a cohesive visual experience.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-400 mb-2">Simplicity</h4>
                  <p className="text-sm text-gray-300">
                    Remove unnecessary elements that don't contribute to understanding. Every visual element should serve a purpose—if it doesn't help communicate the data, consider removing it. Simplicity doesn't mean oversimplification; it means clarity and focus.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-400 mb-2">Hierarchy</h4>
                  <p className="text-sm text-gray-300">
                    Guide viewers through the visualization with clear visual hierarchy. Use size, color, and position to emphasize important elements and create a logical flow. The most important information should stand out immediately.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-400 mb-2">Consistency</h4>
                  <p className="text-sm text-gray-300">
                    Maintain consistent visual elements, scales, and terminology throughout your visualizations. Consistency helps viewers quickly understand and compare information across different parts of the visualization or across multiple visualizations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div ref={heatmapRef} className="w-full h-64 mb-4"></div>
              <h3 className="text-lg font-semibold mb-3">Perceptual Considerations</h3>
              <p className="text-gray-300 mb-4">
                Understanding how humans perceive visual information is crucial for creating effective visualizations. By aligning with natural perceptual tendencies, you can make your visualizations more intuitive and easier to interpret.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Pre-attentive Processing</h4>
                  <p className="text-sm text-gray-300">
                    Leverage visual attributes that are processed automatically by the brain, such as color, size, shape, and position. These attributes can be perceived quickly without conscious effort, making them powerful tools for highlighting important information.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Gestalt Principles</h4>
                  <p className="text-sm text-gray-300">
                    Apply principles of visual perception such as proximity, similarity, continuity, and closure. These principles explain how humans naturally group and organize visual elements, which can be used to create meaningful patterns in your visualizations.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Cognitive Load</h4>
                  <p className="text-sm text-gray-300">
                    Minimize the mental effort required to understand your visualization. Avoid making viewers perform complex mental calculations or remember information across different parts of the visualization. Make comparisons explicit rather than implicit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Color Usage</h3>
            <p className="text-gray-300 mb-6">
              Color is one of the most powerful tools in data visualization, but it must be used thoughtfully and purposefully. Effective color usage enhances understanding, while poor color choices can confuse or mislead.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Color Purpose</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Use color with clear intent. Different types of data call for different color approaches:
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-circle text-blue-500 mt-1 mr-2 text-xs"></i>
                    <span><strong>Categorical data:</strong> Use distinct hues to differentiate categories</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-green-500 mt-1 mr-2 text-xs"></i>
                    <span><strong>Sequential data:</strong> Use varying lightness/saturation of a single hue</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-purple-500 mt-1 mr-2 text-xs"></i>
                    <span><strong>Diverging data:</strong> Use two contrasting hues that meet at a neutral midpoint</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Accessibility</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Ensure your color choices work for all users, including those with color vision deficiencies:
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Use colorblind-friendly palettes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Don't rely on color alone to convey information</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Ensure sufficient contrast between colors</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Test visualizations with color blindness simulators</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-400 mb-3">Color Psychology</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Be mindful of cultural and psychological associations with colors:
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1 mr-2"></div>
                    <span><strong>Red:</strong> Often associated with danger, errors, or negative values</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-2"></div>
                    <span><strong>Green:</strong> Often represents positive values or success</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-2"></div>
                    <span><strong>Blue:</strong> Often perceived as trustworthy and professional</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1 mr-2"></div>
                    <span><strong>Yellow:</strong> Can signify caution or warning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Labeling and Annotation</h3>
            <p className="text-gray-300 mb-6">
              Clear labeling and thoughtful annotations transform raw visualizations into meaningful stories. They provide context, highlight key insights, and guide viewers through the data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-indigo-400 mb-3">Titles and Subtitles</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span>Use clear, descriptive titles that communicate the main point</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span>Consider using question or insight-driven titles</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span>Add subtitles to provide additional context or methodology</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-indigo-400 mt-1 mr-2"></i>
                    <span>Ensure titles are prominently displayed and easy to read</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-purple-400 mb-3">Axes and Legends</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span>Label axes clearly with units of measurement</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span>Consider whether to start axes at zero (often important for bar charts)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span>Use consistent scale increments that make sense</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-purple-400 mt-1 mr-2"></i>
                    <span>Place legends close to the data they describe</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-green-400 mb-3">Data Labels</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Label data points directly when space allows</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Use consistent formatting for numbers (decimal places, thousands separators)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Consider selective labeling of only the most important points</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                    <span>Ensure labels don't overlap or clutter the visualization</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-400 mb-3">Annotations</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-400 mt-1 mr-2"></i>
                    <span>Highlight key insights with callouts or annotations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-400 mt-1 mr-2"></i>
                    <span>Explain unusual patterns, outliers, or important events</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-400 mt-1 mr-2"></i>
                    <span>Use annotation to guide the viewer's attention</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-400 mt-1 mr-2"></i>
                    <span>Keep annotations concise and directly relevant to the data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Avoiding Common Pitfalls</h3>
            <p className="text-gray-300 mb-6">
              Even well-intentioned visualizations can mislead if certain pitfalls aren't avoided. Being aware of these common issues can help you create more honest and effective visualizations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-exclamation-triangle text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Misleading Scales</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Manipulating axis scales can dramatically change the perception of data. Truncated y-axes can exaggerate differences, while inconsistent scales make comparisons difficult.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-red-300 mb-1">Best practices:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Start bar charts at zero</li>
                    <li>• Clearly indicate when axes don't start at zero</li>
                    <li>• Use consistent scales when comparing multiple charts</li>
                    <li>• Choose scale increments that make sense for the data</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-chart-pie text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">3D and Decorative Effects</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  3D effects, shadows, and excessive decoration can distort data perception and add unnecessary complexity. They often make accurate reading of values difficult.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-red-300 mb-1">Best practices:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Avoid 3D charts unless visualizing actual 3D data</li>
                    <li>• Eliminate chart junk and decorative elements</li>
                    <li>• Focus on data representation, not visual effects</li>
                    <li>• Use simple, clean designs that emphasize the data</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-random text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Correlation vs. Causation</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Visualizations can imply causal relationships where only correlation exists. This can lead to incorrect conclusions and misinterpretation of the data.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-red-300 mb-1">Best practices:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Be careful with language in titles and annotations</li>
                    <li>• Clearly state when relationships are correlational</li>
                    <li>• Include relevant context and potential confounding factors</li>
                    <li>• Consider alternative explanations for observed patterns</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-red-900/50 p-2 rounded-full mr-3">
                    <i className="fas fa-filter text-red-400"></i>
                  </div>
                  <h4 className="font-semibold">Cherry-Picking Data</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Selectively including or excluding data points can create misleading narratives. This includes choosing convenient time periods or subsets of data that support a particular view.
                </p>
                <div className="bg-gray-800 rounded-lg p-3">
                  <h5 className="text-xs font-medium text-red-300 mb-1">Best practices:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Use complete datasets when possible</li>
                    <li>• Clearly disclose and justify any data exclusions</li>
                    <li>• Consider showing multiple time periods for context</li>
                    <li>• Be transparent about data sources and limitations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 mt-1">
                <i className="fas fa-balance-scale text-indigo-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ethical Considerations</h3>
                <p className="text-gray-300 mb-4">
                  Data visualization comes with ethical responsibilities. As creators of visualizations, we have the power to influence perceptions and decisions, making ethical considerations essential to our practice.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-400 mb-2">Transparency</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Clearly document data sources and methodologies</li>
                      <li>• Acknowledge limitations and uncertainties in the data</li>
                      <li>• Provide access to underlying data when possible</li>
                      <li>• Disclose any data transformations or calculations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-400 mb-2">Fairness and Representation</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Consider who is represented (and who isn't) in your data</li>
                      <li>• Be mindful of potential biases in data collection</li>
                      <li>• Avoid reinforcing stereotypes or harmful narratives</li>
                      <li>• Ensure visualizations are accessible to diverse audiences</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-400 mb-2">Integrity</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Present data honestly without distortion</li>
                      <li>• Avoid cherry-picking data to support predetermined narratives</li>
                      <li>• Use appropriate context to prevent misinterpretation</li>
                      <li>• Be willing to revise visualizations when errors are found</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-400 mb-2">Privacy and Consent</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Protect individual privacy in data collection and visualization</li>
                      <li>• Consider whether data was collected with informed consent</li>
                      <li>• Be cautious with potentially sensitive or identifiable information</li>
                      <li>• Follow relevant data protection regulations and guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowQuiz(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-question-circle mr-2"></i>
              Take Knowledge Check
            </button>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://readdy.ai/api/search-image?query=futuristic%20data%20visualization%20tools%20and%20technologies%20with%20advanced%20interfaces%2C%20AI-powered%20analytics%20dashboards%2C%20and%20emerging%20visualization%20trends%2C%20high-tech%20digital%20environment%20with%20holographic%20displays%20and%20interactive%20data%20elements%2C%20blue%20and%20purple%20color%20scheme%20on%20dark%20background&width=1200&height=500&seq=15&orientation=landscape"
              alt="Data Visualization Tools and Future Trends"
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Tools and Future Trends in Data Visualization</h3>
              <p className="text-gray-300 mb-4">
                The field of data visualization is constantly evolving, with new tools, technologies, and approaches emerging regularly. This section explores the current landscape of data visualization tools and examines emerging trends that are shaping the future of how we visualize and interact with data.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Data Visualization Tools Landscape</h3>
            <p className="text-gray-300 mb-6">
              The data visualization tools landscape spans from programming libraries to no-code platforms, offering solutions for users with varying technical skills and requirements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-xl overflow-hidden">
                <div className="bg-indigo-900/30 p-4">
                  <h4 className="font-semibold text-lg">Programming Libraries</h4>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-300">
                    Libraries that provide building blocks for creating custom visualizations through code. These offer the most flexibility but require programming skills.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-indigo-400 mb-1">JavaScript</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• D3.js - Powerful, flexible library for custom visualizations</li>
                        <li>• ECharts - Feature-rich charting library</li>
                        <li>• Chart.js - Simple yet flexible charting</li>
                        <li>• Three.js - 3D visualizations in the browser</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-indigo-400 mb-1">Python</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Matplotlib - Comprehensive plotting library</li>
                        <li>• Seaborn - Statistical data visualization</li>
                        <li>• Plotly - Interactive, publication-quality graphs</li>
                        <li>• Bokeh - Interactive web visualizations</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-indigo-400 mb-1">R</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• ggplot2 - Grammar of graphics implementation</li>
                        <li>• Shiny - Interactive web applications</li>
                        <li>• Plotly for R - Interactive visualizations</li>
                        <li>• Highcharter - R wrapper for Highcharts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-xl overflow-hidden">
                <div className="bg-purple-900/30 p-4">
                  <h4 className="font-semibold text-lg">Business Intelligence Platforms</h4>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-300">
                    Comprehensive platforms that combine data preparation, analysis, and visualization capabilities. These tools are designed for business users and analysts.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 mb-1">Enterprise Solutions</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Tableau - Powerful visual analytics platform</li>
                        <li>• Power BI - Microsoft's business analytics service</li>
                        <li>• Qlik Sense - Self-service visualization and discovery</li>
                        <li>• Looker - Business intelligence and analytics platform</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 mb-1">Open Source Options</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Metabase - Simple, open-source business intelligence</li>
                        <li>• Redash - Connect and query your data sources</li>
                        <li>• Apache Superset - Modern data exploration platform</li>
                        <li>• KNIME - Open-source analytics platform</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-purple-400 mb-1">Key Features</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Data connection and preparation capabilities</li>
                        <li>• Interactive dashboards and reports</li>
                        <li>• Collaboration and sharing features</li>
                        <li>• Automated insights and analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-xl overflow-hidden">
                <div className="bg-green-900/30 p-4">
                  <h4 className="font-semibold text-lg">Specialized Visualization Tools</h4>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-300">
                    Tools designed for specific types of data or visualization needs, offering specialized features for particular domains or use cases.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 mb-1">Geospatial</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• CARTO - Location intelligence platform</li>
                        <li>• Mapbox - Custom maps and location data</li>
                        <li>• Kepler.gl - Geospatial analysis tool</li>
                        <li>• ArcGIS - Geographic information system</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 mb-1">Network Analysis</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Gephi - Network visualization and analysis</li>
                        <li>• Cytoscape - Network data integration and visualization</li>
                        <li>• NodeXL - Network analysis in Excel</li>
                        <li>• Sigma.js - JavaScript library for network visualization</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <h5 className="font-semibold text-green-400 mb-1">Scientific Visualization</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• ParaView - Multi-platform data analysis and visualization</li>
                        <li>• VisIt - Interactive visualization and analysis</li>
                        <li>• VTK - Visualization Toolkit for 3D computer graphics</li>
                        <li>• MATLAB - Technical computing and visualization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Choosing the Right Tool</h3>
            <p className="text-gray-300 mb-6">
              Selecting the appropriate visualization tool depends on various factors including your technical skills, specific requirements, and the context in which the visualizations will be used.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      Consider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      Questions to Ask
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600">
                      Tool Recommendations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Technical Expertise
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      What programming skills do you or your team have? How much time can you invest in learning new tools?
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <span className="text-indigo-400">Low technical skills:</span> Tableau, Power BI, Excel<br />
                      <span className="text-indigo-400">Medium:</span> R with ggplot2, Python with Plotly<br />
                      <span className="text-indigo-400">High:</span> D3.js, custom solutions
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Data Complexity
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      How large and complex is your data? What types of data are you working with? How often does it update?
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <span className="text-indigo-400">Big data:</span> Apache Superset, Elasticsearch + Kibana<br />
                      <span className="text-indigo-400">Real-time:</span> Grafana, Power BI with streaming<br />
                      <span className="text-indigo-400">Complex relationships:</span> Neo4j, Gephi
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Audience & Distribution
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      Who will use the visualizations? How will they be shared? Do you need interactive or static visualizations?
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <span className="text-indigo-400">Internal dashboards:</span> Tableau, Power BI<br />
                      <span className="text-indigo-400">Public web:</span> D3.js, ECharts, Observable<br />
                      <span className="text-indigo-400">Reports/publications:</span> R, Python, Adobe Illustrator
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Integration Needs
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      Does the tool need to integrate with existing systems? What data sources do you need to connect to?
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <span className="text-indigo-400">Microsoft ecosystem:</span> Power BI<br />
                      <span className="text-indigo-400">Web applications:</span> Chart.js, ECharts<br />
                      <span className="text-indigo-400">Multiple data sources:</span> Tableau, Qlik
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Budget & Resources
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      What is your budget for visualization tools? Do you prefer open-source or commercial solutions?
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <span className="text-indigo-400">Open-source:</span> Metabase, R, Python libraries<br />
                      <span className="text-indigo-400">Commercial:</span> Tableau, Power BI, Qlik<br />
                      <span className="text-indigo-400">Enterprise:</span> Looker, Domo, ThoughtSpot
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Emerging Trends in Data Visualization</h3>
            <p className="text-gray-300 mb-6">
              The field of data visualization is rapidly evolving, with new technologies and approaches emerging that are changing how we create, interact with, and derive insights from visualizations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-robot text-indigo-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">AI-Powered Visualizations</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Artificial intelligence is transforming data visualization by automating insights, recommending appropriate visualizations, and making advanced analytics more accessible.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-indigo-400 mb-2">Key Developments</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Automated insight generation that identifies patterns and anomalies</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Smart visualization recommendations based on data characteristics</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Natural language interfaces for creating and querying visualizations</li>
                    <li><i className="fas fa-angle-right text-indigo-400 mr-2"></i>Predictive analytics integrated directly into visualizations</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-vr-cardboard text-purple-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Immersive Visualizations</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Virtual reality (VR), augmented reality (AR), and mixed reality (MR) are opening new possibilities for immersive, spatial data visualizations that leverage our natural ability to navigate 3D spaces.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-400 mb-2">Applications</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>VR environments for exploring complex multidimensional datasets</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>AR overlays that add data visualizations to real-world objects</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Collaborative data exploration in shared virtual spaces</li>
                    <li><i className="fas fa-angle-right text-purple-400 mr-2"></i>Spatial data visualization for urban planning and architecture</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-green-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-hand-pointer text-green-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Advanced Interactivity</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Interactive visualizations are becoming more sophisticated, with new techniques for user engagement and data exploration that go beyond traditional filtering and zooming.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-green-400 mb-2">Innovations</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Direct manipulation interfaces for more intuitive interaction</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Storytelling features that guide users through data narratives</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Personalized visualizations that adapt to user behavior</li>
                    <li><i className="fas fa-angle-right text-green-400 mr-2"></i>Collaborative features for team-based data exploration</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-red-900/50 p-3 rounded-full mr-3">
                    <i className="fas fa-mobile-alt text-red-400"></i>
                  </div>
                  <h4 className="text-lg font-semibold">Mobile and Embedded Visualizations</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  As data becomes ubiquitous, visualizations are increasingly being integrated into mobile experiences, IoT devices, and everyday objects, making data more accessible in various contexts.
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-red-400 mb-2">Trends</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Responsive visualizations optimized for various screen sizes</li>
                    <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Micro-visualizations embedded in text, interfaces, and objects</li>
                    <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Ambient visualizations that blend into the environment</li>
                    <li><i className="fas fa-angle-right text-red-400 mr-2"></i>Context-aware visualizations that adapt to location and activity</li>
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
                <h3 className="text-lg font-semibold mb-2">The Future of Data Visualization</h3>
                <p className="text-gray-300 mb-4">
                  Looking ahead, several key developments are likely to shape the future of data visualization, changing how we create, interact with, and derive value from visual representations of data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Democratization of Data</h4>
                    <p className="text-sm text-gray-300">
                      Visualization tools will become more accessible to non-technical users, with AI assistants, natural language interfaces, and no-code platforms removing barriers to creating effective visualizations. This will empower more people to explore and communicate with data.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Real-time and Streaming Data</h4>
                    <p className="text-sm text-gray-300">
                      As data increasingly comes from real-time sources like IoT devices, social media, and business operations, visualizations will evolve to handle streaming data more effectively, with techniques for showing change over time and alerting users to significant events.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Multi-sensory Data Experiences</h4>
                    <p className="text-sm text-gray-300">
                      Beyond visual representations, future data experiences may incorporate sound, touch, and other senses to create more immersive and accessible ways of understanding data. This multi-sensory approach could reveal patterns that might not be apparent through visual means alone.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Ethical and Responsible Visualization</h4>
                    <p className="text-sm text-gray-300">
                      As visualizations become more powerful and pervasive, there will be increased focus on ethical considerations, including transparency, fairness, privacy, and accessibility. Tools and frameworks will emerge to help creators ensure their visualizations are responsible and trustworthy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Conclusion: The Evolving Art and Science of Data Visualization</h3>
            <p className="text-gray-300 mb-4">
              Data visualization stands at the intersection of art, science, technology, and communication. As we've explored throughout this course, effective visualization requires technical skills, design sensibility, domain knowledge, and an understanding of human perception.
            </p>
            <p className="text-gray-300 mb-4">
              The field continues to evolve rapidly, with new tools, techniques, and approaches emerging regularly. What remains constant is the fundamental purpose: to transform data into insights that can inform decisions, inspire action, and deepen understanding.
            </p>
            <p className="text-gray-300 mb-4">
              As you continue your journey in data visualization, remember that the most effective visualizations are those that clearly communicate meaningful insights to their intended audience. Technical sophistication should always serve this primary goal rather than becoming an end in itself.
            </p>
            <p className="text-gray-300">
              By combining technical knowledge with design principles, ethical considerations, and a deep understanding of your data and audience, you can create visualizations that not only inform but also engage, inspire, and drive positive change.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowQuiz(true)}
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

