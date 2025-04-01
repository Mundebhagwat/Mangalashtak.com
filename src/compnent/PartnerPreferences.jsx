import { useState } from "react";
import { TextField, MenuItem, Slider, Button, Box, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

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
         const response = await axios.put(`http://localhost:5000/api/users//preferences/${userId}`, updatedPreferences, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      toast.success("Preferences updated successfully!");
    //    setPreferences((prev) => ({
    //         ...prev, // Keep previous values
    //         ...response.data.partnerPreferences, // Update only modified fields
    //     }));
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
    <Card sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Partner Preferences
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography gutterBottom>Age Range</Typography>
          <Slider
            value={[preferences.minAge, preferences.maxAge]}
            onChange={handleAgeChange}
            valueLabelDisplay="auto"
            min={18}
            max={100}
            sx={{ mb: 3 }}
          />
          <TextField fullWidth select label="Preferred Gender" name="preferredGender" value={preferences.preferredGender} onChange={handleChange} sx={{ mb: 2 }}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField fullWidth label="Religion" name="preferredReligion" value={preferences.preferredReligion} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Caste" name="preferredCaste" value={preferences.preferredCaste} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Location" name="location" value={preferences.location} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Education" name="education" value={preferences.education} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Occupation" name="occupation" value={preferences.occupation} onChange={handleChange} sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save Preferences
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PartnerPreferencesForm;
