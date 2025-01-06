import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Modal, Box, TextField } from '@mui/material';
import { loginUser, registerUser, logoutUser, getLoggedInUser, saveUsername, getUsername } from '../services/authService';
import { useTheme } from '@mui/material/styles';

const NavbarComponent = () => {
    const theme = useTheme();

    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [padding, setPadding] = useState("0px");

    useEffect(() => {
      const timeToLower = setTimeout(() => {
        setPadding("60px");
      }, 150);
  
      return () => clearTimeout(timeToLower);
    }, []);

    const [formData, setFormData] = useState({
        password: '',
        username: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const user = getLoggedInUser();
      setIsLoggedIn(user !== null);
    }, []);
  
    const handleLogOut = () => {
      logoutUser();
      setIsLoggedIn(false);
    };

    const handleCloseSignUp = () => setShowSignUp(false);
    const handleCloseLogin = () => setShowLogin(false);

    const handleShowSignUp = () => setShowSignUp(true);
    const handleShowLogin = () => setShowLogin(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        try {
            await registerUser(formData);
            saveUsername(formData.username);
            setIsLoggedIn(true);
            handleCloseSignUp();
        } catch (error) {
            alert('Registration failed');
        }
    };

    const handleLogin = async () => {
        try {
            await loginUser(formData);
            saveUsername(formData.username);
            setIsLoggedIn(true);
            handleCloseLogin();
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
            <AppBar sx={{ backgroundColor: theme.palette.secondary.main, zIndex: 90, width: "300px", top: "0", left: "50%", transform: "translateX(-50%)" }}>
                <Toolbar sx={{  justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Mood Journal
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppBar position="sticky" sx={{ zIndex: 10 }}>
                <Toolbar sx={{ paddingTop: padding, width: "250px", color: "white", backgroundColor: "#353535", justifyContent: "space-around", transition: "padding-top 0.8s ease-in-out" }}>
                    {isLoggedIn ? (
                        <>
                            <span>{getUsername()} 🐶</span>
                            <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleShowLogin}>Log In</Button>
                            <Button color="inherit" onClick={handleShowSignUp}>Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Sign Up Modal */}
            <Modal open={showSignUp} onClose={handleCloseSignUp}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Sign Up</Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="username"
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={handleSignUp} sx={{ marginTop: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Modal>

            {/* Log In Modal */}
            <Modal open={showLogin} onClose={handleCloseLogin}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Log In</Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="username"
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={handleLogin} sx={{ marginTop: 2 }}>
                        Log In
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

// Modal style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default NavbarComponent;
