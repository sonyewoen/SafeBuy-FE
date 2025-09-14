import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchDetail from './pages/SearchDetail';
import LoadingPage from './pages/LoadingPage';
import SearchResult from "./pages/SearchResult";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchDetail />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/searchresult" element={<SearchResult />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
