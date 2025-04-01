import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        navigate("/login");
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#333" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ display: { xs: "block", md: "none" } }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/dashboard")}> 
                    Mangalashtak Clone
                </Typography>
                
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Button color="inherit" onClick={() => navigate("/dashboard")}>Profile</Button>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Box>
                
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => { navigate("/dashboard"); handleMenuClose(); }}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
