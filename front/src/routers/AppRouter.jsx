// AppRouters.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';  // Assuming this is the correct import path

const HomeScreen = () => <div>Home Screen</div>;
const LoginPage = () => <div>Login Page</div>;
const RegisterPage = () => <div>Register Page</div>;

const AppRouters = () => (
  <Routes>
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/" element={<HomeScreen />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    
    {/* Include PrivateRoutes as a separate Route */}
    <Route path="/system/*" element={<PrivateRoutes />} />
  </Routes>
);

export default AppRouters;
