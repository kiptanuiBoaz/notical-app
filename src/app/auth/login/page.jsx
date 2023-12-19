"use client"
import React, { useRef, useState } from 'react';
import { InputAdornment, IconButton, Box, Typography, TextField, Button, Icon } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SetMeal, Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '@/redux/features/themeSlice';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { UPDATE_AUTH } from '@/redux/features/authSlice';
import { TOGGLE_AUTH_METHOD } from '@/redux/features/authMethodSlice';

const Login = () => {
    // Initialize the state of the password visibility and the password value
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Use the form below to access your account');

    console.log(email, password)

    const router = useRouter();
    const formRef = useRef(null);
    const selectedTheme = useSelector(selectTheme);
    const supabase = createClientComponentClient()
    const theme = useTheme();
    const dispatch = useDispatch()

    // Define a function to handle the icon click and toggle the password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Define a function to handle the password input change and update the password value
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    async function handleSignInWithGoogle() {
        dispatch(TOGGLE_AUTH_METHOD({ authMethod: "google" }));
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });
        console.log(data, error);

    }


    const handleSignIn = async () => {
        dispatch(TOGGLE_AUTH_METHOD({ authMethod: "email" }));
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log(res)

        if (!res.error) {
            setError(false)
            setHelperText("Successfully signed in");
            const data = res.data.user;
            dispatch(UPDATE_AUTH({
                user_id: data.id,
                email: data.email,
                full_name: data.user_metadata.full_name,
                avatarUrl: data.user_metadata.avatar_url,
                role: {
                    name: data.role,
                    id: data.aud
                },
            }))
            router.push(`/?code=${data.id}`)
        } else {
            setHelperText(res.error.message)
            setError(true)
        }
        formRef.current.reset()

    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '30px',
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.default,
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
                <Box sx={{ marginBottom: '2rem', justifyContent: "center" }} error={error}>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={selectedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"} alt="notycal-logo" sx={{ mr: 2, px: 2 }} height={60} width={160} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Welcome back
                    </Typography>
                    {/* <Typography  variant="body1" sx={{ color: 'gray', mt: 1 }}>
                        Use the form below to access your account
                    </Typography> */}
                    <FormHelperText sx={{ color: error ? "red" : "green", fontSize: "17px" }}>{helperText}</FormHelperText>
                </Box>
                <form ref={formRef}>

                    <Box sx={{ marginBottom: '2rem' }}>
                        <TextField
                            onChange={handleEmailChange}
                            label="Email Address"
                            type="email"
                            fullWidth
                            sx={{ mb: 2 }}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary" onClick={() => handleSignIn()}>
                                Sign In
                            </Button>
                            <Link href="#" color="secondary" style={{ color: theme.palette.primary.main }}>
                                Forgot password?
                            </Link>
                        </Box>
                    </Box>
                </form>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Or sign in with
                    </Typography>

                    <GoogleIcon
                        onClick={handleSignInWithGoogle}
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
                        Don&rsquo;t have an account? &nbsp;
                        <Link href="/auth/signup" color="primary" style={{ color: theme.palette.primary.main }}>
                            Create account instead
                        </Link>
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
}

export default Login;
