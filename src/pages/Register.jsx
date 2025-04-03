// import React, { useState } from "react";
// import { 
//   Container, 
//   TextField, 
//   Button, 
//   Typography, 
//   Box, 
//   MenuItem, 
//   Avatar,
//   Paper
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import HomeIcon from '@mui/icons-material/Home'; // Import the home icon

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
//     <Container maxWidth="md">
//       <Paper elevation={6} sx={{ mt: 5, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
//         {/* Decorative top bar */}
//         <Box 
//           sx={{ 
//             height: 8, 
//             background: 'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
//             backgroundSize: '200% 100%',
//             animation: 'gradient 5s ease infinite',
//             '@keyframes gradient': {
//               '0%': { backgroundPosition: '0% 50%' },
//               '50%': { backgroundPosition: '100% 50%' },
//               '100%': { backgroundPosition: '0% 50%' }
//             }
//           }} 
//         />

//         <Box sx={{ p: 4, textAlign: "center", position: 'relative' }}>
//           {/* Home button */}
//           <Button 
//             startIcon={<HomeIcon />}
//             variant="outlined"
//             color="primary"
//             size="small"
//             sx={{ 
//               position: 'absolute', 
//               top: 10, 
//               left: 16,
//               borderRadius: 2,
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//               }
//             }}
//             onClick={() => navigate('/')}
//           >
//             Home
//           </Button>

//           <Typography 
//             variant="h4" 
//             gutterBottom 
//             sx={{ 
//               fontWeight: 600,
//               mb: 3,
//               mt: 2,
//               background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
//               backgroundClip: 'text',
//               textFillColor: 'transparent',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Create Account
//           </Typography>
          
//           <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
//             Please fill in your details to register
//           </Typography>
          
//           {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          
//           <form onSubmit={handleSubmit}>
//             <TextField 
//               fullWidth 
//               label="Full Name" 
//               name="fullName" 
//               value={formData.fullName} 
//               onChange={handleChange} 
//               margin="normal" 
//               required 
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Email" 
//               type="email" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleChange} 
//               margin="normal" 
//               required 
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Password" 
//               type="password" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleChange} 
//               margin="normal" 
//               required 
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Phone" 
//               name="phone" 
//               value={formData.phone} 
//               onChange={handleChange} 
//               margin="normal" 
//               required 
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               select 
//               fullWidth 
//               label="Gender" 
//               name="gender" 
//               value={formData.gender} 
//               onChange={handleChange} 
//               margin="normal" 
//               required
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             >
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>
            
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="body2" align="left" sx={{ mb: 1, ml: 1 }}>Date of Birth</Typography>
//               <TextField 
//                 fullWidth 
//                 type="date" 
//                 name="dateOfBirth" 
//                 value={formData.dateOfBirth} 
//                 onChange={handleChange} 
//                 required 
//                 sx={{ 
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     '&:hover fieldset': {
//                       borderColor: '#1976d2',
//                     },
//                   }
//                 }}
//               />
//             </Box>
            
//             <TextField 
//               fullWidth 
//               label="Religion" 
//               name="religion" 
//               value={formData.religion} 
//               onChange={handleChange} 
//               margin="normal"
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Caste" 
//               name="caste" 
//               value={formData.caste} 
//               onChange={handleChange} 
//               margin="normal"
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Location" 
//               name="location" 
//               value={formData.location} 
//               onChange={handleChange} 
//               margin="normal" 
//               required
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <TextField 
//               fullWidth 
//               label="Bio" 
//               name="bio" 
//               value={formData.bio} 
//               onChange={handleChange} 
//               margin="normal" 
//               multiline 
//               rows={3}
//               sx={{ 
//                 mb: 3,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   '&:hover fieldset': {
//                     borderColor: '#1976d2',
//                   },
//                 }
//               }}
//             />
            
//             <Box sx={{ textAlign: "center", mt: 2, mb: 3 }}>
//               {profilePreview && (
//                 <Avatar 
//                   src={profilePreview} 
//                   sx={{ 
//                     width: 100, 
//                     height: 100, 
//                     margin: "auto",
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                     border: '3px solid #1976d2'
//                   }} 
//                 />
//               )}
//             </Box>
            
//             <Button 
//               variant="outlined" 
//               component="label" 
//               fullWidth 
//               sx={{ 
//                 mb: 3,
//                 py: 1.5,
//                 borderRadius: 2,
//                 borderWidth: 2,
//                 '&:hover': {
//                   borderWidth: 2,
//                 }
//               }}
//             >
//               Upload Profile Picture
//               <input type="file" hidden name="profilePicture" accept="image/*" onChange={handleFileChange} />
//             </Button>
            
//             <Button 
//               type="submit" 
//               variant="contained" 
//               color="primary" 
//               fullWidth 
//               disabled={loading}
//               sx={{ 
//                 py: 1.5,
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 fontSize: '1rem',
//                 fontWeight: 600,
//                 boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
//                 transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
//                 },
//               }}
//             >
//               {loading ? "Registering..." : "Create Account"}
//             </Button>
            
//             <Button 
//               variant="text" 
//               color="primary" 
//               onClick={() => navigate('/login')} 
//               sx={{ 
//                 mt: 2,
//                 textTransform: 'none',
//                 '&:hover': {
//                   background: 'rgba(25, 118, 210, 0.08)'
//                 }
//               }}
//             >
//               Already have an account? Sign in
//             </Button>
//           </form>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Register;


// new updated code for registration form 


import React, { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  MenuItem, 
  Avatar,
  Paper,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeIcon from '@mui/icons-material/Home';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    religion: "Hindu",
    caste: "",
    rashi: "",
    gothra: "",
    bloodGroup: "",
    color: "",
    height: "",
    weight: "",
    motherTongue: "",
    qualification: "",
    occupation: "",
    annualIncome: "",
    permanentAddress: "",
    currentAddress: "",
    bio: "",
    profilePicture: "",
    aadharCardPhoto: "",
  });
  
  const [profilePreview, setProfilePreview] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fileType === "profile") {
          setProfilePreview(reader.result);
        } else if (fileType === "aadhar") {
          setAadharPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      await uploadImage(file, fileType);
    }
  };

  const uploadImage = async (file, fileType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "My Preset");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dbqjo8ncc/image/upload", formData);
      const uploadedUrl = res.data.secure_url;
      
      if (fileType === "profile") {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: uploadedUrl
        }));
      } else if (fileType === "aadhar") {
        setFormData((prevData) => ({
          ...prevData,
          aadharCardPhoto: uploadedUrl
        }));
      }

      return uploadedUrl;

    } catch (err) {
      toast.error(`${fileType === "profile" ? "Profile" : "Aadhar card"} image upload failed`);
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
      let aadharCardPhotoUrl = formData.aadharCardPhoto;

      // If a new image is selected, upload it first
      if (profilePreview && !formData.profilePicture) {
        profilePictureUrl = await uploadImage(profilePreview, "profile");
      }
      
      if (aadharPreview && !formData.aadharCardPhoto) {
        aadharCardPhotoUrl = await uploadImage(aadharPreview, "aadhar");
      }
      
      await axios.post("https://backend-for-mangalastak.onrender.com/api/auth/register", {
        ...formData,
        profilePicture: profilePictureUrl,
        aadharCardPhoto: aadharCardPhotoUrl,
      });

      // Redirect to login after registration
      toast.success("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message === "Email already exists") {
        toast.error("This email is already registered. Try another one.");
      } else if(error.response && error.response.data.message === "Invalid date of birth. Cannot be in the future.") {
        toast.error("Invalid date of birth. Cannot be in the future.");
      } else {
        console.log(error.message);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Options for dropdown menus
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const qualificationOptions = ["High School", "Diploma", "Bachelor's", "Master's", "Ph.D.", "Other"];
  const rashiOptions = ["Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)", "Kark (Cancer)", 
                        "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchik (Scorpio)", 
                        "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbh (Aquarius)", "Meen (Pisces)"];

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ mt: 5, mb: 5, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
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
            Vanjari Vivah Registration
          </Typography>
          
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Please fill in your details to register
          </Typography>
          
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                align="left" 
                sx={{ 
                  mb: 2, 
                  borderBottom: '2px solid #1976d2', 
                  pb: 1, 
                  color: '#1976d2' 
                }}
              >
                Personal Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField 
                    fullWidth 
                    label="First Name" 
                    name="firstName" 
                    value={formData.firstName} 
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField 
                    fullWidth 
                    label="Middle Name" 
                    name="middleName" 
                    value={formData.middleName} 
                    onChange={handleChange} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField 
                    fullWidth 
                    label="Last Name" 
                    name="lastName" 
                    value={formData.lastName} 
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    select 
                    fullWidth 
                    label="Gender" 
                    name="gender" 
                    value={formData.gender} 
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
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Religion" 
                    name="religion" 
                    value={formData.religion} 
                    onChange={handleChange} 
                    required
                    disabled
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Caste" 
                    name="caste" 
                    value={formData.caste} 
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Rashi</InputLabel>
                    <Select
                      name="rashi"
                      value={formData.rashi}
                      label="Rashi"
                      onChange={handleChange}
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      {rashiOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Gothra" 
                    name="gothra" 
                    value={formData.gothra} 
                    onChange={handleChange} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                align="left" 
                sx={{ 
                  mb: 2, 
                  borderBottom: '2px solid #1976d2', 
                  pb: 1, 
                  color: '#1976d2' 
                }}
              >
                Basic Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      label="Blood Group"
                      onChange={handleChange}
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      {bloodGroupOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Color" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleChange} 
                    placeholder="e.g., Fair, Wheatish, etc."
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Height (in CM)" 
                    name="height" 
                    type="number"
                    value={formData.height} 
                    onChange={handleChange} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Weight (in KG)" 
                    name="weight" 
                    type="number"
                    value={formData.weight} 
                    onChange={handleChange} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Mother Tongue" 
                    name="motherTongue" 
                    value={formData.motherTongue} 
                    onChange={handleChange} 
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                align="left" 
                sx={{ 
                  mb: 2, 
                  borderBottom: '2px solid #1976d2', 
                  pb: 1, 
                  color: '#1976d2' 
                }}
              >
                Career and Education
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Highest Qualification</InputLabel>
                    <Select
                      name="qualification"
                      value={formData.qualification}
                      label="Highest Qualification"
                      onChange={handleChange}
                      required
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      {qualificationOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Occupation" 
                    name="occupation" 
                    value={formData.occupation} 
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Annual Income (in Rs)" 
                    name="annualIncome" 
                    type="number"
                    value={formData.annualIncome} 
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
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                align="left" 
                sx={{ 
                  mb: 2, 
                  borderBottom: '2px solid #1976d2', 
                  pb: 1, 
                  color: '#1976d2' 
                }}
              >
                Contact Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={formData.password} 
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Phone Number" 
                    name="phone" 
                    value={formData.phone} 
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Permanent Address" 
                    name="permanentAddress" 
                    value={formData.permanentAddress} 
                    onChange={handleChange} 
                    multiline
                    rows={3}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Current Address" 
                    name="currentAddress" 
                    value={formData.currentAddress} 
                    onChange={handleChange} 
                    multiline
                    rows={3}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    multiline 
                    rows={3}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                align="left" 
                sx={{ 
                  mb: 2, 
                  borderBottom: '2px solid #1976d2', 
                  pb: 1, 
                  color: '#1976d2' 
                }}
              >
                Upload Documents
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" align="left" sx={{ mb: 1 }}>Profile Picture</Typography>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
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
                      py: 1.5,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      }
                    }}
                  >
                    Upload Profile Picture
                    <input 
                      type="file" 
                      hidden 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, "profile")} 
                    />
                  </Button>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" align="left" sx={{ mb: 1 }}>Aadhar Card Photo</Typography>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    {aadharPreview && (
                      <Box 
                        component="img" 
                        src={aadharPreview} 
                        sx={{ 
                          height: 100, 
                          maxWidth: "100%",
                          margin: "auto",
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          border: '3px solid #1976d2',
                          borderRadius: 1
                        }} 
                      />
                    )}
                  </Box>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth 
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      }
                    }}
                  >
                    Upload Aadhar Card
                    <input 
                      type="file" 
                      hidden 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, "aadhar")} 
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
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