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
import Notiflix, { Confirm, Loading, Notify, Report } from 'notiflix';
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
import { updateActiveField } from './libs/updateActiveField';


const NOTION_CONNECTION_STRING = 'https://api.notion.com/v1/oauth/authorize?client_id=c762fab7-bc3f-4726-bf5f-08908b6ccd09&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections';
const GOOGLE_CONNECTION_STRING = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections&response_type=code&client_id=474592924938-p58vbsd9l7hllhk84bee27e0oq5a6l98.apps.googleusercontent.com&access_type=offline&prompt=consent&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow'



const Connections = ({ searchParams }) => {
    const [loading, setLoading] = useState(true);
    const [notionConnection, setNotionConnection] = useState(true);
    const [googleConnection, setGoogleConnection] = useState(false);
    const [customerId, setCustomerId] = useState();
    const [stripeConnection, setStriepeConnection] = useState(true);
    const [syncStatus, setSyncStatus] = useState(false);
    const [selectedDatabseIds, setSelectedDatabseIds] = useState([]);

    const { user_id, email, full_name } = useSelector(selectUser);
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



    const checkSyncStatus = async () => {
        const { selected_databases_ids } = await getUser(user_id);
        Confirm.show(
            `${syncStatus ? "Stop" : "Start "} synchronization ?`,
            `${full_name.split(" ")[0]},${syncStatus
                ? "This will stop all your current Notion Databases synchronization to Google Calendar"
                : "this operation will synchronize all your selected Notion databases with your Google Calendar "
            }`,
            'Continue',
            'Cancel',
            async () => {
                if (stripeConnection) {
                    Notify.success("Successfully created stripe connection")
                } else {
                    Notify.failure(" Please add opt into a subscription ")
                    return router.push("/subscriptions")
                }


                if (notionConnection) {
                    Notify.success("Successfully created Notion connection")
                } else {
                    return Notify.failure(" Please create a Notion Connection ")
                }

                if (!syncStatus) {
                    if (selected_databases_ids.length > 0) {
                        Notify.success("Connected atleast one notion database")
                    } else {
                        return Report.warning(
                            'No Database Selection',
                            'Please Connect Atleast one Notion Database before attempting to sync again',
                            'Okay',
                        );
                    }
                }



                if (googleConnection) {
                    Notify.success("Successfully created Google Calendar connection")
                } else {
                    return Notify.failure("Please create a Google Calendar  Connection ")
                }
                await updateActiveField(user_id, email, !syncStatus);
                Notify.success(!syncStatus ? "Successfully synced  Google Calendar and Notion" : "Succesfully stopped sync")
                setSyncStatus(!syncStatus);
            },
            () => {

            },
            {
            },
        );


    }

    // server request after notion consent
    useEffect(() => {
        const createNotionConnection = async () => {
            const notionAccessToken = await getNotionAccessToken(user_id, searchParams.code);
            updateUserTableWithAccessToken(user_id, notionAccessToken, email);

        }

        const createGoogleConnection = async () => {
            const { access_token, refresh_token } = await getGoogleAccessToken(searchParams.code);
            if (access_token) updateTableWithGoogleTokens(access_token, refresh_token, email, user_id);

            const calendarIds = await getGoogleCalendarIds(refresh_token);
            if (calendarIds) await updateTableWithCalendarIds(calendarIds, email, user_id);

            //creae notification channels
            await createNoticationChannels(access_token);

        }

        //check if user has authorized notion connection
        const checkNotionConnection = async () => {
            const { notion_secret_key, selected_databases_ids } = await getUser(user_id);
            const { is_valid } = await verifyNotionConnection(notion_secret_key)
            setNotionConnection(is_valid);
            setSelectedDatabseIds(selected_databases_ids);
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
        console.log("running useEffect")
    }, [searchParams, user_id, email, pathname, router])


    return (
        <Box
            sx={{
                paddingTop: '90px',
                // height: '100vh',
                backgroundColor: theme.palette.background.default,
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
                            style={{ fontSize: "17px" }}
                            variant="contained"
                            sx={{ textTransform: 'none', backgroundColor: syncStatus ? "#DC4D00" : "#00A78E", color: "#fff" }}
                            onClick={checkSyncStatus}
                        >
                            {syncStatus ? "Stop Sync" : "Start Sync"}
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
        </Box >
    );
};

export default Connections;
