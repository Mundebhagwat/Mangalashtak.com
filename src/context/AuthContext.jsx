import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);

    const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
        const expiry = localStorage.getItem("authTokenExpiry");

        // Check if token is expired
        if (!token || (expiry && Date.now() > expiry)) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
            setUser(null);
            return;
        }

        try {
            const { data } = await axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data);
        } catch (error) {
            console.error("Auth error:", error.response?.data || error.message);
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{ currentUser, setUser, fetchUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
