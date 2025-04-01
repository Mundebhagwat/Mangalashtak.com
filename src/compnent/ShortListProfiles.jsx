// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// const ShortlistButton = ({ profileId, userId }) => {
//     const [isShortlisted, setIsShortlisted] = useState(false);

//     useEffect(() => {
//     const fetchShortlistStatus = async () => {
//         try {
//             const token = localStorage.getItem("authToken"); // Ensure authentication
//             const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             if (response.data && response.data.shortlistedProfiles) {
//                 // Convert ObjectIds to strings before checking
//                 const shortlistedIds = response.data.shortlistedProfiles.map(id => id.toString());
//                 setIsShortlisted(shortlistedIds.includes(profileId));
//             }
            
//         } catch (error) {
//             console.error("Error fetching shortlist status", error);
//         }
//     };

//     fetchShortlistStatus();
// }, [profileId, userId]);


//     const handleShortlistToggle = async () => {
//         try {
//             const response = await axios.put(
//                 `http://localhost:5000/api/users/shortlist/${profileId}`,
//                 {},
//                 {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//                 }
//             );
//             setIsShortlisted(!isShortlisted);
//             toast.success(response.data.message);
//         } catch (error) {
//             console.error("Error updating shortlist", error);
//             toast.error("Failed to update shortlist");
//         }
//     };

//     return (
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <Button
//                 variant="contained"
//                 color={isShortlisted ? "error" : "primary"}
//                 onClick={handleShortlistToggle}
//                 startIcon={isShortlisted ? <Favorite /> : <FavoriteBorder />}
//                 sx={{ borderRadius: 8, fontWeight: "bold", padding: "10px 20px" }}
//             >
//                 {isShortlisted ? "Shortlisted" : "Shortlist"}
//             </Button>
//         </motion.div>
//     );
// };

// export default ShortlistButton;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// const ShortlistButton = ({ profileId, userId }) => {
//     const [isShortlisted, setIsShortlisted] = useState(true);

//     console.log(profileId);

//     // Fetch shortlist status when the component loads
//     useEffect(() => {
//         const fetchShortlistStatus = async () => {
//             try {
//                 const token = localStorage.getItem("authToken");
//                 const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.data && response.data.shortlistedProfiles) {
//                     setIsShortlisted(
//                         response.data.shortlistedProfiles.some(id => id.toString() === profileId)
//                     );
//                 }
//             } catch (error) {
//                 console.error("Error fetching shortlist status", error);
//             }
//         };

//         fetchShortlistStatus();
//     }, [profileId, userId]);

//     const handleShortlistToggle = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await axios.put(
//                 `http://localhost:5000/api/users/shortlist/${profileId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log(response.data);

//             // 🔥 **Fix: Use backend response to update state correctly**
//             if (response.data.shortlistedProfiles.includes(profileId)) {
//                 setIsShortlisted(true);
//                 toast.success("Profile added to shortlist");
//             } else {
//                 setIsShortlisted(false);
//                 toast.info("Profile removed from shortlist");
//             }

            

//         } catch (error) {
//             console.error("Error updating shortlist", error);
//             toast.error("Failed to update shortlist");
//         }
//     };

//     return (
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <Button
//                 variant="contained"
//                 color={isShortlisted ? "error" : "primary"}
//                 onClick={handleShortlistToggle}
//                 startIcon={isShortlisted ? <Favorite /> : <FavoriteBorder />}
//                 sx={{ borderRadius: 8, fontWeight: "bold", padding: "10px 20px" }}
//             >
//                 {isShortlisted ? "Shortlisted" : "Shortlist"}
//             </Button>
//         </motion.div>
//     );
// };

// export default ShortlistButton;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, CircularProgress } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// const ShortlistButton = ({ profileId, userId }) => {
//     const [isShortlisted, setIsShortlisted] = useState(null); // Null to handle loading state
//     const [loading, setLoading] = useState(true);

//     console.log("Profile ID:", profileId);

//     // Fetch shortlist status when the component loads
//     useEffect(() => {
//         const fetchShortlistStatus = async () => {
//             try {
//                 const token = localStorage.getItem("authToken");
//                 const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.data && Array.isArray(response.data.shortlistedProfiles)) {
//                     const isListed = response.data.shortlistedProfiles.includes(profileId);
//                     console.log(`Profile ${profileId} is in shortlist:`, isListed);
//                     setIsShortlisted(isListed);
//                 }
//             } catch (error) {
//                 console.error("Error fetching shortlist status", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchShortlistStatus(); // Call the function on mount
//     }, [profileId, userId]);

//     const handleShortlistToggle = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem("authToken");
//             const response = await axios.put(
//                 `http://localhost:5000/api/users/shortlist/${profileId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log("Shortlist Response:", response.data);

//             // Confirm state with backend response
//             setIsShortlisted(response.data.shortlistedProfiles.includes(profileId));
//             toast.success(response.data.message);
//         } catch (error) {
//             console.error("Error updating shortlist", error);
//             toast.error("Failed to update shortlist");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <Button
//                 variant="contained"
//                 sx={{
//                     backgroundColor: isShortlisted ? "#ff9800" : "#4caf50",
//                     color: "white",
//                     borderRadius: 8,
//                     fontWeight: "bold",
//                     padding: "10px 20px",
//                     '&:hover': {
//                         backgroundColor: isShortlisted ? "#e68900" : "#388e3c",
//                     }
//                 }}
//                 onClick={handleShortlistToggle} // Click event to toggle
//                 startIcon={loading ? <CircularProgress size={20} color="inherit" /> : (isShortlisted ? <Favorite /> : <FavoriteBorder />)}
//                 disabled={loading} // Disable button when loading
//             >
//                 {loading ? "Loading..." : (isShortlisted ? "Shortlisted" : "Shortlist")}
//             </Button>
//         </motion.div>
//     );
// };

// export default ShortlistButton;



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
                    `http://localhost:5000/api/users/shortlist-status/${profileId}`, 
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
                `http://localhost:5000/api/users/shortlist/${profileId}`,
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