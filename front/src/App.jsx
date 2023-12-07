// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routers/PublicRoutes.jsx";
import PrivateRoutes from "./routers/PrivateRoutes.jsx";

const App = () => {
  // Check authentication status
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          PrivateRoutes().map((route) => route)
        ) : (
          <>
            {/* Redirect to login if trying to access private routes */}
            <Route
              path="/system/*"
              element={<Navigate to="/auth/login" replace />}
            />
            {PublicRoutes().map((route) => route)}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
