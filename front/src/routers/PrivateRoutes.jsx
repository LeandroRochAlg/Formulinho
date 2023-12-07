import AboutPage from "../pages/system/AboutPage.jsx";
import ProfilePage from "../pages/system/ProfilePage.jsx";
import SearchPage from "../pages/system/SearchPage.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import {Routes, Route} from 'react-router-dom';

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    )
}  

export default PrivateRoutes;