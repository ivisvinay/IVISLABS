import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Navbar } from './components/Navbar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explore } from './pages/Explore';

function App() {
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />

          {/* Add more routes here for company and student dashboards */}
          {/* For brevity, showing structure - full implementation would include all pages */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
