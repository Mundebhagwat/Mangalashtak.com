import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const FindPartnerSection = ({ navigate }) => {
    return (
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
    );
};

export default FindPartnerSection;