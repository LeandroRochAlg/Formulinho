// PrivateRoutes.jsx
import React from 'react';
import { Routes } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import AboutPage from '../pages/system/AboutPage.jsx';
import ProfilePage from '../pages/system/ProfilePage.jsx';
import SearchPage from '../pages/system/SearchPage.jsx';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Fragment>
            <PrivateRouter path="/about" element={<AboutPage />} />
            <PrivateRouter path="/profile" element={<ProfilePage />} />
            <PrivateRouter path="/search" element={<SearchPage />} />
          </React.Fragment>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;