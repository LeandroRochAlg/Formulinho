import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import SearchPage from "./pages/auth/SearchPage.jsx";
import HomeScreen from "./pages/auth/HomeScreen.jsx";
import About from "./pages/auth/About.jsx";
import ProfilePage from "./pages/auth/ProfilePage.jsx";

const AppRouters = createBrowserRouter([
    {
        path: "/home",
        element: <HomeScreen />
    },
    {
        path: "/",
        element: <HomeScreen />
    },
    { 
        path: "/login",
        element: <LoginPage />
    },
    { 
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/search",
        element: <SearchPage />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
]);

export default AppRouters;