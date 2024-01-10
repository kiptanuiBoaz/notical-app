"use client"
import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Typography, useTheme, Switch } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';
import WebIcon from '@mui/icons-material/Web';
import LoopIcon from '@mui/icons-material/Loop';
import LogoutIcon from '@mui/icons-material/Logout';
import { TOGGLE_THEME, selectTheme } from '@/redux/features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import { RESET_AUTH, selectUser } from '@/redux/features/authSlice';
import { deleteUserProfile } from '@/libs/supabase/deleteUserProfile';
import { Confirm } from 'notiflix';

const Account = () => {
    const dispatch = useDispatch();
    const theme = useTheme()
    const mode = useSelector(selectTheme);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const { stripe: { stripeSubscriptionStatus }, user_id, email, full_name, avatarUrl } = useSelector(selectUser);

    const handleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (!res.error) {
            dispatch(RESET_AUTH());
            router.push("/auth/login")
        }

    }

    const handleAccountDelete = async () => {
        Confirm.show(
            'Permanently deleting your account?',
            'Please note that all your Notion Database integrations and Calendar synchronizations will be lost completely',
            'Delete Account',
            'Cancel',
            async () => {
                await deleteUserProfile(user_id);
                await handleSignOut();
            },
            () => { },
            {
                okButtonColor: "#fff",
                okButtonBackground: "red",
                cancelButtonColor: theme.palette.primary.main,
                titleColor: "#0276AA",
                titleFontSize: "21px",
                messageFontSize: "17px",
                buttonsFontSize: "19px",
                width: "400px"
            },
        );

    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                cursor: 'pointer',
                paddingTop: "70px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.secondary.main,
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
                    height: '90%',
                    borderRadius: 2,
                    // boxShadow: 3,
                    border: '1px solid gray',
                    margin: 4,
                    overflow: 'auto',
                }}
            >
                <Grid container spacing={2}  >
                    <Grid item xs={12} >
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ padding: 2, fontSize: '21px', color: theme.palette.primary.main }}
                        >
                            <Grid item>
                                <Typography variant="h4" component="h1">
                                    Your Account
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleAccountDelete} variant="contained" color="error" sx={{ marginTop: "5px", fontSize: '19px', textTransform: "none" }}>
                                    Delete account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12} >
                        <Grid container alignItems="center" spacing={2} sx={{ color: theme.palette.primary.main }}>
                            <Grid item>
                                <Avatar
                                    href="/account"
                                    src={avatarUrl}
                                    alt="user"
                                    sx={{ ml: "10px", height: "50px", width: "50px" }}

                                />
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" >
                                    <Grid item>
                                        <Typography variant="h6" component="h2">
                                            {full_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" sx={{ fontSize: "19px", color: "#0276AA" }} component="p">
                                            {email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12} sx={{ color: theme.palette.secondary.main, "&:hover": { color: theme.palette.primary.main } }}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 5px 20px" }} onClick={() => router.push("/subscriptions")}>
                            <Grid item>
                                <WebIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography sx={{}} variant="h6" component="h3" >
                                    {stripeSubscriptionStatus ? "Manage Subscription" : "View Pricing Plans"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12} sx={{ color: theme.palette.secondary.main, "&:hover": { color: theme.palette.primary.main } }}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 5px 20px" }} onClick={() => router.push("/connections")}>
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
                    <Grid item xs={12} sx={{ color: theme.palette.secondary.main, "&:hover": { color: theme.palette.primary.main } }}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: '0 0 5px 20px' }}>
                            <Grid item>
                                <Switch
                                    sx={{ color: theme.palette.secondary.main }}
                                    checked={mode === 'dark'}
                                    onChange={(e) => dispatch(TOGGLE_THEME({ theme: e.target.checked ? 'dark' : 'light' }))}
                                    aria-label="theme mode"
                                />

                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h4">
                                    Dark Mode
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <hr style={{ width: "100%" }} />
                    <Grid item xs={12} sx={{ color: theme.palette.secondary.main, "&:hover": { color: theme.palette.primary.main } }}>
                        <Grid container alignItems="center" spacing={2} sx={{ padding: "0 0 5px 20px" }}>
                            <Grid item>
                                <LogoutIcon fontSize="large" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="h3" onClick={handleSignOut} sx={{ "&:hover": { color: "red" } }}>
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
