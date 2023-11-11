import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

const AppRouters = createBrowserRouter([
    { 
        path: "/login",
        element: <LoginPage />
    },
    { 
        path: "/register",
        element: <RegisterPage />
    }
]);

export default AppRouters;