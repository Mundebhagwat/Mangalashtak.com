import { useState } from "react";
import { 
  TextField, 
  MenuItem, 
  Slider, 
  Button, 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Divider,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Avatar
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PartnerPreferencesForm = ({ userId, existingPreferences }) => {
  const [preferences, setPreferences] = useState(existingPreferences || {
    minAge: 18,
    maxAge: 50,
    preferredReligion: "",
    preferredCaste: "",
    location: "",
    preferredGender: "",
    education: "",
    occupation: "",
  });

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (event, newValue) => {
    setPreferences({ ...preferences, minAge: newValue[0], maxAge: newValue[1] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // 🔍 Remove empty fields before sending the update request
    const updatedPreferences = Object.fromEntries(
        Object.entries(preferences).filter(([_, value]) => value !== "")
    );
    try {
         const response = await axios.put(`https://backend-for-mangalastak.onrender.com/api/users//preferences/${userId}`, updatedPreferences, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      toast.success("Preferences updated successfully!");
      setPreferences({
          minAge: "",
          maxAge: "",
          preferredReligion: "",
          preferredCaste: "",
          location: "",
          preferredGender: "",
          education: "",
          occupation: "",
      });
    } catch (error) {
      toast.error("Failed to update preferences");
      console.log(error);
    }
  };

  return (
    <Paper elevation={0} sx={{ 
      maxWidth: 800, 
      mx: "auto", 
      mt: 4, 
      overflow: "hidden",
      borderRadius: 3,
      backgroundColor: "transparent" 
    }}>
      <Box sx={{ 
        p: 2, 
        background: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: 2
      }}>
        <Avatar sx={{ bgcolor: "white" }}>
          <FavoriteIcon sx={{ color: "#6B46C1" }} />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          Find Your Perfect Match
        </Typography>
      </Box>
      
      <Card sx={{ 
        borderRadius: 0,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ 
                  mb: 3, 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: "#F9FAFB",
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CakeIcon sx={{ mr: 1, color: "#6B46C1" }} />
                    <Typography variant="h6" fontWeight="medium">Age Preference</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Set your preferred age range for potential matches
                  </Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={[preferences.minAge, preferences.maxAge]}
                      onChange={handleAgeChange}
                      valueLabelDisplay="on"
                      min={18}
                      max={100}
                      sx={{ 
                        color: "#6B46C1", 
                        '& .MuiSlider-thumb': {
                          width: 20,
                          height: 20,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">Min: {preferences.minAge} years</Typography>
                    <Typography variant="body2" color="text.secondary">Max: {preferences.maxAge} years</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  select 
                  label="Preferred Gender" 
                  name="preferredGender" 
                  value={preferences.preferredGender} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WcIcon sx={{ color: "#6B46C1" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Religion" 
                  name="preferredReligion" 
                  value={preferences.preferredReligion} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar sx={{ width: 24, height: 24, bgcolor: "#EBF4FF" }}>
                          <span style={{ fontSize: '14px', color: "#6B46C1" }}>R</span>
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Caste" 
                  name="preferredCaste" 
                  value={preferences.preferredCaste} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar sx={{ width: 24, height: 24, bgcolor: "#EBF4FF" }}>
                          <span style={{ fontSize: '14px', color: "#6B46C1" }}>C</span>
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Location" 
                  name="location" 
                  value={preferences.location} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#6B46C1" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Education" 
                  name="education" 
                  value={preferences.education} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: "#6B46C1" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Occupation" 
                  name="occupation" 
                  value={preferences.occupation} 
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon sx={{ color: "#6B46C1" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#9F7AEA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B46C1",
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button 
                    type="submit" 
                    variant="contained"
                    sx={{ 
                      mt: 2, 
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                      boxShadow: "0 4px 20px rgba(107, 70, 193, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #5A3BA5 0%, #8868C9 100%)",
                      }
                    }}
                  >
                    Update Preferences
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default PartnerPreferencesForm;
