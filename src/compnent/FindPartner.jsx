import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, MenuItem, Slider, Button, Grid, Avatar, Box, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { alpha } from "@mui/material/styles";

// Define gradient colors
const primaryGradient = "linear-gradient(135deg, #FF5E62 0%, #FF9966 100%)";
const secondaryGradient = "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)";

// Keep original data arrays
const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"];
const castes = ["Brahmin", "Rajput", "Maratha", "Jain", "Other"];

const FindPartner = () => {
  // Set default preferences (unchanged)
  const [preferences, setPreferences] = useState({
    minAge: 18,
    maxAge: 40,
    preferredReligion: "",
    preferredCaste: "",
    location: "",
  });

  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Original useEffect for fetching user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://backend-for-mangalastak.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userGender = response.data.gender?.toLowerCase();
        let oppositeGender = "";
        if (userGender === "male") oppositeGender = "female";
        else if (userGender === "female") oppositeGender = "male";
        else oppositeGender = "other";

        setPreferences(prev => ({ ...prev, gender: oppositeGender }));
      } catch (error) {
        console.error("Error fetching user details", error);
        toast.error("Failed to get user info");
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (event, newValue) => {
    setPreferences({ ...preferences, minAge: newValue[0], maxAge: newValue[1] });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://backend-for-mangalastak.onrender.com/api/match/matches", {
        params: preferences,
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(response.data);
      setNoResults(response.data.length === 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Required fields: minAge and maxAge");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
      {/* Main Search Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <Paper 
          elevation={10} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
          }}
        >
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute', 
              width: 200, 
              height: 200, 
              background: alpha('#FF9966', 0.1), 
              borderRadius: '50%', 
              top: -80, 
              left: -80,
              zIndex: 0
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              width: 120, 
              height: 120, 
              background: alpha('#2193b0', 0.1), 
              borderRadius: '50%', 
              bottom: -40, 
              right: -40,
              zIndex: 0
            }} 
          />
          
          {/* Header section */}
          <Box 
            sx={{ 
              py: 3.5, 
              px: 2, 
              textAlign: 'center',
              background: primaryGradient,
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h3" 
                fontWeight="800" 
                color="white"
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  letterSpacing: '0.5px',
                  mb: 1
                }}
              >
                Find Your Perfect Match 
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  💖
                </motion.span>
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="white" 
                sx={{ opacity: 0.9, maxWidth: '80%', mx: 'auto' }}
              >
                Discover compatible partners based on your preferences
              </Typography>
            </motion.div>
          </Box>

          {/* Form content */}
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 1.5 }}>
                  Preferred Age Range:
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider 
                    value={[preferences.minAge, preferences.maxAge]} 
                    onChange={handleSliderChange} 
                    valueLabelDisplay="on" 
                    min={18} 
                    max={60} 
                    sx={{ 
                      color: '#FF5E62',
                      '& .MuiSlider-thumb': {
                        height: 24,
                        width: 24,
                        backgroundColor: '#fff',
                        border: '3px solid #FF5E62',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
                        '&:focus, &:hover, &.Mui-active': {
                          boxShadow: '0 3px 14px rgba(0,0,0,0.3)',
                        },
                      },
                      '& .MuiSlider-rail': {
                        height: 8,
                        borderRadius: 4,
                        opacity: 0.3,
                      },
                      '& .MuiSlider-track': {
                        height: 8,
                        borderRadius: 4,
                      },
                      '& .MuiSlider-valueLabel': {
                        background: primaryGradient,
                        borderRadius: '8px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      },
                    }} 
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  select 
                  label="Preferred Religion" 
                  name="preferredReligion" 
                  value={preferences.preferredReligion} 
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF5E62',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF5E62',
                    },
                  }}
                >
                  <MenuItem value="">Any Religion</MenuItem>
                  {religions.map((religion) => (
                    <MenuItem key={religion} value={religion}>{religion}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  select 
                  label="Preferred Caste" 
                  name="preferredCaste" 
                  value={preferences.preferredCaste} 
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF5E62',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF5E62',
                    },
                  }}
                >
                  <MenuItem value="">Any Caste</MenuItem>
                  {castes.map((caste) => (
                    <MenuItem key={caste} value={caste}>{caste}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth 
                  label="Location" 
                  name="location" 
                  value={preferences.location} 
                  onChange={handleChange}
                  placeholder="Enter city or state"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF5E62',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF5E62',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleSearch} 
                  disabled={loading}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    background: primaryGradient,
                    boxShadow: '0 8px 20px rgba(255, 94, 98, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 25px rgba(255, 94, 98, 0.4)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>🔍 Search Matches</>
                  )}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </motion.div>

      {/* Results Section */}
      {results.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                position: 'relative',
                display: 'inline-block',
                pb: 1.5,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: primaryGradient,
                  borderRadius: '4px',
                }
              }}
            >
              Matching Profiles ✨
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              sx={{ mt: 1 }}
            >
              Found {results.length} compatible matches for you
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {results.map((profile, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
                  }}
                >
                  <Card 
                    sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                      }}
                    >
                      <Avatar 
                        src={profile.profilePicture} 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                          border: '4px solid white',
                          mb: 2.5
                        }} 
                      />
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ mb: 0.5 }}
                      >
                        {profile.fullName || "No Name"}
                      </Typography>
                      
                      <Box sx={{ mt: 1.5, textAlign: 'left', width: '100%' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={4} sx={{ color: 'text.secondary' }}>
                            <Typography variant="body2">Age:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2" fontWeight="medium">{profile.age || "N/A"}</Typography>
                          </Grid>
                          
                          <Grid item xs={4} sx={{ color: 'text.secondary' }}>
                            <Typography variant="body2">Religion:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2" fontWeight="medium">{profile.religion}</Typography>
                          </Grid>
                          
                          <Grid item xs={4} sx={{ color: 'text.secondary' }}>
                            <Typography variant="body2">Caste:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2" fontWeight="medium">{profile.caste}</Typography>
                          </Grid>
                          
                          <Grid item xs={4} sx={{ color: 'text.secondary' }}>
                            <Typography variant="body2">Location:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2" fontWeight="medium">{profile.location}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    
                    <Box sx={{ p: 2, background: 'rgba(0,0,0,0.02)' }}>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/profile/${profile._id}`}
                        fullWidth
                        sx={{ 
                          py: 1.2, 
                          borderRadius: 2,
                          background: secondaryGradient,
                          boxShadow: '0 4px 12px rgba(33, 147, 176, 0.3)',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          '&:hover': {
                            boxShadow: '0 6px 15px rgba(33, 147, 176, 0.4)',
                          }
                        }}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* No Results Message */}
      {noResults && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              mt: 5, 
              p: 4, 
              textAlign: 'center', 
              borderRadius: 3,
              background: 'rgba(255,250,250,0.97)',
              border: '1px solid rgba(211,47,47,0.1)',
            }}
          >
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Typography variant="h3" sx={{ color: '#d32f2f', fontSize: '3rem', mb: 1, lineHeight: 1 }}>
                😔
              </Typography>
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  color: '#d32f2f',
                  mb: 1.5,
                }}
              >
                No matching profiles found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your preferences to see more potential matches.
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ 
                  mt: 3, 
                  borderColor: '#d32f2f', 
                  color: '#d32f2f',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    borderColor: '#b71c1c',
                    backgroundColor: 'rgba(211,47,47,0.05)'
                  }
                }}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              >
                Modify Search
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      )}
    </Container>
  );
};

export default FindPartner;
