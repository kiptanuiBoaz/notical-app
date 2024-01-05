"use client"
import React, { useRef, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    useTheme,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/features/themeSlice';
import Link from 'next/link';
import { createStripeCustomer } from '../../connections/libs/stripe/createStripeCustomer';
import { Loading } from 'notiflix';
import { createUserProfile } from '@/app/connections/libs/supabase/createUserProfile';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Create an account by using the form below');

    const router = useRouter();
    const formRef = useRef(null);
    const theme = useTheme();
    const selectedTheme = useSelector(selectTheme);
    const supabase = createClientComponentClient();

    const handleSignInWithGoogle = async () => {
        try {
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
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            Loading.dots({ svgColor: '#0276AA', backgroundColor: 'rgba(0,0,0,0.4)' });

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/auth/callback',
                },
            });

            if (error) {
                setHelperText(error.message);
                setError(true);
            } else {
                setError(false);
                setHelperText('Sign up successful, check your mail for a confirmation link');

                const { email, id, } = data.user;
                const customer = await createStripeCustomer(email);
                const registeredCustomer = await createUserProfile(customer.data.id, id, email);

                console.log(registeredCustomer);
                // router.push(`/?code=${id}`);
            }
        } catch (error) {
            setError(true);
            console.error(error.message);
        } finally {
            Loading.remove();
            formRef.current.reset();
        }
    };

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
                <Box sx={{ marginBottom: '2rem', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={
                                selectedTheme === 'dark'
                                    ? '/logo-dark.svg'
                                    : '/logo-light.svg'
                            }
                            alt="notycal-logo"
                            sx={{ mr: 2, px: 2 }}
                            height={60}
                            width={160}
                        />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Get Started
                    </Typography>
                    <FormHelperText
                        variant="body1"
                        sx={{ color: error ? 'red' : 'green', mt: 1, fontSize: '17px' }}
                    >
                        {helperText}
                    </FormHelperText>
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
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
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
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary" onClick={handleSignUp}>
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
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontSize: '40px',
                            p: '5px',
                            '&:hover': {
                                backgroundColor: '#cccc',
                            },
                        }}
                    />

                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Already have an account?{' '}
                        <Link href="/auth/login" color="primary" style={{ color: theme.palette.primary.main }}>
                            Sign in instead
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
