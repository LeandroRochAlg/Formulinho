// PrivateRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import AboutPage from "../pages/system/AboutPage.jsx";
import ProfilePage from "../pages/system/ProfilePage.jsx";
import SearchPage from "../pages/system/SearchPage.jsx";
import HomePage from "../pages/system/HomePage.jsx";
import NotFoundPage from "../pages/errors/Page404.jsx";

const PrivateRoutes = () => {
      
  return [
    <Route key="about" path="/system/about" element={<AboutPage />} />,
    <Route key="profile" path="/system/profile" element={<ProfilePage />} />,
    <Route key="search" path="/system/search" element={<SearchPage />} />,
    <Route key="home" path="/system/home" element={<HomePage />} />,
    <Route key="notfound" path="/system/*" element={<NotFoundPage />} />,
  ];
};

export default PrivateRoutes;
