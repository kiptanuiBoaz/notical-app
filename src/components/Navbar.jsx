'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/features/themeSlice';
import Link from 'next/link';
import { selectUser } from '@/redux/features/authSlice';


export const Navbar = () => {
    const pathname = usePathname();
    const selectedTheme = useSelector(selectTheme);
    const currentUser = useSelector(selectUser);
    const theme = useTheme();
    // console.log(theme)
    console.log(pathname)
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (pathname.startsWith('/auth')) return <></>;

    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper }}>
                <Toolbar sx={{ mx: 10, color: theme.palette.primary.main, fontSize: "18px" }} >
                    <Link href="/connections">
                        <Image src={selectedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"} alt="notycal-logo" sx={{ mr: 2, px: 2 }} height={60} width={160} />
                    </Link>

                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'end', mr: "50px", color: theme.palette.primary.main }}>
                        <Link style={{ color: pathname === "/connections" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }} href="/connections"  >
                            Connections
                        </Link>
                    </Typography>
                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'start', mr: "50px", color: theme.palette.primary.main }}>
                        <Link style={{ color: pathname === "/subscriptions" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }} href="/subscriptions"  >
                            Subscriptions
                        </Link>
                    </Typography>


                    <Link href="/account" sx={{ TextDecoderation: "none" }}>
                        <Avatar href="/account" src={currentUser.avatarUrl} alt="user" sx={{ ml: 2, height: "50px", width: "50px", }} />
                    </Link>
                </Toolbar>
            </AppBar>
        </nav>
    );
}

export default Navbar
