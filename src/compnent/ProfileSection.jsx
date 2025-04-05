import React, { useState, useRef } from "react";
import { 
    Typography, 
    Avatar, 
    Box, 
    Paper,
    TextField,
    Grid,
    Divider,
    Button,
    IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfileSection = ({ user, updateUser, onLogout, onDeleteClick }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        fullName: user.fullName || "",
        phone: user.phone || "",
        occupation: user.occupation || "",
        bio: user.bio || ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleEdit = () => {
        setEditMode(true);
        setUpdatedData({
            fullName: user.fullName || "",
            phone: user.phone || "",
            occupation: user.occupation || "",
            bio: user.bio || ""
        });
        setPreviewImage(user.profilePicture);
    };

    const handleSave = async () => {
        const token = localStorage.getItem("authToken");
        
        try {
            let finalData = {...updatedData};
            
            // Handle image upload first if there's a new image
            if (imageFile) {
                const formData = new FormData();
                formData.append("profilePicture", imageFile);
                
                const imageUploadResponse = await axios.post(
                    "https://backend-for-mangalastak.onrender.com/api/auth/upload-profile-picture",
                    formData,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                
                // Add the profile picture URL to the updated data
                if (imageUploadResponse.data.profilePictureUrl) {
                    finalData.profilePicture = imageUploadResponse.data.profilePictureUrl;
                }
            }
            
            // Then update user data
            const { data } = await axios.put(
                "https://backend-for-mangalastak.onrender.com/api/auth/update", 
                finalData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            updateUser(data);
            setEditMode(false);
            setImageFile(null);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update profile");
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setUpdatedData({});
        setImageFile(null);
        setPreviewImage(null);
    };

    const handleInputChange = (field, value) => {
        setUpdatedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Paper 
            elevation={6} 
            sx={{ 
                borderRadius: 3, 
                overflow: 'hidden', 
                position: 'relative',
                mb: 4
            }}
        >
            {/* Decorative top bar */}
            <Box 
                sx={{ 
                    height: 8, 
                    background: 'linear-gradient(90deg, #ff6b81, #ff8e53, #ff6b81)',
                    backgroundSize: '200% 100%',
                    animation: 'gradient 5s ease infinite',
                    '@keyframes gradient': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' }
                    }
                }} 
            />
            
            <Box sx={{ p: 4, textAlign: "center", position: 'relative' }}>
                {/* Profile picture with upload option */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                    <Avatar 
                        src={editMode ? previewImage : user.profilePicture}
                        sx={{ 
                            width: 150, 
                            height: 150, 
                            margin: "auto",
                            border: "4px solid #ff6b81",
                            boxShadow: '0 4px 20px rgba(255, 107, 129, 0.3)'
                        }} 
                    />
                    
                    {editMode && (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <IconButton
                                onClick={() => fileInputRef.current.click()}
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: '#ff6b81',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#ff8e53',
                                    }
                                }}
                            >
                                <AddAPhotoIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
                
                {editMode ? (
                    <Box sx={{ mt: 2 }}>
                        <Typography 
                            variant="h5" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 600,
                                background: 'linear-gradient(90deg, #ff6b81, #ff8e53)',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3
                            }}
                        >
                            Edit Your Profile
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Full Name" 
                                    value={updatedData.fullName} 
                                    onChange={(e) => handleInputChange('fullName', e.target.value)} 
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#ff6b81',
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Email" 
                                    value={user.email} 
                                    disabled
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                />
                            </Grid>
                            {user.gender && (
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        fullWidth 
                                        label="Gender" 
                                        value={user.gender} 
                                        disabled
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                </Grid>
                            )}
                            {user.dateOfBirth && (
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        fullWidth 
                                        label="Date of Birth" 
                                        value={new Date(user.dateOfBirth).toLocaleDateString()} 
                                        disabled
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Phone" 
                                    value={updatedData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#ff6b81',
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Occupation" 
                                    value={updatedData.occupation}
                                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#ff6b81',
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label="Bio" 
                                    value={updatedData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    multiline 
                                    rows={4}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#ff6b81',
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                            <Button 
                                variant="outlined" 
                                onClick={handleCancel}
                                sx={{ 
                                    borderRadius: 2,
                                    borderColor: '#ff6b81',
                                    color: '#ff6b81',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        borderColor: '#ff6b81',
                                        backgroundColor: 'rgba(255, 107, 129, 0.04)'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={handleSave}
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(90deg, #ff6b81, #ff8e53)',
                                    boxShadow: '0 4px 10px rgba(255, 107, 129, 0.3)',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        boxShadow: '0 6px 15px rgba(255, 107, 129, 0.4)',
                                    }
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Typography 
                            variant="h4" 
                            fontWeight="bold" 
                            sx={{ 
                                color: "#333",
                                mb: 1
                            }}
                        >
                            {user.fullName}
                        </Typography>
                        
                        <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ mb: 1 }}
                        >
                            {user.email}
                        </Typography>
                        
                        {/* Profile details in responsive grid */}
                        <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
                            {user.gender && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Gender</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.gender}</Typography>
                                    </Box>
                                </Grid>
                            )}
                            
                            {user.dateOfBirth && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                                        <Typography variant="body1" fontWeight="medium">
                                            {new Date(user.dateOfBirth).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                            
                            {user.phone && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Phone</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.phone}</Typography>
                                    </Box>
                                </Grid>
                            )}
                            
                            {user.occupation && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Occupation</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.occupation}</Typography>
                                    </Box>
                                </Grid>
                            )}
                            
                            {user.qualification && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Education</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.qualification}</Typography>
                                    </Box>
                                </Grid>
                            )}
                            
                            {user.religion && (
                                <Grid item xs={6} sm={4}>
                                    <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)' }}>
                                        <Typography variant="body2" color="text.secondary">Religion</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.religion}</Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                        
                        {user.bio && (
                            <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(255, 107, 129, 0.05)', textAlign: 'left' }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>About Me</Typography>
                                <Typography variant="body1">{user.bio}</Typography>
                            </Box>
                        )}
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <motion.button
                                onClick={handleEdit}
                                whileHover={{ scale: 1.05 }}
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
                                    boxShadow: '0 4px 10px rgba(255, 107, 129, 0.3)'
                                }}
                            >
                                ✏️ Edit Profile
                            </motion.button>
                            <motion.button
                                onClick={onDeleteClick}
                                whileHover={{ scale: 1.05 }}
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
                                    boxShadow: '0 4px 10px rgba(255, 71, 87, 0.3)'
                                }}
                            >
                                🗑 Delete Account
                            </motion.button>
                            <motion.button
                                onClick={onLogout}
                                whileHover={{ scale: 1.05 }}
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
                                    boxShadow: '0 4px 10px rgba(46, 213, 115, 0.3)'
                                }}
                            >
                                🚪 Logout
                            </motion.button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default ProfileSection;