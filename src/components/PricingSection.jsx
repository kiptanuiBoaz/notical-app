"use client"
import React from 'react';
import { FaCheck } from "react-icons/fa";
import { Box, Card, CardContent, CardActions, Typography, Button, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { plans } from '@/app/subscriptions/plans';
import { createCheckOutSession } from '@/libs/stripe/createCheckOutSession';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';


export const PricingSection = () => {
    const theme = useTheme();
    const router = useRouter()
    const { stripeId } = useSelector(selectUser);
    return (
        <Box
            sx={{
                width: ['95%', '70%', '45%'],
                border: '1px solid gray',
                borderRadius: '10px',
                padding: '3rem 2rem',
                backgroundColor: theme.palette.background.default,
            }}
        >

            <Box sx={{ textAlign: 'left', marginBottom: .5 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Get Notycal Pro
                </Typography>
                <Typography variant="body1" component="p" sx={{ color: '#777' }}>
                    Get to Notical Pro for effortless two-way synchronization between Notion and Google Calendar
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                {plans.map(({ price, title, features, priceId, cta, range, trial }) =>
                    <Card key={title} sx={{ width: '1000%', padding: "20px 10px", margin: "20px 0", border: '1px solid #ccc', borderRadius: 2, backgroundColor: theme.palette.background.default, }}>

                        <CardContent>

                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: "30px", textAlign: 'left', marginTop: 2 }}>
                                {title}
                            </Typography>

                            <List>
                                {features.map((feature, index) => (

                                    <ListItem key={index} sx={{ padding: 0, }}>

                                        <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                                            <FaCheck sx={{ color: theme.palette.primary.main }} />
                                        </ListItemIcon>

                                        <ListItemText primary={feature} sx={{ fontSize: "30px" }} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold', textAlign: 'left', marginTop: 2, marginBottom: 1 }}>
                                {price} / {range}
                            </Typography>

                            <Typography variant="body2" component="p" sx={{ color: '#777', textAlign: 'left', marginBottom: 1 }}>
                                {trial} days free trial
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>

                            <Button variant="contained" color="success" sx={{}} onClick={async () => await createCheckOutSession(stripeId, priceId, trial)}>
                                {cta}
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </Box>


        </Box>
    )
}
