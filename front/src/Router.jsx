import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import HomePage from "./pages/auth/HomePage.jsx";

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
        path: "/home",
        element: <HomePage />
    }
]);

export default AppRouters;