'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { SecurityRounded } from '@mui/icons-material';


export const Navbar = () => {
    const pathname = usePathname();
    const theme = useTheme();
    // console.log(theme)
    if (pathname.startsWith('/auth')) return <></>;

    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper }}>
                <Toolbar sx={{ mx: 10, color: theme.palette.primary }} >
                    <Link href="/connections">
                        <Image src="/logo-light.svg" alt="notycal-logo" sx={{ mr: 2, px: 2 }} height={60} width={160} />
                    </Link>

                    <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', mr: "50px" }}>
                        <Button color="inherit" href="/connections" sx={{ fontSize: "21px", mr: "20px" }}>Connections</Button>
                        <Button color="inherit" href="/subscriptions" sx={{ fontSize: "21px" }}>Subscriptions</Button>
                    </Typography>
                    <Link href="/account" sx={{ TextDecoderation: "none" }}>
                        <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: 2, height: "50px", width: "50px" }} />
                    </Link>
                </Toolbar>
            </AppBar>
        </nav>
    );
}
