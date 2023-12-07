// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routers/PublicRoutes.jsx";
import PrivateRoutes from "./routers/PrivateRoutes.jsx";

const App = () => {
  // Check authentication status
  const isAuthenticated = localStorage.getItem("token");

  console.log("fodase");


  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          PrivateRoutes().map((route) => route)
        ) : (
          <>
            <Route
              path="/system/*"
              element={<Navigate to={PublicRoutes().map((route) => route)}/>}
            />
            {PublicRoutes().map((route) => route)}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
