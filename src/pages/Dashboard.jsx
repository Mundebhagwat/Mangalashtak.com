import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Avatar, Button, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tabs, Tab } from "@mui/material";
import PartnerPreferencesForm from "../compnent/PartnerPreferences";


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
    const [totalShortlisted, setTotalShortlisted] = useState(0);




    // do not tuch this 
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get("token");

        if (!token) {
            // ✅ If no token in the URL, use localStorage
            token = localStorage.getItem("authToken");
        }

        if (token) {
            const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // 3-hour expiry
            localStorage.setItem("authToken", token);
            localStorage.setItem("authTokenExpiry", expirationTime);


            // ✅ Remove token from URL for security
            if (urlParams.get("token")) {
                navigate("/dashboard", { replace: true });
            }
        } else {
            console.log("❌ No token found, redirecting to login...");
            navigate("/login?error=invalid_token", { replace: true });
        }
    }, []);
    // to this line 


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Authentication required. Redirecting to login.");
            navigate("/login");
            return;
        }
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("https://backend-for-mangalastak.onrender.com/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch {
                toast.error("Failed to load user profile");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [navigate]);


    useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchShortlistedProfiles = async () => {
        try {
            const response = await axios.get("https://backend-for-mangalastak.onrender.com/api/users/shortlisted-profiles", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShortlistedProfiles(response.data.profiles);
            setTotalShortlisted(response.data.totalShortlisted);
        } catch (error) {
            console.error("❌ Failed to fetch shortlisted profiles:", error);
            console.error("❌ Full Error Response:", error.response?.data || error.message);
        }
    };

    fetchShortlistedProfiles();
}, []);




    const handleEdit = () => setEditMode(true);
    const handleSave = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const { data } = await axios.put("https://backend-for-mangalastak.onrender.com/api/auth/update", updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(data);
            setEditMode(false);
            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Failed to update profile");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("authToken");
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await axios.delete("https://backend-for-mangalastak.onrender.com/api/auth/delete", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Account deleted successfully");
                localStorage.removeItem("authToken");
                navigate("/register");
            } catch {
                toast.error("Failed to delete account");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            {user ? (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card sx={{ boxShadow: 5, borderRadius: 4, p: 3, textAlign: "center", bgcolor: "#fff" }}>
                        <Avatar src={user.profilePicture} sx={{ width: 120, height: 120, margin: "auto", mb: 2, border: "3px solid #ff6b81" }} />
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold" sx={{ color: "#333" }}>
                                {user.fullName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                {user.email}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {user.bio || "No bio available"}
                            </Typography>

                            {editMode ? (
                                <Box mt={3}>
                                    <TextField fullWidth label="Full Name" value={updatedData.fullName || user.fullName} onChange={(e) => setUpdatedData({ ...updatedData, fullName: e.target.value })} margin="normal" />
                                    <TextField fullWidth label="Bio" value={updatedData.bio || user.bio} onChange={(e) => setUpdatedData({ ...updatedData, bio: e.target.value })} margin="normal" multiline rows={3} />
                                    <Button variant="contained" sx={{ mt: 2, bgcolor: "#ff6b81" }} onClick={handleSave}>Save Changes</Button>
                                </Box>
                            ) : (
                                <Box mt={3}>
                                    <motion.button
                                        onClick={handleEdit}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: "linear-gradient(135deg, #ff6b81, #ff8e53)",
                                            color: "white",
                                            padding: "12px 25px",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            border: "none",
                                            cursor: "pointer",
                                            margin: "5px"
                                        }}
                                    >
                                        ✏️ Edit Profile
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setOpenDelete(true)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: "#ff4757",
                                            color: "white",
                                            padding: "12px 25px",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            border: "none",
                                            cursor: "pointer",
                                            margin: "5px"
                                        }}
                                    >
                                        🗑 Delete Account
                                    </motion.button>
                                    <motion.button
                                        onClick={handleLogout}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: "#2ed573",
                                            color: "white",
                                            padding: "12px 25px",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            border: "none",
                                            cursor: "pointer",
                                            margin: "5px"
                                        }}
                                    >
                                        🚪 Logout
                                    </motion.button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <Typography>Loading...</Typography>
            )}

            {/* Partner Preferences Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginTop: "30px", textAlign: "center" }}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", mb: 2 }}>
                    Find Your Perfect Match 💖
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Let us help you connect with like-minded people and build something beautiful.
                </Typography>

                {/* Animated "Find Partner" Button */}
                <motion.button
                    onClick={() => navigate("/find-partner")}
                    whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 105, 180, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: "linear-gradient(135deg, #ff6b81, #ff8e53)",
                        color: "white",
                        border: "none",
                        padding: "15px 30px",
                        borderRadius: "50px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                >
                    🔍 Find Partner
                </motion.button>
            </motion.div>

            {/* New Shortlisted Profiles Section (add after "Find Partner" section) */}
            {totalShortlisted > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginTop: "40px", textAlign: "center" }}
                >
                    <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", mb: 3 }}>
                        Your Shortlisted Profiles 💕 ({totalShortlisted})
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 2,
                            pb: 2,
                            '&::-webkit-scrollbar': { display: 'none' }
                        }}
                    >
                        {shortlistedProfiles.map(profile => (
                            <motion.div
                                key={profile._id}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    minWidth: '250px',
                                    background: 'linear-gradient(145deg, #f6d365 0%, #fda085 100%)',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    color: 'white',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Avatar
                                    src={profile.profilePicture}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        margin: 'auto',
                                        border: '3px solid white'
                                    }}
                                />
                                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                                    {profile.fullName}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    {profile.age} | {profile.location}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        background: 'white',
                                        color: '#f6d365',
                                        '&:hover': { background: '#fff3cd' }
                                    }}
                                    onClick={() => navigate(`/profile/${profile._id}`)}
                                >
                                    View Profile
                                </Button>
                            </motion.div>
                        ))}
                    </Box>

                    {totalShortlisted > 3 && (
                        <Button
                            variant="outlined"
                            sx={{ mt: 3, borderColor: '#ff6b81', color: '#ff6b81' }}
                            onClick={() => navigate('/shortlisted-profiles')}
                        >
                            View All Shortlisted Profiles
                        </Button>
                    )}
                </motion.div>
            )}

            {/* update your prefernces  */}
            <PartnerPreferencesForm userId={user?._id} />

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete your account? This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

};

export default Dashboard;
