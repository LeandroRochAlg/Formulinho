import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import SearchPage from "./pages/auth/SearchPage.jsx";
import HomeScreen from "./pages/auth/HomeScreen.jsx";
import About from "./pages/auth/About.jsx";

const AppRouters = createBrowserRouter([
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
        path: "/home",
        element: <HomeScreen />
    },
    {
        path: "/about",
        element: <About />
    }
]);

export default AppRouters;