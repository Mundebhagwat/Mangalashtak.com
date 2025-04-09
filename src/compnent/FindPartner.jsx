import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, MenuItem, Slider, Button, Grid, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"];
const castes = ["Brahmin", "Rajput", "Maratha", "Jain", "Other"];

const FindPartner = () => {
  // Set default preferences
  const [preferences, setPreferences] = useState({
    minAge: 18,
    maxAge: 40,
    preferredReligion: "",
    preferredCaste: "",
    location: "",
  });

  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // 🆕 Fetch logged-in user's gender from backend
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

        // 👇 Set gender internally (not part of form now)
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
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://backend-for-mangalastak.onrender.com/api/match/matches", {
        params: preferences,
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(response.data);
      setNoResults(response.data.length === 0);
    } catch {
      toast.error("Required fields: minAge and maxAge");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, bgcolor: "#f4f6f8" }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Find Your Perfect Match 💖
          </Typography>

          {/* Form */}
          <CardContent>
            <Typography gutterBottom>Preferred Age Range:</Typography>
            <Slider value={[preferences.minAge, preferences.maxAge]} onChange={handleSliderChange} valueLabelDisplay="auto" min={18} max={60} sx={{ mb: 3 }} />

            {/* 🔥 Gender Dropdown Removed - Now automatically handled */}
            
            <TextField fullWidth select label="Preferred Religion" name="preferredReligion" value={preferences.preferredReligion} onChange={handleChange} sx={{ mb: 2 }}>
              {religions.map((religion) => (
                <MenuItem key={religion} value={religion}>{religion}</MenuItem>
              ))}
            </TextField>

            <TextField fullWidth select label="Preferred Caste" name="preferredCaste" value={preferences.preferredCaste} onChange={handleChange} sx={{ mb: 2 }}>
              {castes.map((caste) => (
                <MenuItem key={caste} value={caste}>{caste}</MenuItem>
              ))}
            </TextField>

            <TextField fullWidth label="Location" name="location" value={preferences.location} onChange={handleChange} sx={{ mb: 2 }} />

            <Button variant="contained" color="primary" fullWidth onClick={handleSearch} sx={{ mt: 2, fontSize: 18 }}>
              🔍 Search Matches
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      {results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mt={5}>
            Matching Profiles ✨
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {results.map((profile, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ p: 2, textAlign: "center", borderRadius: 2, boxShadow: 3 }}>
                  <Avatar src={profile.profilePicture} sx={{ width: 80, height: 80, margin: "auto", mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">{profile.fullName || "No Name"}</Typography>
                  <Typography>Age: {profile.age || "N/A"}</Typography>
                  <Typography>Religion: {profile.religion}</Typography>
                  <Typography>Caste: {profile.caste}</Typography>
                  <Typography>Location: {profile.location}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    component={Link}
                    to={`/profile/${profile._id}`}
                  >View Profile</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* No Results Message */}
      {noResults && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, p: 2, bgcolor: "#ffe6e6", color: "#d32f2f", borderRadius: 2, fontWeight: "bold" }}>
          😔 No matching profiles found. Try adjusting your preferences!
        </Typography>
      )}
    </Container>
  );
};

export default FindPartner;
