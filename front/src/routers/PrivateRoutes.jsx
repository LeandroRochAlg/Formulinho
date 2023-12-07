import AboutPage from "../pages/system/AboutPage.jsx";
import ProfilePage from "../pages/system/ProfilePage.jsx";
import SearchPage from "../pages/system/SearchPage.jsx";
import HomePage from "../pages/system/HomePage.jsx";
import NotFoundPage from "../pages/errors/Page404.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <>
        <>
          <PrivateRouter path="/about" element={<AboutPage />} />
        </>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes></>
  );
};

export default PrivateRoutes;
