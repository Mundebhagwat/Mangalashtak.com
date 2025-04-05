import React from "react";
import { Typography, Box, Avatar, Button } from "@mui/material";
import { motion } from "framer-motion";

const ShortlistedProfilesSection = ({ profiles, totalCount, navigate }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: "40px", textAlign: "center" }}
        >
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", mb: 3 }}>
                Your Shortlisted Profiles 💕 ({totalCount})
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
                {profiles.map(profile => (
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

            {totalCount > 3 && (
                <Button
                    variant="outlined"
                    sx={{ mt: 3, borderColor: '#ff6b81', color: '#ff6b81' }}
                    onClick={() => navigate('/shortlisted-profiles')}
                >
                    View All Shortlisted Profiles
                </Button>
            )}
        </motion.div>
    );
};

export default ShortlistedProfilesSection;