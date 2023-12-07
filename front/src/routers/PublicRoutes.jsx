// PublicRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../pages/auth/HomeScreen.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import NotFoundPage from "../pages/errors/Page404.jsx";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;
