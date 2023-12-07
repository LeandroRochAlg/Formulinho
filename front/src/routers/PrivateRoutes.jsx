import { Route, Routes, useNavigate} from "react-router-dom";
import React, { useEffect } from "react";
import AboutPage from "../pages/system/AboutPage.jsx";
import ProfilePage from "../pages/system/ProfilePage.jsx";
import SearchPage from "../pages/system/SearchPage.jsx";
import HomePage from "../pages/system/HomePage.jsx";


const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const renderPrivateRoute = (path, element) => {
    return isAuthenticated ? (
      <Route path={path} element={element} />
    ) : null;
  };

  return (
    <>
      <Routes>
        {renderPrivateRoute("/about", <AboutPage />)}
        {renderPrivateRoute("/profile", <ProfilePage />)}
        {renderPrivateRoute("/search", <SearchPage />)}
        {renderPrivateRoute("/home", <HomePage />)}
      </Routes>
    </>
  );
};

export default PrivateRoutes;


