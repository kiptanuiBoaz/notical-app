"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';
import { ConnectCalendar } from '@/components/ConnectCalendar';
import { ConnectNotion } from '@/components/ConnectNotion';
import { createStripeCustomer } from '../auth/createStripeCustomer';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loading } from 'notiflix';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { nodeApi } from '@/axios/nodeApi';
import { createAuth } from '@supabase/supabase-js'
import { getUser } from './libs/getUser';
import { getNotionAccessToken } from './libs/getNotionAccessToken';


const NOTION_CONNECTION_STRING = 'https://api.notion.com/v1/oauth/authorize?client_id=c762fab7-bc3f-4726-bf5f-08908b6ccd09&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections';

const Connections = ({ searchParams }) => {
    const [loading, setLoading] = useState(false);
    const [customerId, setCustomerId] = useState();

    const { user_id } = useSelector(selectUser);
    const theme = useTheme();

    useEffect(() => {
        const handleConnections = async () => {
            Loading.dots({
                svgColor: '#0276AA',
                backgroundColor: 'rgba(0,0,0,0.4)',
            });

            //fetch user from superbase
            const res = await getUser(user_id);
            setCustomerId(res?.customer_id);
            Loading.remove();
        };

        handleConnections();
    }, []);

    console.log(searchParams.code)

    // server request after notion consent
    useEffect(() => {
        const getNotionToken = async () => {
            const notionAccessToken = await getNotionAccessToken(user_id, searchParams.code);
            console.log(notionAccessToken, "notion access token")
        }
        if (searchParams.code) getNotionToken();

    }, [searchParams, user_id])




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
                            variant="contained"
                            sx={{ backgroundColor: "#14AE97", color: "#fff" }}
                        >
                            <Link href={NOTION_CONNECTION_STRING}>
                                Start Sync
                            </Link>

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
};

export default Connections;
