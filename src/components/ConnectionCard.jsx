import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, CardActions } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const ConnectionCard = ({ title, description, image, connectionLink }) => {
    const theme = useTheme();

    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.default, }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={image} height={50} width={50} alt='title' style={{ marginRight: "10px" }} />
                    <Box sx={{ flex: '1 1 auto', paddingLeft: "10px" }} textAlign={"start"}>
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
            <CardActions>
                <Link style={{ textDecoration: 'none', color: '#fff' }} href={connectionLink}>

                    <Box
                        component="div"
                        sx={{
                            backgroundColor: "#1681B1",
                            padding: '7px 18px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: "#0e5a7f",
                            },
                        }}
                    >
                        Connect
                    </Box>

                </Link>
            </CardActions>
        </Card>
    );
};
