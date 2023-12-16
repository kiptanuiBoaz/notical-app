"use client"
import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';
import { ConnectCalendar } from '@/components/ConnectCalendar';
import { ConnectNotion } from '@/components/ConnectNotion';
import { createStripeCustomer } from './libs/createStripeCustomer';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { getStripeCustomerId } from './libs/getStripeCustomerId';
import { BsNutFill } from 'react-icons/bs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Connections = () => {
    const [loading, setLoading] = useState(false);

    const [customerId, setCustomerId] = useState(BsNutFill);
    const supabase = createClientComponentClient()

    const theme = useTheme();
    const { email, full_name, user_id } = useSelector(selectUser);

    const handleConnection = async () => {
        const customer = await createStripeCustomer(full_name, email);
        const fetchedCustomer = await getStripeCustomerId(customer.data.id)
        setCustomerId(fetchedCustomer.data.id);
        updateProfile();
        console.log(await getUser(user_id))
    }

    async function updateProfile() {
        try {
            setLoading(true)

            const res = await supabase.from('users').upsert({
                user_id, email, is_active: false, customer_id: customerId,
            })
            if (res?.error) throw error

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getUser = async (id) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', id)
                .single()
            return JSON.stringify(data)
        } catch (error) {
            console.error(error.message)
        }
    }


    return (

        <Box
            sx={{
                paddingTop: '90px',
                // height: '100vh',
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
                        <Button
                            // onClick={() => setConnecting(!connecting)} 
                            onClick={() => handleConnection()}
                            variant="contained"
                            sx={{ backgroundColor: "#14AE97", color: "#fff" }}
                        >
                            Start Sync
                        </Button>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: ['1fr', '1fr'],
                        gap: '1rem',
                    }}
                >
                    {loading ? <>
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

                    </>
                        : <>



                            <ConnectNotion
                                title="Notion"
                                description="Connect your notion pages"
                                button="Connect"
                                image="/images/notion-icon.svg"
                            />


                            <ConnectCalendar
                                title="Google Calendar"
                                description="Connect your Google Calendar"
                                button="Connect"
                                image="/images/calendar-icon.svg"
                            />
                        </>
                    }
                </Box>
            </Box>
            {/* <Footer /> */}
        </Box>
    );
}

export default Connections;