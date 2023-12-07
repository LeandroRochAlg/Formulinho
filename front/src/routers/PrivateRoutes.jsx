import AboutPage from "../pages/system/AboutPage.jsx";
import ProfilePage from "../pages/system/ProfilePage.jsx";
import SearchPage from "../pages/system/SearchPage.jsx";
import HomePage from "../pages/system/HomePage.jsx";
import NotFoundPage from "../pages/errors/Page404.jsx";

import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
