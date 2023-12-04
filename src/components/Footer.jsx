"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

export const Footer = () => {
    const pathname = usePathname();
    if (pathname.startsWith('/auth')) return <></>;
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'gray',
            }}
        >
            <Typography variant="body2" sx={{ color: 'white' }}>
                ©notical 2023 All rights reserved.
            </Typography>
        </Box>
    );
}


