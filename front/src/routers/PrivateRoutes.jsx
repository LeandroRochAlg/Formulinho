// PrivateRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import AboutPage from '../pages/system/AboutPage.jsx';
import ProfilePage from '../pages/system/ProfilePage.jsx';
import SearchPage from '../pages/system/SearchPage.jsx';

const PrivateRoutes = () => {
  return (
    <Routes>
      <PrivateRouter path="/about" element={<AboutPage />} />
      <PrivateRouter path="/profile" element={<ProfilePage />} />
      <PrivateRouter path="/search" element={<SearchPage />} />
      
      {/* Add a default route or redirect if needed */}
      {/* <Route index element={<Navigate to="/404" />} /> */}
    </Routes>
  );
};

export default PrivateRoutes;
