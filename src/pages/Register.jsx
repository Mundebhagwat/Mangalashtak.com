// import React, { useState } from "react";
// import { Container, TextField, Button, Typography, Box, MenuItem, Avatar } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",
//     gender: "",
//     dateOfBirth: "",
//     religion: "",
//     caste: "",
//     location: "",
//     bio: "",
//     profilePicture: "",
//   });
//   const [profilePreview, setProfilePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       await uploadImage(file);
//     }
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "My Preset");
//     try {
//       const res = await axios.post("https://api.cloudinary.com/v1_1/dbqjo8ncc/image/upload", formData);
//       const uploadedUrl = res.data.secure_url;
//       setFormData((prevData) => ({
//         ...prevData,
//         profilePicture: uploadedUrl
//       }));

//       return uploadedUrl;

//     } catch (err) {
//       toast.error("Image upload failed");
//       console.error(err);
//       return "";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Validate password length before sending request
//     if (formData.password.length < 3) {
//       toast.error("Password must be at least 3 characters long");
//       setLoading(false);
//       return;
//     }

//     try {
//       let profilePictureUrl = formData.profilePicture;

//       // If a new image is selected, upload it first
//       if (profilePreview && !formData.profilePicture) {
//         const uploadedUrl = await uploadImage(profilePreview);
//         profilePictureUrl = uploadedUrl;
//       }
//       await axios.post("https://backend-for-mangalastak.onrender.com/api/auth/register", {
//         ...formData,
//         profilePicture: profilePictureUrl,
//       });

//       // Redirect to login after registration
//       toast.success("Registration successful! Please verify your email.");
//       navigate("/login");
//     } catch (error) {
//       if (error.response && error.response.data.message === "Email already exists") {
//         toast.error("This email is already registered. Try another one.");
//         if(error.response && error.response.data.message === "Invalid date of birth. Cannot be in the future."){
//           toast.error("Invalid date of birth. Cannot be in the future.")
//         }
//       } else {
//         console.log(error.message);
//         toast.error("Something went wrong. Please try again.");
//       }
//     } 
//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
//         <Typography variant="h5" gutterBottom>
//           Register
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
//           <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} margin="normal" required>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </TextField>
//           <TextField fullWidth type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Religion" name="religion" value={formData.religion} onChange={handleChange} margin="normal" />
//           <TextField fullWidth label="Caste" name="caste" value={formData.caste} onChange={handleChange} margin="normal" />
//           <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Bio" name="bio" value={formData.bio} onChange={handleChange} margin="normal" multiline rows={3} />
//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             {profilePreview && <Avatar src={profilePreview} sx={{ width: 80, height: 80, margin: "auto" }} />}
//           </Box>
//           <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
//             Upload Profile Picture
//             <input type="file" hidden name="profilePicture" accept="image/*" onChange={handleFileChange} />
//           </Button>
//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  MenuItem, 
  Avatar,
  Paper
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeIcon from '@mui/icons-material/Home'; // Import the home icon

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    caste: "",
    location: "",
    bio: "",
    profilePicture: "",
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "My Preset");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dbqjo8ncc/image/upload", formData);
      const uploadedUrl = res.data.secure_url;
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: uploadedUrl
      }));

      return uploadedUrl;

    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate password length before sending request
    if (formData.password.length < 3) {
      toast.error("Password must be at least 3 characters long");
      setLoading(false);
      return;
    }

    try {
      let profilePictureUrl = formData.profilePicture;

      // If a new image is selected, upload it first
      if (profilePreview && !formData.profilePicture) {
        const uploadedUrl = await uploadImage(profilePreview);
        profilePictureUrl = uploadedUrl;
      }
      await axios.post("https://backend-for-mangalastak.onrender.com/api/auth/register", {
        ...formData,
        profilePicture: profilePictureUrl,
      });

      // Redirect to login after registration
      toast.success("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message === "Email already exists") {
        toast.error("This email is already registered. Try another one.");
        if(error.response && error.response.data.message === "Invalid date of birth. Cannot be in the future."){
          toast.error("Invalid date of birth. Cannot be in the future.")
        }
      } else {
        console.log(error.message);
        toast.error("Something went wrong. Please try again.");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ mt: 5, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        {/* Decorative top bar */}
        <Box 
          sx={{ 
            height: 8, 
            background: 'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
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
          {/* Home button */}
          <Button 
            startIcon={<HomeIcon />}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 16,
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}
            onClick={() => navigate('/')}
          >
            Home
          </Button>

          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              mb: 3,
              mt: 2,
              background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create Account
          </Typography>
          
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Please fill in your details to register
          </Typography>
          
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Full Name" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              select 
              fullWidth 
              label="Gender" 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              margin="normal" 
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" align="left" sx={{ mb: 1, ml: 1 }}>Date of Birth</Typography>
              <TextField 
                fullWidth 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                required 
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  }
                }}
              />
            </Box>
            
            <TextField 
              fullWidth 
              label="Religion" 
              name="religion" 
              value={formData.religion} 
              onChange={handleChange} 
              margin="normal"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Caste" 
              name="caste" 
              value={formData.caste} 
              onChange={handleChange} 
              margin="normal"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              margin="normal" 
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <TextField 
              fullWidth 
              label="Bio" 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              margin="normal" 
              multiline 
              rows={3}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                }
              }}
            />
            
            <Box sx={{ textAlign: "center", mt: 2, mb: 3 }}>
              {profilePreview && (
                <Avatar 
                  src={profilePreview} 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: "auto",
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '3px solid #1976d2'
                  }} 
                />
              )}
            </Box>
            
            <Button 
              variant="outlined" 
              component="label" 
              fullWidth 
              sx={{ 
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              Upload Profile Picture
              <input type="file" hidden name="profilePicture" accept="image/*" onChange={handleFileChange} />
            </Button>
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                },
              }}
            >
              {loading ? "Registering..." : "Create Account"}
            </Button>
            
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => navigate('/login')} 
              sx={{ 
                mt: 2,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              Already have an account? Sign in
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
