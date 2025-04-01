import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
           // Clear old token before logging in
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
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
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;


// hey there i am now building the web site for the topic is Matrimonial web app for that i need a very good looking home page that impact bon the user so they can rate our site like "what a site "  like this they should say when they see our home page okay so for that i have  have told you what we have and the steps okay. on that give me the good looking home page okay.
// all right now let's move forward, now i have chat functionality and the search functionality via pereference and dashboard so as far now these tings we have in our app but we don't have a home page a very good looking home page you know cause home is the thing where user  judge  our we site right so i want you to give me a very good looking UI for our home page so user can see and while using it fell good,  so you know the topic right the materimonial is the topic on the basis of that topic we need to create stunnig home page for the site all right so let's start with your design knowlede okay, home page must have login and register button okay and  if you are going to add the images for that i am useing cloudinary  okay then you have the things now let's make this thing in action so unlock your full potentila here let's goooo
