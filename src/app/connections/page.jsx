"use client"
import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';

const Connections = () => {
    const theme = useTheme();
    return (

        <Box
            sx={{
                marginTop: '90px',
                height: '100vh',
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: ['95%', '70%', '50%'],
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '2rem',
                    backgroundColor: theme.palette.background.default,
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: ['column', 'row'],
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2rem',
                    }}
                >
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Your Connections
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'gray' }}>
                            Not synced yet
                        </Typography>

                    </Box>

                    <Box sx={{ flex: '0 0 auto', marginTop: ['1rem', '0'] }}>
                        <Button variant="contained" sx={{ backgroundColor: "#14AE97", color: "#fff" }}>
                            Start Sync
                        </Button>
                    </Box>
                    <hr />
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: ['1fr', '1fr'],
                        gap: '1rem',
                    }}
                >
                    <ConnectionCard
                        title="Notion"
                        description="Connect your notion pages"
                        button="Connect"
                        image="/images/notion-icon.svg"
                    />
                    <ConnectionCard
                        title="Google Calendar"
                        description="Connect your Google Calendar"
                        button="Connect"
                        image="/images/calendar-icon.svg"
                    />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

export default Connections;