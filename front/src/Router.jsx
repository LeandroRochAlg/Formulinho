import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import SearchPage from "./pages/auth/SearchPage.jsx";
import HomeScreen from "./pages/auth/HomeScreen.jsx";

const AppRouters = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
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
    }
]);

export default AppRouters;