// new dashboard 

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { firestore } from "../pages/firebase"
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore';

// Import all components except NotificationSystem which is now in NavBar
import NavBar from "../compnent/NavBar"; // Import NavBar to use at the top level
import ProfileSection from "../compnent/ProfileSection";
import FindPartnerSection from "../compnent/FindPartnerSection";
import ShortlistedProfilesSection from "../compnent/ShortlistedProfilesSection";
import PartnerPreferencesForm from "../compnent/PartnerPreferences";
import DeleteAccountDialog from "../compnent/DeleteAccountDialog";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDelete, setOpenDelete] = useState(false);
    const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
    const [totalShortlisted, setTotalShortlisted] = useState(0);
    const [notifications, setNotifications] = useState([]);

    // Token handling from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get("token");

        if (!token) {
            token = localStorage.getItem("authToken");
        }

        if (token) {
            const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // 3-hour expiry
            localStorage.setItem("authToken", token);
            localStorage.setItem("authTokenExpiry", expirationTime);

            // Remove token from URL for security
            if (urlParams.get("token")) {
                navigate("/dashboard", { replace: true });
            }
        } else {
            console.log("❌ No token found, redirecting to login...");
            navigate("/login?error=invalid_token", { replace: true });
        }
    }, [navigate]);

    // Fetch user profile data
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

    // Fetch shortlisted profiles
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

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.success("Logged out successfully");
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("authToken");
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
        setOpenDelete(false);
    };

    const updateUserData = (updatedUser) => {
        setUser(updatedUser);
    };

    // Notification handlers
    const markNotificationAsRead = async (notificationId) => {
        try {
            const notificationRef = doc(firestore, 'notifications', notificationId);
            await updateDoc(notificationRef, {
                read: true,
                readAt: new Date()
            });

            setNotifications(prev => prev.filter(n => n.id !== notificationId));
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const navigateToProfile = (userId) => {
        window.location.href = `/profile/${userId}`;
    };

    const navigateToChat = (userId) => {
        window.location.href = `/chat/${userId}`;
    };

    // Set up notification listener
    useEffect(() => {
        if (!user || !firestore) return;

        const notificationsRef = collection(firestore, 'notifications');

        const q = query(
            notificationsRef,
            where('recipientId', '==', user._id),
            where('read', '==', false),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notificationData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
            setNotifications(notificationData);
        }, error => {
            console.error("❌ Error in notification listener:", error);
        });

        return () => unsubscribe();
    }, [user, firestore]);

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            {/* Include NavBar at the top level and pass notification-related props */}
            {/* {user && (
                <NavBar 
                    notifications={notifications}
                    markNotificationAsRead={markNotificationAsRead}
                    currentUserId={user._id}
                    navigateToProfile={navigateToProfile}
                    navigateToChat={navigateToChat}
                    handleLogout={handleLogout}
                />
            )} */}
            
            <Container maxWidth="md" sx={{ mt: 5 }}>
                {user ? (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProfileSection
                            user={user}
                            updateUser={updateUserData}
                            onLogout={handleLogout}
                            onDeleteClick={() => setOpenDelete(true)}
                        />

                        <FindPartnerSection navigate={navigate} />
                        
                        {/* Removed NotificationSystem from here */}

                        {totalShortlisted > 0 && (
                            <ShortlistedProfilesSection
                                profiles={shortlistedProfiles}
                                totalCount={totalShortlisted}
                                navigate={navigate}
                            />
                        )}

                        <PartnerPreferencesForm userId={user._id} />

                        <DeleteAccountDialog
                            open={openDelete}
                            onClose={() => setOpenDelete(false)}
                            onConfirm={handleDeleteAccount}
                        />
                    </motion.div>
                ) : (
                    <div>Loading...</div>
                )}
            </Container>
        </>
    );
};

export default Dashboard;
