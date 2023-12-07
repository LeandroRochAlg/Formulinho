import {Route, Routes} from 'react-router-dom';
import HomeScreen from "../pages/auth/HomeScreen.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}  

export default PublicRoutes;