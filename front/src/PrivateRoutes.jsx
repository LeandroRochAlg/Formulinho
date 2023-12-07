import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with your authentication check

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutes;
