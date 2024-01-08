"use client"
import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, CardActions } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { selectUser } from '@/redux/features/authSlice';
import { useSelector } from 'react-redux';
import { createCustomerPortal } from '@/libs/stripe/createCustomerPortal';
import { formatDate } from '@/utility/formatDate';

export const ActiveSubscriptionCard = () => {
    const theme = useTheme();
    const { stripeId, subscriptionEnd, subscriptionInterval, stripeSubscriptionStatus } = useSelector(selectUser);

    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.paper, }}>

            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Billing
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#919DA8', fontSize: "18px" }}>
                            Update your payment information or switch plans.
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <hr style={{ margin: "5px 15px" }} />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "8px" }}>
                <Typography
                    variant="body3"
                    sx={{
                        "&hover": { bgcolor: theme.palette.background.paper },
                        color: "#1681B1",
                        fontSize: "19px",
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        fontWeight: "bold",
                        padding: "5px 15px  ",
                    }}
                >
                    Pro Membership
                </Typography>
                <Typography
                    variant="body3"
                    sx={{
                        bgcolor: theme.palette.background.default,
                        color: "#cccc",
                        fontSize: "19px",
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        fontWeight: "bold",
                        padding: "5px 15px  ",
                        borderRadius: "5px",
                    }}
                >
                    {subscriptionInterval === "year" ? "Yearly" : "Monthly"}
                </Typography>
            </div>


            <CardContent>
                <Typography variant="body2" sx={{ fontSize: "16px", }}>
                    $9.99
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "16px", marginTop: "5px", color: "#919DA8" }}>
                    {stripeSubscriptionStatus === "active" ? "Renews on" : "Trial ends on"} {formatDate(subscriptionEnd)}
                </Typography>
            </CardContent>
            <CardActions>
                <Link style={{ textDecoration: 'none', color: '#fff', paddingLeft: '5px' }} href="#">
                    <Box
                        component="div"
                        onClick={async () => await createCustomerPortal(stripeId)}
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
                        Manage Subscription
                    </Box>
                </Link>
            </CardActions>

        </Card>
    );
};
