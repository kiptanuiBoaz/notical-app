'use client' // Error components must be Client Components
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Paper, useTheme } from '@mui/material';
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    const handleRefresh = () => {
        window.location.reload();
    };
    const theme = useTheme()
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Paper style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography paragraph>
                        We are sorry, but an unexpected error occurred. Please try refreshing the page or{' '}
                        <Link href="/" style={{ color: theme.palette.primary.paper, }}>
                            go back to the homepage
                        </Link>
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleRefresh}>
                        Refresh Page
                    </Button>
                </Paper>
            </div>
        </div>
    )
}