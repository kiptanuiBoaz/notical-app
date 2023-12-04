"use client"
import React from 'react';
import { Avatar, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { Brightness4, Brightness7, Mail, Phone, Person } from '@mui/icons-material';
import WebIcon from '@mui/icons-material/Web';
import LoopIcon from '@mui/icons-material/Loop';
import LogoutIcon from '@mui/icons-material/Logout';

const Account = () => {
    const theme = useTheme();

    // state for theme toggle
    const [mode, setMode] = React.useState('light');

    // handle theme toggle change
    const handleModeChange = (event, newMode) => {
        setMode(newMode);
    };

    return (
        <Box
            sx={{
                width: '100%',
                // height: '100vh',
                cursor: 'pointer',
                marginTop: "30px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: '95%',
                        sm: '70%',
                        md: '50%',
                    },
                    height: '80%',
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 4,
                    overflow: 'auto',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" component="h1">
                                    Your Account
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error">
                                    Delete account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: 2, height: "50px", width: "50px" }} />
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Typography variant="h6" component="h2">
                                            Name
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" component="p">
                                            emailaddress@example.com
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <WebIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h3">
                                    Manage Subscription
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <LoopIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h3">
                                    Connections
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Brightness4 fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h4">
                                    Theme
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ToggleButton
                                    value={mode}
                                    onChange={handleModeChange}
                                    aria-label="theme mode"
                                >
                                    {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
                                </ToggleButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <LogoutIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h3">
                                    Logout
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
};

export default Account;
