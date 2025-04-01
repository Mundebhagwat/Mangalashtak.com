import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const authToken = localStorage.getItem("authToken");
    const tokenExpiry = Number(localStorage.getItem("authTokenExpiry"));

    if (!authToken || Date.now() > tokenExpiry) {
        // Remove token if expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        setTimeout(() => {
            return <Navigate to="/Login" />;
        }, 500);

    }

    return <Outlet />;
};

export default PrivateRoute;
