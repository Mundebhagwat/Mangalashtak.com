// import { useState } from "react";
// import { Container, TextField, Button, Typography, Box, CircularProgress  } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//      const [loading, setLoading] = useState(false); // 🔄 Loading state
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//            // Clear old token before logging in
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("authTokenExpiry");
//         setLoading(true); // Start loading animation
//         try {
//             const { data } = await axios.post("https://backend-for-mangalastak.onrender.com/api/auth/login", { email, password });
//             if (data.token) {
//                 const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // Set expiry to 3 hours from now

//                 localStorage.setItem("authToken", data.token);
//                 localStorage.setItem("authTokenExpiry", expirationTime);

//                 navigate("/dashboard"); // Redirect to dashboard
//             }
//         } catch (error) {
//             alert(error.response?.data?.message || "Login failed"); 
//         } finally {
//             setLoading(false); // Stop loading animation
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
//                 <Typography variant="h5" gutterBottom>
//                     Login
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//                     </Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// };

// export default Login;


import { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import icons (assuming MUI icons are available in your project)
// If they're not, you'll need to install @mui/icons-material
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper 
                elevation={6} 
                sx={{ 
                    width: '100%', 
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {/* Decorative top bar */}
                <Box 
                    sx={{ 
                        height: 8, 
                        background: 'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
                        backgroundSize: '200% 100%',
                        animation: 'gradient 5s ease infinite',
                        '@keyframes gradient': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                            '100%': { backgroundPosition: '0% 50%' }
                        }
                    }} 
                />
                
                <Box sx={{ p: 4, pt: 5 }}>
                    {/* Home button */}
                    <Button 
                        startIcon={<HomeIcon />}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ 
                            position: 'absolute', 
                            top: 16, 
                            left: 16,
                            borderRadius: 2,
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }
                        }}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
                    
                    <Typography 
                        variant="h4" 
                        align="center" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 600,
                            mb: 4,
                            background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Welcome Back
                    </Typography>
                    
                    <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
                        Sign in to your account to continue
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            label="Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                }
                            }}
                        />
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            label="Password" 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                }
                            }}
                        />
                        
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            size="large"
                            sx={{ 
                                mt: 2, 
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                },
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                        </Button>
                    </form>
                    
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
                        Mangalashtak - Your Premium Experience
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;

