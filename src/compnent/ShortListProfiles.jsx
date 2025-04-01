import { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ShortlistButton = ({ profileId, userId }) => {
    const [isShortlisted, setIsShortlisted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkShortlistStatus = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(
                    `https://backend-for-mangalastak.onrender.com/api/users/shortlist-status/${profileId}`, 
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                // Directly set the shortlist status from backend
                setIsShortlisted(response.data.isShortlisted);
            } catch (error) {
                console.error("Error checking shortlist status", error);
                toast.error("Failed to check shortlist status");
            } finally {
                setLoading(false);
            }
        };

        checkShortlistStatus();
    }, [profileId]);

    const handleShortlistToggle = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const response = await axios.put(
                `https://backend-for-mangalastak.onrender.com/api/users/shortlist/${profileId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Toggle the shortlist status based on backend response
            setIsShortlisted(response.data.isShortlisted);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating shortlist", error);
            toast.error("Failed to update shortlist");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: isShortlisted ? "#ff9800" : "#4caf50",
                    color: "white",
                    borderRadius: 8,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    '&:hover': {
                        backgroundColor: isShortlisted ? "#e68900" : "#388e3c",
                    }
                }}
                onClick={handleShortlistToggle}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : (isShortlisted ? <Favorite /> : <FavoriteBorder />)}
                disabled={loading}
            >
                {loading ? "Loading..." : (isShortlisted ? "Shortlisted" : "Shortlist")}
            </Button>
        </motion.div>
    );
};

export default ShortlistButton;