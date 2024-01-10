"use client"
import React from 'react';
import { Box, Typography, } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { selectTheme } from '@/redux/features/themeSlice'
import { useSelector } from 'react-redux'


const SignUp = () => {
    const theme = useTheme();
    const selectedTheme = useSelector(selectTheme);
    const supabase = createClientComponentClient();

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '20px',
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    width: ['95%', '70%', '40%'],
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '4rem 2rem',

                }}
            >
                <Box sx={{
                    alignItems: 'center',
                    display: "flex",
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '20px ',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={`/logo-${selectedTheme}.svg`}
                            alt="notycal-logo"
                            sx={{ mr: 2, px: 2 }}
                            height={60}
                            width={160}
                        />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Get Started
                    </Typography>
                </Box>


                <Auth
                    supabaseClient={supabase}
                    view="magic_link"
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#0275A9',
                                    brandAccent: '#0488c4',
                                },
                            },
                        },

                    }}
                    localization={{
                        variables: {
                            sign_in: {
                                email_label: 'Sign Up with your email address',
                                social_provider_text: "Sign Up with {{provider}}",
                            },
                        },
                    }}
                    showLinks={false}
                    redirectTo="http://localhost:3000/auth/callback"
                    providers={["google", "notion"]}
                    theme={selectedTheme === "dark" ? "dark" : "default"}
                />

                <Box sx={{ textAlign: 'center' }}>

                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Already have an account? &nbsp;
                        <Link href="/auth/login" color="primary" style={{ color: theme.palette.primary.main }}>
                            Login instead
                        </Link>
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;

