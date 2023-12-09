"use client"
import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Typography, useTheme, Switch } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';
import WebIcon from '@mui/icons-material/Web';
import LoopIcon from '@mui/icons-material/Loop';
import LogoutIcon from '@mui/icons-material/Logout';
import { TOGGLE_THEME, selectTheme } from '@/redux/features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
    const [mode, setMode] = useState('dark');
    const dispatch = useDispatch();
    const theme = useTheme()


    const handleModeChange = ({ target }) => {
        //update local state
        setMode(target.checked ? 'dark' : 'light');
        // update redux 
        console.log(target.checked ? 'dark' : 'light')
        dispatch(TOGGLE_THEME({ theme: target.checked ? 'dark' : 'light' }))

    };

    const themes = useSelector(selectTheme)
    console.log(themes)
    return (
        <Box
            sx={{
                width: '100%',
                // height: '100vh',
                cursor: 'pointer',
                marginTop: "90px",
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
                    // boxShadow: 3,
                    border: '1px solid gray',
                    margin: 4,
                    overflow: 'auto',
                }}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 4, fontSize: '25px' }}>
                            <Grid item>
                                <Typography variant="h4" component="h1">
                                    Your Account
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" sx={{ fontSize: '20px' }}>
                                    Delete account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: 1 }}>
                            <Grid item>
                                <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: "10px", height: "50px", width: "50px" }} />
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" >
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
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 10px 20px" }}>
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
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 10px 20px" }}>
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
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: '0 0 10px 20px' }}>
                            <Grid item>
                                <Switch
                                    sx={{ color: '#57636C' }}

                                    checked={mode === 'dark'}
                                    onChange={handleModeChange}
                                    aria-label="theme mode"
                                />

                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h4">
                                    Theme
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 15px 20px" }}>
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
