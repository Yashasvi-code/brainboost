import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrainBoostHome from './pages/BrainBoost-Home';
import LessonContentOverview from './Lessons/Lesson-Content-Overview';
import PersonalizedLearningTutor from './pages/Personalized-Learning-Tutor';
import FullStackProgress from './paths/Full-Stack-Development-Progress';
import LessonsPage from './pages/Lessons';

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-black text-white hover:bg-gray-700">
        <Link to="/">Home</Link>
        <Link to="/lesson">Lesson</Link>
        <Link to="/tutor">Dashboard</Link>
        {/* <Link to="/lessons">Lessons</Link> */}
      </nav>
      <Routes>
        <Route path="/" element={<BrainBoostHome />} />
        <Route path="/lesson" element={<LessonContentOverview />} />
        <Route path="/tutor" element={<PersonalizedLearningTutor />} />
        <Route path="/full-stack-progress" element={<FullStackProgress />} />
        {/* <Route path="/data-visualization" element={<DataVisualizationTechniques />} /> */}
      </Routes>
    </Router>
  );
}