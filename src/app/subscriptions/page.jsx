"use client"
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { ActiveSubscriptionCard } from '@/components/ActiveSubscriptionCard';
import { selectUser } from '@/redux/features/authSlice';
import { useSelector } from 'react-redux';
import { PricingSection } from '@/components/PricingSection';


const Subscriptions = () => {
    const [customerSubscribed, setCustomerSubscribed] = useState(false);
    const theme = useTheme()
    const { stripe: { stripeId, stripeSubscriptionStatus } } = useSelector(selectUser);
    console.log(stripeId, stripeSubscriptionStatus);
    // Define the pricing plans data


    return (

        <Box
            sx={{
                paddingTop: '110px',
                height: '100vh',
                // width: '100vw',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                // backgroundColor: theme.palette.background.paper,
                color: theme.palette.primary.main

            }}
        >
            {stripeSubscriptionStatus ? <ActiveSubscriptionCard /> : <PricingSection />}
        </Box>
    );
};

export default Subscriptions;


