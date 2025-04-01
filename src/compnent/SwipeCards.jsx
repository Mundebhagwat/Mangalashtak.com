import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const SendRequestPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:5000/api/users/potential-matches", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfiles(response.data);
            } catch (error) {
                console.error("Error fetching profiles", error);
            }
        };

        const fetchSentRequests = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:5000/api/users/sent-requests", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setSentRequests(response.data.sentRequests.map((id) => String(id))); // Ensure all IDs are strings
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sent requests", error);
                setLoading(false);
            }
        };

        fetchProfiles();
        fetchSentRequests();
    }, []);

    const handleSendRequest = async (profileId) => {
        try {
            const token = localStorage.getItem("authToken");
            await axios.post(
                `http://localhost:5000/api/users/send-request/${profileId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSentRequests((prev) => [...prev, String(profileId)]); // Convert to string for consistency
            toast.success("💖 Request Sent!", { position: "bottom-center" });
        } catch (error) {
            console.error("Failed to send request:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(`❌ ${errorMessage}`, { position: "bottom-center" });
        }
    };

    const handleCancelRequest = async (profileId) => {
        try {
            const token = localStorage.getItem("authToken");
            await axios.post(
                `http://localhost:5000/api/users/cancel-request/${profileId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSentRequests((prev) => prev.filter((id) => id !== String(profileId))); // Remove request from state
            toast.success("🚫 Request Canceled!", { position: "bottom-center" });
        } catch (error) {
            console.error("Failed to cancel request:", error);
            toast.error("Failed to cancel request");
        }
    };

    if (loading) return <Typography>Loading...</Typography>; // Prevent rendering before data loads

    return (
        <Box sx={{ textAlign: "center", py: 5, px: 3, background: "linear-gradient(to right, #ff9966, #ff5e62)", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff", mb: 4, textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>
                Find Your Perfect Match 💖
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={profile._id}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card sx={{ borderRadius: 3, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)", transition: "all 0.3s ease-in-out", overflow: "hidden", "&:hover": { boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)" } }}>
                                    <CardMedia component="img" height="250" image={profile.profilePicture} alt={profile.fullName} />
                                    <CardContent sx={{ textAlign: "center", color: "#fff" }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {profile.fullName}, {profile.age}
                                        </Typography>
                                        <Typography variant="body2">{profile.location}</Typography>

                                        {sentRequests.includes(String(profile._id)) ? (
                                            <Button onClick={() => handleCancelRequest(profile._id)} variant="contained" sx={{ mt: 2, bgcolor: "#ff4444" }}>
                                                ❌ Cancel Request
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleSendRequest(profile._id)} variant="contained" sx={{ mt: 2, bgcolor: "#4CAF50" }}>
                                                💌 Send Request
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))
                ) : (
                    <Typography>No profiles found.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default SendRequestPage;
