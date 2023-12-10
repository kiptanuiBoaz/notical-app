import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Icon, useTheme } from '@mui/material';
import Image from 'next/image';

export const ConnectedCard = ({ title, description, button, image }) => {
    const theme = useTheme();
    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={image} height={50} width={50} alt='title' style={{ marginRight: "10px" }} />

                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <hr />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" sx={{ color: "#fff", backgroundColor: "#14AE97" }}>
                        Connected
                    </Button>
                    <Button variant="contained" sx={{ color: "#fff", backgroundColor: "#1681B1" }}>
                        Connect
                    </Button>
                </Box>
                <Button variant="contained" sx={{ color: "#fff", backgroundColor: "red" }}>
                    disconnect
                </Button>
            </CardActions>
        </Card>

    )
}
