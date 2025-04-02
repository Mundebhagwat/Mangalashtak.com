import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Avatar, Typography, Button, Grid, Box, Divider, Link, } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { motion } from "framer-motion";
import axios from "axios";
import { Favorite, Message, Block } from "@mui/icons-material";
import ShortlistButton from "./ProfileChatButton"
import ProfileChatButton from "./ProfileChatButton";


const ProfileDetail = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`https://backend-for-mangalastak.onrender.com/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Fetched Profile:", response.data);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, [userId]);

    if (!profile) return <Typography>Loading...</Typography>;


    return (
        <Container maxWidth="md" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ p: 3, mt: 4, borderRadius: 3, boxShadow: 4 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4} display="flex" justifyContent="center">
                        <Avatar src={profile.profilePicture} alt={profile.fullName} sx={{ width: 150, height: 150, boxShadow: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight={600}>{profile.fullName}</Typography>
                        <Typography variant="body1" color="textSecondary">{profile.age} | {profile.location}</Typography>
                        <Box mt={2}
                            display="flex"
                            justifyContent="center"
                            gap={2}
                            flexWrap="wrap"  >

                            <ShortlistButton profileId={profile?._id} userId={userId} />
                           <ProfileChatButton 
                                userId={userId} 
                                userName={profile.fullName}
                                buttonProps={{
                                    variant: "contained",
                                    startIcon: <MessageIcon />,
                                    color: "primary",
                                    sx: {
                                        mt: 2,
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        p: 1.5,
                                        borderRadius: "50px",
                                        bgcolor: "#2575fc",
                                        "&:hover": { bgcolor: "#6a11cb" },
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Personal Information</Typography>
                        <Typography><strong>Religion:</strong> {profile.religion}</Typography>
                        <Typography><strong>Caste:</strong> {profile.caste}</Typography>
                        <Typography><strong>Bio:</strong> {profile.bio}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Partner Preferences</Typography>
                        {profile.partnerPreferences ? (
                            <>
                                <Typography variant="h6">Age Range: {profile.partnerPreferences.minAge || "N/A"} - {profile.partnerPreferences.maxAge || "N/A"}</Typography>
                                <Typography variant="h6">Location: {profile.partnerPreferences.location || "N/A"}</Typography>
                                <Typography variant="h6">Preferred Gender: {profile.partnerPreferences.
                                    preferredGender || "N/A"}</Typography>
                                <Typography variant="h6">Education: {profile.partnerPreferences.education || "N/A"}</Typography>
                                <Typography variant="h6">Occupation: {profile.partnerPreferences.occupation || "N/A"}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1" sx={{ color: "gray", fontStyle: "italic" }}>
                                No partner preferences added yet.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default ProfileDetail;
