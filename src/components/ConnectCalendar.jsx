"use client"
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Icon, useTheme } from '@mui/material';
import { FaCheck } from "react-icons/fa6";
import Image from 'next/image';
import { disconnectCalendar } from '@/app/connections/libs/disconnectCalendar';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';

export const ConnectCalendar = ({ title, description, button, image }) => {
    const theme = useTheme();
    const { user_id, email } = useSelector(selectUser);

    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={image} height={50} width={50} alt='title' style={{ marginRight: "10px" }} />

                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', fontSize: "18px" }}>
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <hr />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" sx={{ color: "#fff", backgroundColor: "#14AE97", display: "flex", alignItems: "center" }}>
                        <FaCheck />
                        Connected
                    </Button>

                </Box>
                <Button
                    onClick={() => disconnectCalendar(user_id, email)}
                    variant="contained"
                    sx={{ color: "#fff", backgroundColor: "red" }}
                >
                    disconnect
                </Button>
            </CardActions>
        </Card>

    )
}
