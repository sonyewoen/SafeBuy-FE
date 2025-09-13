import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchDetail from './pages/SearchDetail';
import LoadingPage from './pages/LoadingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchDetail />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
