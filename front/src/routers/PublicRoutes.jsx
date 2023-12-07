// PublicRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../pages/auth/HomeScreen.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import NotFoundPage from "../pages/errors/Page404.jsx";



const PublicRoutes = () => {

  return [
    <Route key="home" path="/auth/home" element={<HomeScreen />} />,
    <Route key="login" path="/auth/login" element={<LoginPage />} />,
    <Route key="register" path="/auth/register" element={<RegisterPage />} />,
    <Route key="notfound" path="/auth/*" element={<NotFoundPage />} />,
  ];
};

export default PublicRoutes;
