import { useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress  } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false); // 🔄 Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
           // Clear old token before logging in
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        setLoading(true); // Start loading animation
        try {
            const { data } = await axios.post("https://backend-for-mangalastak.onrender.com/api/auth/login", { email, password });
            if (data.token) {
                const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // Set expiry to 3 hours from now

                localStorage.setItem("authToken", data.token);
                localStorage.setItem("authTokenExpiry", expirationTime);

                navigate("/dashboard"); // Redirect to dashboard
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed"); 
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;

