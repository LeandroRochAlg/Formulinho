// PrivateRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRouter = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  console.log(isAuthenticated);

  return (
  <Routes>
    <Route
      {...rest}
      element={isAuthenticated ? (element) : (<Navigate to="/login" replace state={{ from: rest.location }} />
      )}
    />
  </Routes>
  );
};

export default PrivateRouter;
