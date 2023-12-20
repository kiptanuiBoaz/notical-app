"use client"
import React, { useRef, useState } from 'react';
import { InputAdornment, IconButton, Box, Typography, TextField, Button, FormHelperText, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/features/themeSlice';
import Link from 'next/link';
import { createStripeCustomer } from '../createStripeCustomer';
import { Loading } from 'notiflix';
import { useUser } from '@supabase/auth-helpers-react'


const SignUp = () => {
    // Initialize the state of the password visibility and the password value
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Create an acount by using the form below');
    // const { user } = useUser()

    const router = useRouter();
    const formRef = useRef(null);
    const theme = useTheme();
    const selectedTheme = useSelector(selectTheme);
    const supabase = createClientComponentClient();


    // console.log(user)
    const handleConnection = async (signedUpUserEmail) => {
        const customer = await createStripeCustomer(signedUpUserEmail);
        updateProfile(customer.data.id);

    }


    const updateProfile = async (customer_id) => {
        const { user_id, email } = signedUpUser;
        try {
            Loading.dots({
                svgColor: '#0276AA',
                backgroundColor: 'rgba(0,0,0,0.4)',
            });

            const res = await supabase.from('users').upsert({
                user_id, email, is_active: false, customer_id,
            })
            if (res?.error) throw error

        } catch (error) {
            console.log(error.message)
        } finally {
            Loading.remove();
        }
    }

    async function handleSignInWithGoogle() {
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

    const handleSignUp = async () => {
        try {
            Loading.dots({
                svgColor: '#0276AA',
                backgroundColor: 'rgba(0,0,0,0.4)',
            });

            const res = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            setError(false);
            setHelperText("Sign up successfull, check your mail for a confirmation link");
            handleConnection(res.data.user.email);
        } catch (error) {
            setError(true)
            setHelperText(error.message)

        } finally {
            Loading.remove();
            formRef.current.reset()
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '60px',
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
                <Box sx={{ marginBottom: '2rem', justifyContent: "center" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={selectedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"} alt="notycal-logo" sx={{ mr: 2, px: 2 }} height={60} width={160} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Get Started
                    </Typography>
                    <FormHelperText variant="body1" sx={{ color: error ? "red" : "green", mt: 1, fontSize: "17px" }}>{helperText}</FormHelperText>
                </Box>
                <form ref={formRef}>

                    <Box sx={{ marginBottom: '2rem' }}>
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Already have an account? &nbsp;
                        <Link href="/auth/login" color="primary" style={{ color: theme.palette.primary.main }}>
                            Sign in instead
                        </Link>
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;



