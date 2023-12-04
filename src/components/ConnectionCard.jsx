import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Icon } from '@mui/material';

export const ConnectionCard = ({ title, description, button }) => {
    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }}>star</Icon>
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
            <CardActions>
                <Button variant="outlined" color="primary">
                    {button}
                </Button>
            </CardActions>
        </Card>
    );
}
