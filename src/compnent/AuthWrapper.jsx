import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            setTimeout(() => {  // ⏳ Add delay before checking auth
                const token = localStorage.getItem("authToken");
                const expiry = Number(localStorage.getItem("authTokenExpiry"));

                if (!token || Date.now() > expiry) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authTokenExpiry");
                    navigate("/Login");
                }
            }, 500);  // ⏳ Delay for 500ms before checking auth
        };

        checkAuth();
        const interval = setInterval(checkAuth, 60 * 1000); // Check every 1 minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, [navigate]);

    return children;
};

export default AuthWrapper;
