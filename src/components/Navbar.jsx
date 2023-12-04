"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';


export const Navbar = () => {
    const pathname = usePathname();

    if (pathname.startsWith('/auth')) return <></>;
    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: 'secondary.main' }}>
                <Toolbar sx={{ mx: 4, color: 'primary.main' }} >
                    <Image src="/logo.png" alt="logo" sx={{ mr: 2 }} height={30} width={30} />
                    <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', fontSize: "30px" }}>
                        <Button color="inherit" href="/connections" sx={{ fontSize: "22px" }}>Connections</Button>
                        <Button color="inherit" href="/subscriptions" sx={{ fontSize: "22px" }}>Subscriptions</Button>
                    </Typography>
                    <Link href="/account" sx={{ TextDecoderation: "none" }}>
                        <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: 2, height: "50px", width: "50px" }} />
                    </Link>

                </Toolbar>
            </AppBar>
        </nav>
    )
}

