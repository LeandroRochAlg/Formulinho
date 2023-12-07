import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import AboutPage from '../pages/system/AboutPage.jsx';
import ProfilePage from '../pages/system/ProfilePage.jsx';
import SearchPage from '../pages/system/SearchPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';

const PrivateRoutes = () => (
  <Routes>
    <PrivateRouter path="/about" element={<AboutPage />} />
    <PrivateRouter path="/profile" element={<ProfilePage />} />
    <PrivateRouter path="/search" element={<SearchPage />} />
    {/* Add more private routes as needed */}
  </Routes>
);

const PublicRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    {/* Add more public routes as needed */}
  </Routes>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Use PrivateRoutes for protected routes */}
        <Route path="/system/*" element={<PrivateRoutes />} />
        {/* Use PublicRoutes for public routes */}
        <Route path="/auth/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
