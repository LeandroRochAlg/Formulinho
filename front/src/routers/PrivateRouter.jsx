import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRouter = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        element
      ) : (
        <Navigate to="/login" replace state={{ from: rest.location }} />
      )}
    />
  );
};

export default PrivateRouter;
