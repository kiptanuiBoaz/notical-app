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
            <AppBar position="static">
                <Toolbar sx={{ mx: 4 }}>
                    <Image src="/logo.png" alt="logo" sx={{ mr: 2 }} height={30} width={30} />
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Button color="inherit" href="/connections">Connections</Button>
                        <Button color="inherit" href="/subscriptions">Subscriptions</Button>
                    </Typography>
                    <Link href="/account">
                        <Avatar href="/account" src="/user.png" alt="user" sx={{ ml: 2 }} />
                    </Link>

                </Toolbar>
            </AppBar>
        </nav>
    )
}

