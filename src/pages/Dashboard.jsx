
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useRef } from "react";
// import { 
//     Container, 
//     Card, 
//     CardContent, 
//     Typography, 
//     Avatar, 
//     Button, 
//     Box, 
//     CircularProgress, 
//     Paper,
//     TextField,
//     Grid,
//     Divider,
//     Dialog, 
//     DialogTitle, 
//     DialogContent, 
//     DialogActions,
//     IconButton
// } from "@mui/material";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import PartnerPreferencesForm from "../compnent/PartnerPreferences";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editMode, setEditMode] = useState(false);
//     const [updatedData, setUpdatedData] = useState({});
//     const [openDelete, setOpenDelete] = useState(false);
//     const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
//     const [totalShortlisted, setTotalShortlisted] = useState(0);
//     const [imageFile, setImageFile] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const fileInputRef = useRef(null);

//     // do not touch this 
//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         let token = urlParams.get("token");

//         if (!token) {
//             // ✅ If no token in the URL, use localStorage
//             token = localStorage.getItem("authToken");
//         }

//         if (token) {
//             const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // 3-hour expiry
//             localStorage.setItem("authToken", token);
//             localStorage.setItem("authTokenExpiry", expirationTime);

//             // ✅ Remove token from URL for security
//             if (urlParams.get("token")) {
//                 navigate("/dashboard", { replace: true });
//             }
//         } else {
//             console.log("❌ No token found, redirecting to login...");
//             navigate("/login?error=invalid_token", { replace: true });
//         }
//     }, []);
//     // to this line 

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             toast.error("Authentication required. Redirecting to login.");
//             navigate("/login");
//             return;
//         }
//         const fetchUserProfile = async () => {
//             try {
//                 const res = await axios.get("https://backend-for-mangalastak.onrender.com/api/auth/me", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setUser(res.data);
//                 // Initialize updatedData with empty values
//                 setUpdatedData({
//                     fullName: res.data.fullName || "",
//                     phone: res.data.phone || "",
//                     occupation: res.data.occupation || "",
//                     bio: res.data.bio || ""
//                 });
//             } catch {
//                 toast.error("Failed to load user profile");
//                 navigate("/login");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUserProfile();
//     }, [navigate]);

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         const fetchShortlistedProfiles = async () => {
//             try {
//                 const response = await axios.get("https://backend-for-mangalastak.onrender.com/api/users/shortlisted-profiles", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setShortlistedProfiles(response.data.profiles);
//                 setTotalShortlisted(response.data.totalShortlisted);
//             } catch (error) {
//                 console.error("❌ Failed to fetch shortlisted profiles:", error);
//                 console.error("❌ Full Error Response:", error.response?.data || error.message);
//             }
//         };

//         fetchShortlistedProfiles();
//     }, []);

//     const handleEdit = () => {
//         setEditMode(true);
//         // Reset the updatedData when entering edit mode
//         setUpdatedData({
//             fullName: user.fullName || "",
//             phone: user.phone || "",
//             occupation: user.occupation || "",
//             bio: user.bio || ""
//         });
//         setPreviewImage(user.profilePicture);
//     };

//     const handleSave = async () => {
//         const token = localStorage.getItem("authToken");
        
//         try {
//             let finalData = {...updatedData};
            
//             // Handle image upload first if there's a new image
//             if (imageFile) {
//                 const formData = new FormData();
//                 formData.append("profilePicture", imageFile);
                
//                 const imageUploadResponse = await axios.post(
//                     "https://backend-for-mangalastak.onrender.com/api/auth/upload-profile-picture",
//                     formData,
//                     {
//                         headers: { 
//                             Authorization: `Bearer ${token}`,
//                             "Content-Type": "multipart/form-data"
//                         }
//                     }
//                 );
                
//                 // Add the profile picture URL to the updated data
//                 if (imageUploadResponse.data.profilePictureUrl) {
//                     finalData.profilePicture = imageUploadResponse.data.profilePictureUrl;
//                 }
//             }
            
//             // Then update user data
//             const { data } = await axios.put(
//                 "https://backend-for-mangalastak.onrender.com/api/auth/update", 
//                 finalData, 
//                 {
//                     headers: { Authorization: `Bearer ${token}` }
//                 }
//             );
            
//             setUser(data);
//             setEditMode(false);
//             setImageFile(null);
//             toast.success("Profile updated successfully!");
//         } catch (error) {
//             console.error("Update error:", error);
//             toast.error("Failed to update profile");
//         }
//     };

//     const handleImageChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setImageFile(file);
            
//             // Create a preview URL
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleDelete = async () => {
//         const token = localStorage.getItem("authToken");
//         try {
//             await axios.delete("https://backend-for-mangalastak.onrender.com/api/auth/delete", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             toast.success("Account deleted successfully");
//             localStorage.removeItem("authToken");
//             navigate("/register");
//         } catch {
//             toast.error("Failed to delete account");
//         }
//         setOpenDelete(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("authToken");
//         toast.success("Logged out successfully");
//         navigate("/");
//     };

//     const handleCancel = () => {
//         setEditMode(false);
//         setUpdatedData({});
//         setImageFile(null);
//         setPreviewImage(null);
//     };

//     const handleInputChange = (field, value) => {
//         setUpdatedData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     if (loading) {
//         return (
//             <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
//                 <CircularProgress />
//             </Container>
//         );
//     }

//     return (
//         <Container maxWidth="md" sx={{ mt: 5 }}>
//             {user ? (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <Paper 
//                         elevation={6} 
//                         sx={{ 
//                             borderRadius: 3, 
//                             overflow: 'hidden', 
//                             position: 'relative',
//                             mb: 4
//                         }}
//                     >
//                         {/* Decorative top bar */}
//                         <Box 
//                             sx={{ 
//                                 height: 8, 
//                                 background: 'linear-gradient(90deg, #ff6b81, #ff8e53, #ff6b81)',
//                                 backgroundSize: '200% 100%',
//                                 animation: 'gradient 5s ease infinite',
//                                 '@keyframes gradient': {
//                                     '0%': { backgroundPosition: '0% 50%' },
//                                     '50%': { backgroundPosition: '100% 50%' },
//                                     '100%': { backgroundPosition: '0% 50%' }
//                                 }
//                             }} 
//                         />
                        
//                         <Box sx={{ p: 4, textAlign: "center", position: 'relative' }}>
//                             {/* Profile picture with upload option */}
//                             <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
//                                 <Avatar 
//                                     src={editMode ? previewImage : user.profilePicture}
//                                     sx={{ 
//                                         width: 150, 
//                                         height: 150, 
//                                         margin: "auto",
//                                         border: "4px solid #ff6b81",
//                                         boxShadow: '0 4px 20px rgba(255, 107, 129, 0.3)'
//                                     }} 
//                                 />
                                
//                                 {editMode && (
//                                     <>
//                                         <input
//                                             ref={fileInputRef}
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleImageChange}
//                                             style={{ display: 'none' }}
//                                         />
//                                         <IconButton
//                                             onClick={() => fileInputRef.current.click()}
//                                             sx={{
//                                                 position: 'absolute',
//                                                 bottom: 0,
//                                                 right: 0,
//                                                 backgroundColor: '#ff6b81',
//                                                 color: 'white',
//                                                 '&:hover': {
//                                                     backgroundColor: '#ff8e53',
//                                                 }
//                                             }}
//                                         >
//                                             <AddAPhotoIcon />
//                                         </IconButton>
//                                     </>
//                                 )}
//                             </Box>
                            
//                             {editMode ? (
//                                 <Box sx={{ mt: 2 }}>
//                                     <Typography 
//                                         variant="h5" 
//                                         gutterBottom 
//                                         sx={{ 
//                                             fontWeight: 600,
//                                             background: 'linear-gradient(90deg, #ff6b81, #ff8e53)',
//                                             backgroundClip: 'text',
//                                             textFillColor: 'transparent',
//                                             WebkitBackgroundClip: 'text',
//                                             WebkitTextFillColor: 'transparent',
//                                             mb: 3
//                                         }}
//                                     >
//                                         Edit Your Profile
//                                     </Typography>
                                    
//                                     <Grid container spacing={3}>
//                                         <Grid item xs={12} sm={6}>
//                                             <TextField 
//                                                 fullWidth 
//                                                 label="Full Name" 
//                                                 value={updatedData.fullName} 
//                                                 onChange={(e) => handleInputChange('fullName', e.target.value)} 
//                                                 sx={{ 
//                                                     '& .MuiOutlinedInput-root': {
//                                                         borderRadius: 2,
//                                                         '&:hover fieldset': {
//                                                             borderColor: '#ff6b81',
//                                                         },
//                                                     }
//                                                 }}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6}>
//                                             <TextField 
//                                                 fullWidth 
//                                                 label="Email" 
//                                                 value={user.email} 
//                                                 disabled
//                                                 sx={{ 
//                                                     '& .MuiOutlinedInput-root': {
//                                                         borderRadius: 2
//                                                     }
//                                                 }}
//                                             />
//                                         </Grid>
//                                         {user.gender && (
//                                             <Grid item xs={12} sm={6}>
//                                                 <TextField 
//                                                     fullWidth 
//                                                     label="Gender" 
//                                                     value={user.gender} 
//                                                     disabled
//                                                     sx={{ 
//                                                         '& .MuiOutlinedInput-root': {
//                                                             borderRadius: 2
//                                                         }
//                                                     }}
//                                                 />
//                                             </Grid>
//                                         )}
//                                         {user.dateOfBirth && (
//                                             <Grid item xs={12} sm={6}>
//                                                 <TextField 
//                                                     fullWidth 
//                                                     label="Date of Birth" 
//                                                     value={new Date(user.dateOfBirth).toLocaleDateString()} 
//                                                     disabled
//                                                     sx={{ 
//                                                         '& .MuiOutlinedInput-root': {
//                                                             borderRadius: 2
//                                                         }
//                                                     }}
//                                                 />
//                                             </Grid>
//                                         )}
//                                         {/* Fixed phone number update */}
//                                         <Grid item xs={12} sm={6}>
//                                             <TextField 
//                                                 fullWidth 
//                                                 label="Phone" 
//                                                 value={updatedData.phone}
//                                                 onChange={(e) => handleInputChange('phone', e.target.value)}
//                                                 sx={{ 
//                                                     '& .MuiOutlinedInput-root': {
//                                                         borderRadius: 2,
//                                                         '&:hover fieldset': {
//                                                             borderColor: '#ff6b81',
//                                                         },
//                                                     }
//                                                 }}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6}>
//                                             <TextField 
//                                                 fullWidth 
//                                                 label="Occupation" 
//                                                 value={updatedData.occupation}
//                                                 onChange={(e) => handleInputChange('occupation', e.target.value)}
//                                                 sx={{ 
//                                                     '& .MuiOutlinedInput-root': {
//                                                         borderRadius: 2,
//                                                         '&:hover fieldset': {
//                                                             borderColor: '#ff6b81',
//                                                         },
//                                                     }
//                                                 }}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={12}>
//                                             <TextField 
//                                                 fullWidth 
//                                                 label="Bio" 
//                                                 value={updatedData.bio}
//                                                 onChange={(e) => handleInputChange('bio', e.target.value)}
//                                                 multiline 
//                                                 rows={4}
//                                                 sx={{ 
//                                                     '& .MuiOutlinedInput-root': {
//                                                         borderRadius: 2,
//                                                         '&:hover fieldset': {
//                                                             borderColor: '#ff6b81',
//                                                         },
//                                                     }
//                                                 }}
//                                             />
//                                         </Grid>
//                                     </Grid>
                                    
//                                     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
//                                         <Button 
//                                             variant="outlined" 
//                                             onClick={handleCancel}
//                                             sx={{ 
//                                                 borderRadius: 2,
//                                                 borderColor: '#ff6b81',
//                                                 color: '#ff6b81',
//                                                 px: 3,
//                                                 py: 1,
//                                                 '&:hover': {
//                                                     borderColor: '#ff6b81',
//                                                     backgroundColor: 'rgba(255, 107, 129, 0.04)'
//                                                 }
//                                             }}
//                                         >
//                                             Cancel
//                                         </Button>
//                                         <Button 
//                                             variant="contained" 
//                                             onClick={handleSave}
//                                             sx={{ 
//                                                 borderRadius: 2,
//                                                 background: 'linear-gradient(90deg, #ff6b81, #ff8e53)',
//                                                 boxShadow: '0 4px 10px rgba(255, 107, 129, 0.3)',
//                                                 px: 3,
//                                                 py: 1,
//                                                 '&:hover': {
//                                                     boxShadow: '0 6px 15px rgba(255, 107, 129, 0.4)',
//                                                 }
//                                             }}
//                                         >
//                                             Save Changes
//                                         </Button>
//                                     </Box>
//                                 </Box>
//                             ) : (
//                                 <Box>
//                                     <Typography 
//                                         variant="h4" 
//                                         fontWeight="bold" 
//                                         sx={{ 
//                                             color: "#333",
//                                             mb: 1
//                                         }}
//                                     >
//                                         {user.fullName}
//                                     </Typography>
                                    
//                                     <Typography 
//                                         variant="body1" 
//                                         color="text.secondary" 
//                                         sx={{ mb: 1 }}
//                                     >
//                                         {user.email}
//                                     </Typography>
                                    
//                                     {/* Profile details in responsive grid */}
//                                     <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
//                                         {user.gender && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Gender</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">{user.gender}</Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
                                        
//                                         {user.dateOfBirth && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">
//                                                         {new Date(user.dateOfBirth).toLocaleDateString()}
//                                                     </Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
                                        
//                                         {user.phone && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Phone</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">{user.phone}</Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
                                        
//                                         {user.occupation && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Occupation</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">{user.occupation}</Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
                                        
//                                         {user.qualification && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Education</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">{user.qualification}</Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
                                        
//                                         {user.religion && (
//                                             <Grid item xs={6} sm={4}>
//                                                 <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
//                                                     <Typography variant="body2" color="text.secondary">Religion</Typography>
//                                                     <Typography variant="body1" fontWeight="medium">{user.religion}</Typography>
//                                                 </Box>
//                                             </Grid>
//                                         )}
//                                     </Grid>
                                    
//                                     {user.bio && (
//                                         <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)', textAlign: 'left' }}>
//                                             <Typography variant="body2" color="text.secondary" gutterBottom>About Me</Typography>
//                                             <Typography variant="body1">{user.bio}</Typography>
//                                         </Box>
//                                     )}
                                    
//                                     <Divider sx={{ my: 3 }} />
                                    
//                                     <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
//                                         <motion.button
//                                             onClick={handleEdit}
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             style={{
//                                                 background: "linear-gradient(135deg, #ff6b81, #ff8e53)",
//                                                 color: "white",
//                                                 padding: "12px 25px",
//                                                 borderRadius: "8px",
//                                                 fontSize: "16px",
//                                                 fontWeight: "bold",
//                                                 border: "none",
//                                                 cursor: "pointer",
//                                                 boxShadow: '0 4px 10px rgba(255, 107, 129, 0.3)'
//                                             }}
//                                         >
//                                             ✏️ Edit Profile
//                                         </motion.button>
//                                         <motion.button
//                                             onClick={() => setOpenDelete(true)}
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             style={{
//                                                 background: "#ff4757",
//                                                 color: "white",
//                                                 padding: "12px 25px",
//                                                 borderRadius: "8px",
//                                                 fontSize: "16px",
//                                                 fontWeight: "bold",
//                                                 border: "none",
//                                                 cursor: "pointer",
//                                                 boxShadow: '0 4px 10px rgba(255, 71, 87, 0.3)'
//                                             }}
//                                         >
//                                             🗑 Delete Account
//                                         </motion.button>
//                                         <motion.button
//                                             onClick={handleLogout}
//                                             whileHover={{ scale: 1.05 }}
//                                             whileTap={{ scale: 0.95 }}
//                                             style={{
//                                                 background: "#2ed573",
//                                                 color: "white",
//                                                 padding: "12px 25px",
//                                                 borderRadius: "8px",
//                                                 fontSize: "16px",
//                                                 fontWeight: "bold",
//                                                 border: "none",
//                                                 cursor: "pointer",
//                                                 boxShadow: '0 4px 10px rgba(46, 213, 115, 0.3)'
//                                             }}
//                                         >
//                                             🚪 Logout
//                                         </motion.button>
//                                     </Box>
//                                 </Box>
//                             )}
//                         </Box>
//                     </Paper>
//                 </motion.div>
//             ) : (
//                 <Typography>Loading...</Typography>
//             )}

//             {/* Partner Preferences Section */}
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 style={{ marginTop: "30px", textAlign: "center" }}
//             >
//                 <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", mb: 2 }}>
//                     Find Your Perfect Match 💖
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                     Let us help you connect with like-minded people and build something beautiful.
//                 </Typography>

//                 {/* Animated "Find Partner" Button */}
//                 <motion.button
//                     onClick={() => navigate("/find-partner")}
//                     whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 105, 180, 0.8)" }}
//                     whileTap={{ scale: 0.95 }}
//                     style={{
//                         background: "linear-gradient(135deg, #ff6b81, #ff8e53)",
//                         color: "white",
//                         border: "none",
//                         padding: "15px 30px",
//                         borderRadius: "50px",
//                         fontSize: "18px",
//                         fontWeight: "bold",
//                         cursor: "pointer",
//                         transition: "0.3s",
//                     }}
//                 >
//                     🔍 Find Partner
//                 </motion.button>
//             </motion.div>

//             {/* New Shortlisted Profiles Section (add after "Find Partner" section) */}
//             {totalShortlisted > 0 && (
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     style={{ marginTop: "40px", textAlign: "center" }}
//                 >
//                     <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", mb: 3 }}>
//                         Your Shortlisted Profiles 💕 ({totalShortlisted})
//                     </Typography>

//                     <Box
//                         sx={{
//                             display: 'flex',
//                             overflowX: 'auto',
//                             gap: 2,
//                             pb: 2,
//                             '&::-webkit-scrollbar': { display: 'none' }
//                         }}
//                     >
//                         {shortlistedProfiles.map(profile => (
//                             <motion.div
//                                 key={profile._id}
//                                 whileHover={{ scale: 1.05 }}
//                                 style={{
//                                     minWidth: '250px',
//                                     background: 'linear-gradient(145deg, #f6d365 0%, #fda085 100%)',
//                                     borderRadius: '15px',
//                                     padding: '20px',
//                                     color: 'white',
//                                     boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
//                                 }}
//                             >
//                                 <Avatar
//                                     src={profile.profilePicture}
//                                     sx={{
//                                         width: 100,
//                                         height: 100,
//                                         margin: 'auto',
//                                         border: '3px solid white'
//                                     }}
//                                 />
//                                 <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
//                                     {profile.fullName}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                                     {profile.age} | {profile.location}
//                                 </Typography>
//                                 <Button
//                                     variant="contained"
//                                     sx={{
//                                         mt: 2,
//                                         background: 'white',
//                                         color: '#f6d365',
//                                         '&:hover': { background: '#fff3cd' }
//                                     }}
//                                     onClick={() => navigate(`/profile/${profile._id}`)}
//                                 >
//                                     View Profile
//                                 </Button>
//                             </motion.div>
//                         ))}
//                     </Box>

//                     {totalShortlisted > 3 && (
//                         <Button
//                             variant="outlined"
//                             sx={{ mt: 3, borderColor: '#ff6b81', color: '#ff6b81' }}
//                             onClick={() => navigate('/shortlisted-profiles')}
//                         >
//                             View All Shortlisted Profiles
//                         </Button>
//                     )}
//                 </motion.div>
//             )}

//             {/* update your prefernces  */}
//             <PartnerPreferencesForm userId={user?._id} />

//             {/* Delete Confirmation Dialog */}
//             <Dialog 
//                 open={openDelete} 
//                 onClose={() => setOpenDelete(false)}
//                 sx={{
//                     '& .MuiPaper-root': {
//                         borderRadius: 3,
//                         boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
//                         p: 1
//                     }
//                 }}
//             >
//                 <DialogTitle sx={{ fontWeight: 600, color: '#ff4757' }}>Confirm Account Deletion</DialogTitle>
//                 <DialogContent>
//                     <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
//                 </DialogContent>
//                 <DialogActions sx={{ p: 2 }}>
//                     <Button 
//                         onClick={() => setOpenDelete(false)}
//                         sx={{ 
//                             borderRadius: 2,
//                             px: 3
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                     <Button 
//                         color="error" 
//                         onClick={handleDelete}
//                         variant="contained"
//                         sx={{ 
//                             borderRadius: 2,
//                             bgcolor: '#ff4757',
//                             px: 3,
//                             '&:hover': {
//                                 bgcolor: '#ff5e6a'
//                             }
//                         }}
//                     >
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default Dashboard;




// new divided section dashboard 


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

// Import all the new components
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
                    <ProfileSection 
                        user={user} 
                        updateUser={updateUserData} 
                        onLogout={handleLogout}
                        onDeleteClick={() => setOpenDelete(true)}
                    />
                    
                    <FindPartnerSection navigate={navigate} />
                    
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
    );
};

export default Dashboard;
