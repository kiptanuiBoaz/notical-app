'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { SecurityRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/features/themeSlice';



export const Navbar = () => {
    const pathname = usePathname();
    const selectedTheme = useSelector(selectTheme);
    const theme = useTheme();
    // console.log(theme)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }


    if (pathname.startsWith('/auth')) return <></>;

    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper }}>
                <Toolbar sx={{ mx: 10, color: theme.palette.primary.main }} >
                    <Link href="/connections">
                        <Image src={selectedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"} alt="notycal-logo" sx={{ mr: 2, px: 2 }} height={60} width={160} />
                    </Link>

                    <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', mr: "50px" }}>
                        <Button color="inherit" href="/connections" sx={{ fontSize: "21px", mr: "20px", color: `${pathname === "/connections" && "#0276AA"}` }}>
                            Connections
                        </Button>
                        <Button color="inherit" href="/subscriptions" sx={{ fontSize: "21px", color: `${pathname === "/subscriptions" && "#0276AA"}` }}>
                            Subscriptions
                        </Button>
                    </Typography>
                    <Link href="/account" sx={{ TextDecoderation: "none" }}>
                        <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: 2, height: "50px", width: "50px" }} />
                    </Link>
                </Toolbar>
            </AppBar>
        </nav>
    );
}
