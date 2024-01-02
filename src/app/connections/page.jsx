"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';
import { ConnectCalendar } from '@/components/ConnectCalendar';
import { ConnectNotion } from '@/components/ConnectNotion';
import { createStripeCustomer } from './libs/createStripeCustomer';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loading } from 'notiflix';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { nodeApi } from '@/axios/nodeApi';
import { createAuth } from '@supabase/supabase-js'
import { getUser } from './libs/getUser';
import { getNotionAccessToken } from './libs/getNotionAccessToken';
import { updateTableWithCalendarIds, updateTableWithGoogleTokens, updateUserTableWithAccessToken } from './libs/updateTable';
import { getGoogleAccessToken } from './libs/getGoogleToken';
import { getGoogleCalendarIds } from './libs/getGoogleCalendarIds';
import { createNoticationChannels } from './libs/createNoticationChannels';
import { verifyNotionConnection } from './libs/verifyNotionConnection';
import { verifyGoogleConnection } from './libs/verifyGoogleConnection';


const NOTION_CONNECTION_STRING = 'https://api.notion.com/v1/oauth/authorize?client_id=c762fab7-bc3f-4726-bf5f-08908b6ccd09&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections';
const GOOGLE_CONNECTION_STRING = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections&response_type=code&client_id=474592924938-p58vbsd9l7hllhk84bee27e0oq5a6l98.apps.googleusercontent.com&access_type=offline&prompt=consent&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow'


const Connections = ({ searchParams }) => {
    const [loading, setLoading] = useState(true);
    const [notionConnection, setNotionConnection] = useState(false);
    const [googleConnection, setGoogleConnection] = useState(false);
    const [customerId, setCustomerId] = useState();

    const { user_id, email } = useSelector(selectUser);
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname()

    // useEffect(() => {
    //     const handleConnections = async () => {
    //         Loading.dots({
    //             svgColor: '#0276AA',
    //             backgroundColor: 'rgba(0,0,0,0.4)',
    //         });

    //         //fetch user from superbase
    //         const res = await getUser(user_id);
    //         console.log(res);
    //         setCustomerId(res?.customer_id);
    //         Loading.remove();
    //     };

    //     if (!searchParams.code) handleConnections();
    // }, []);

    console.log(notionConnection)



    // server request after notion consent
    useEffect(() => {
        const createNotionConnection = async () => {
            const notionAccessToken = await getNotionAccessToken(user_id, searchParams.code);
            updateUserTableWithAccessToken(user_id, notionAccessToken, email);
            console.log(notionAccessToken, "notion access token")
        }

        const createGoogleConnection = async () => {
            const { access_token, refresh_token } = await getGoogleAccessToken(searchParams.code);
            if (access_token) updateTableWithGoogleTokens(access_token, refresh_token, email, user_id);

            const calendarIds = await getGoogleCalendarIds(refresh_token);
            if (calendarIds) await updateTableWithCalendarIds(calendarIds, email, user_id);

            const notificationchannels = await createNoticationChannels(access_token)

        }

        //check if user has authorized notion connection
        const checkNotionConnection = async () => {
            const { notion_secret_key } = await getUser(user_id);
            const { is_valid } = await verifyNotionConnection(notion_secret_key)
            setNotionConnection(is_valid);
        }
        //check if user has authorized google connection
        const checkGoogleConnection = async () => {
            const { google_access_token } = await getUser(user_id);
            const { is_valid } = await verifyGoogleConnection(google_access_token);
            setGoogleConnection(is_valid)
        }

        //subsequent request after redirect from consecnt screens
        if (searchParams.code) {
            if (searchParams.code.length > 36) {
                createGoogleConnection()
            } else {
                createNotionConnection();
            }
            router.push(pathname);
        }

        checkGoogleConnection();
        checkNotionConnection();

    }, [searchParams, user_id, email])


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
                            style={{ textTransform: 'none', fontSize: "17px" }}
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
                    {notionConnection
                        ? <ConnectNotion
                            title="Notion"
                            description="Connect your notion pages"
                            button="Connect"
                            image="/images/notion-icon.svg"
                            setNotionConnection={setNotionConnection}
                        />
                        : <ConnectionCard
                            title="Notion"
                            description="Connect your notion pages"
                            button="Connect"
                            image="/images/notion-icon.svg"
                            connectionLink={NOTION_CONNECTION_STRING}
                        />
                    }
                    {googleConnection
                        ? <ConnectCalendar
                            title="Google Calendar"
                            description="Connect your Google Calendar"
                            button="Connect"
                            image="/images/calendar-icon.svg"
                            setGoogleConnection={setGoogleConnection}
                        />

                        : <ConnectionCard
                            title="Google Calendar"
                            description="Connect your Google Calendar"
                            button="Connect"
                            image="/images/calendar-icon.svg"
                            connectionLink={GOOGLE_CONNECTION_STRING}
                        />

                    }
                </Box>
            </Box>
            {/* <Footer /> */}
        </Box>
    );
};

export default Connections;
