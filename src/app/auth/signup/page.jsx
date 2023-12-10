"use client"
import React, { useState } from 'react';
import { InputAdornment, IconButton, Box, Typography, TextField, Button, Icon, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

const SignUp = () => {
    // Initialize the state of the password visibility and the password value
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();
    const supabase = createClientComponentClient()

    // Define a function to handle the icon click and toggle the password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Define a function to handle the password input change and update the password value
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSignUp = async () => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        console.log(res)
        router.refresh()
    }
    return (
        <Box
            sx={{
                height: '80vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '30px'
            }}
        >
            <Box
                sx={{
                    width: ['95%', '70%', '40%'],
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '2rem',

                }}
            >
                <Box sx={{ marginBottom: '2rem', justifyContent: "center" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon sx={{ mr: 2 }}>star</Icon>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            notical
                        </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Get Started
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
                        Create an acount by using the form below
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: '2rem' }}>
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChangePassword}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={() => handleSignUp()}>
                            Sign Up
                        </Button>

                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Or sign in with
                    </Typography>

                    <GoogleIcon
                        sx={{
                            mb: 2,
                            border: '1px solid gray',
                            borderRadius: '2px',
                            backgroundColor: 'transparent', // set the initial background color to transparent
                            cursor: 'pointer',
                            fontSize: '40px',
                            p: '5px',
                            '&:hover': {
                                backgroundColor: '#cccc', // set the background color to #cccc on hover
                            },
                        }}
                    />

                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Already have an account? &nbsp;
                        <Link href="/auth/login" color="primary">
                            Sign in instead
                        </Link>
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;



