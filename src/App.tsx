import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrainBoostHome from './pages/BrainBoost-Home';
import LessonContentOverview from './pages/Lesson-Content-Overview';
import PersonalizedLearningTutor from './pages/Personalized-Learning-Tutor';

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-black text-white hover:bg-gray-700">
        <Link to="/">Home</Link>
        <Link to="/lesson">Lesson</Link>
        <Link to="/tutor">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BrainBoostHome />} />
        <Route path="/lesson" element={<LessonContentOverview />} />
        <Route path="/tutor" element={<PersonalizedLearningTutor />} />
      </Routes>
    </Router>
  );
}
