import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Work from './pages/WorkPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  );
}
