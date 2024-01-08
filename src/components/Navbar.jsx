"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme, Drawer, List, ListItem, IconButton } from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/features/themeSlice';
import Link from 'next/link';
import { selectUser } from '@/redux/features/authSlice';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./navbar.scss"

export const Navbar = () => {
    const pathname = usePathname();
    const selectedTheme = useSelector(selectTheme);
    const currentUser = useSelector(selectUser);
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };



    if (pathname.startsWith('/auth')) return <></>;

    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper }}>
                <Toolbar sx={{
                    mx: 10,
                    color: theme.palette.primary.main,
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: { xs: 'space-between', md: 'flex-end' }, // Adjusted justifyContent
                    margin: { xs: '15px 0', md: '0' }, // Added margin
                }}>
                    <Link href="/connections">
                        <Image
                            priority={true}
                            src={`/logo-${selectedTheme}.svg`}
                            alt="notycal-logo"
                            width={160}
                            height={60}
                            className='logo'
                        />

                    </Link>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { md: 'none' } }}
                        onClick={handleDrawerOpen}

                    >
                        <IoMenu size={30} />
                    </IconButton>

                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'end', mr: "50px", color: theme.palette.primary.main, display: { xs: 'none', md: 'block' } }}>
                        <Link style={{ color: pathname === "/connections" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }} href="/connections"  >
                            Connections
                        </Link>
                    </Typography>
                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'start', mr: "50px", color: theme.palette.primary.main, display: { xs: 'none', md: 'block' } }}>
                        <Link style={{ color: pathname === "/subscriptions" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }} href="/subscriptions"  >
                            Subscriptions
                        </Link>
                    </Typography>

                    <Link href="/account" sx={{ textDecoration: "none" }}>
                        <Avatar
                            href="/account"
                            src={currentUser.avatarUrl}
                            alt="user"
                            sx={{ ml: 2, height: { xs: "35px", md: "50px" }, width: { xs: "35px", md: "50px" }, }}

                        />
                    </Link>
                </Toolbar>


                {/* Drawer for mobile view */}
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                    <List>
                        <ListItem button onClick={handleDrawerClose}>
                            <IoClose size={30} />
                        </ListItem>
                        <ListItem onClick={handleDrawerClose}>
                            <Link style={{ color: pathname === "/connections" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }} href="/connections">
                                Connections
                            </Link>
                        </ListItem>
                        <ListItem onClick={handleDrawerClose}>
                            <Link

                                style={{
                                    color: pathname === "/subscriptions" ? "#0275A9" : theme.palette.primary.main,
                                    textDecoration: "none"
                                }}
                                href="/subscriptions"
                            >
                                Subscriptions
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>
        </nav >
    );
};

export default Navbar;
