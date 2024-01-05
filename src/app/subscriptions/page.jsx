"use client"
import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { FaCheck } from "react-icons/fa";
import { plans } from "./plans";
import { ActiveSubscriptionCard } from '@/components/ActiveSubscriptionCard';


const Subscriptions = () => {
    const [customerSubscribed, setCustomerSubscribed] = useState(true);
    const theme = useTheme()
    // Define the pricing plans data


    return (

        <Box
            sx={{
                paddingTop: '90px',
                // height: '100vh',
                // width: '100vw',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.primary.main

            }}
        >{customerSubscribed
            ? <ActiveSubscriptionCard />
            :
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
                    {plans.map((plan, index) => (

                        <Card key={index} sx={{ width: '1000%', padding: "20px 10px", margin: "20px 0", border: '1px solid #ccc', borderRadius: 2, backgroundColor: theme.palette.background.default, }}>

                            <CardContent>

                                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: "30px", textAlign: 'left', marginTop: 2 }}>
                                    {plan.title}
                                </Typography>

                                <List>
                                    {plan.features.map((feature, index) => (

                                        <ListItem key={index} sx={{ padding: 0, }}>

                                            <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                                                <FaCheck sx={{ color: theme.palette.primary.main }} />
                                            </ListItemIcon>

                                            <ListItemText primary={feature} sx={{ fontSize: "30px" }} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Typography variant="h6" component="p" sx={{ fontWeight: 'bold', textAlign: 'left', marginTop: 2, marginBottom: 1 }}>
                                    {plan.price} / {plan.range}
                                </Typography>

                                <Typography variant="body2" component="p" sx={{ color: '#777', textAlign: 'left', marginBottom: 1 }}>
                                    {plan.trial}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>

                                <Button variant="contained" color="success" sx={{}}>
                                    {plan.cta}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>


            </Box>}
        </Box>
    );
};

export default Subscriptions;


