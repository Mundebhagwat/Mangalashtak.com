import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // add this at the top

    const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
        const expiry = localStorage.getItem("authTokenExpiry");

        // Check if token is expired
        if (!token || (expiry && Date.now() > expiry)) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
            setUser(null);
            setLoading(false); // set here
            return;
        }

        try {
            const { data } = await axios.get("https://backend-for-mangalastak.onrender.com/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data);
        } catch (error) {
            console.error("Auth error:", error.response?.data || error.message);
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
        } finally {
            setLoading(false); // set loading false after done
        }
    };

     useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
    }, [loading, currentUser]);

    return <AuthContext.Provider value={{ currentUser, setUser, fetchUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
