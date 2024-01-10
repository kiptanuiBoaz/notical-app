"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme, Drawer, List, ListItem, IconButton, Box } from '@mui/material';
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
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const pathname = usePathname();
    const selectedTheme = useSelector(selectTheme);
    const currentUser = useSelector(selectUser);
    const [isHovered, setIsHovered] = useState("");
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const router = useRouter()

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const subscriptionsLink = <Link
        style={{ color: pathname === "/subscriptions" || isHovered === "/subscriptions" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none" }}
        href="/subscriptions"
        onMouseOver={() => setIsHovered("/subscriptions")}
        onMouseOut={() => setIsHovered("")}
    >
        Subscriptions
    </Link>
    const connectionsLink = <Link
        style={{
            color: pathname === "/connections" || isHovered === "/connections" ? "#0275A9" : theme.palette.primary.main, textDecoration: "none",
            "&hover": {
                color: "#0275A9"
            },
            transition: 'color 0.3s ease',

        }}
        href="/connections"
        onMouseOver={() => setIsHovered("/connections")}
        onMouseOut={() => setIsHovered(false)}
    >
        Connections
    </Link>

    const profileAvatart = <Avatar
        placeholder="blur"
        href="/account"
        src={currentUser.avatarUrl}
        alt="user"
        sx={{ height: { xs: "35px", md: "50px" }, width: { xs: "35px", md: "50px" }, border: "solid 2px #0275A9" }}
    />

    if (pathname.startsWith('/auth')) return <></>;

    return (
        <nav sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper, padding: "5px 2%" }}>
                <Toolbar sx={{
                    color: theme.palette.primary.main,
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: { xs: 'space-between', md: 'flex-end' },
                    margin: { xs: '4px', md: '0' },
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

                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'end', display: { xs: 'none', md: 'block' } }}>
                        {connectionsLink}
                    </Typography>
                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'start', color: theme.palette.primary.main, display: { xs: 'none', md: 'block' }, marginLeft: "25px", marginRight: "25px" }}>

                        {subscriptionsLink}
                    </Typography>

                    {/* Updated styling for the Avatar */}
                    <Link href="/account" style={{ textDecoration: "none", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography sx={{ color: theme.palette.primary.main, fontSize: "18px", marginRight: "15px", "&:hover": { color: "#0275A9" }, display: { xs: 'none', md: 'block' } }}>
                            Hi,&nbsp;{currentUser.full_name.split(" ")[0]}
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            {profileAvatart}
                        </Box>

                    </Link>

                    {/* Updated styling for the IconButton */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { md: 'none' }, ml: '10px' }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <IoMenu size={40} />
                    </IconButton>

                </Toolbar>

                {/* Drawer for mobile view */}
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                    <List>
                        <ListItem button onClick={handleDrawerClose}>
                            <IoClose size={30} />
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                router.push("/account");
                                handleDrawerClose();
                            }}
                            sx={{
                                cursor: "pointer",
                                '&:hover': { color: "#0275A9" }
                            }}
                        >
                            <Link href="/account" sx={{ textDecoration: "none", ml: '10px', mr: '20px' }}>
                                {profileAvatart}
                            </Link>
                            &nbsp;
                            <Typography sx={{ color: theme.palette.primary.main, fontSize: "18px", marginRight: "15px", "&:hover": { color: "#0275A9" } }}>
                                Hi,&nbsp;{currentUser.full_name.split(" ")[0]}
                            </Typography>

                        </ListItem>


                        <ListItem onClick={handleDrawerClose}>
                            {connectionsLink}
                        </ListItem>
                        <ListItem onClick={handleDrawerClose}>
                            {subscriptionsLink}
                        </ListItem>


                    </List>
                </Drawer>
            </AppBar>
        </nav >
    );
};

export default Navbar;