import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Avatar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
          <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} margin="normal" required>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField fullWidth type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Religion" name="religion" value={formData.religion} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Caste" name="caste" value={formData.caste} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Bio" name="bio" value={formData.bio} onChange={handleChange} margin="normal" multiline rows={3} />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            {profilePreview && <Avatar src={profilePreview} sx={{ width: 80, height: 80, margin: "auto" }} />}
          </Box>
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Profile Picture
            <input type="file" hidden name="profilePicture" accept="image/*" onChange={handleFileChange} />
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;

