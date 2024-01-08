"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';
import { ConnectCalendar } from '@/components/ConnectCalendar';
import { ConnectNotion } from '@/components/ConnectNotion';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { getNotionAccessToken } from '@/libs/notion/getNotionAccessToken';
import { updateTableWithCalendarIds, updateTableWithGoogleTokens, updateUserTableWithAccessToken } from '@/libs/supabase/updateTable';
import { getGoogleAccessToken } from '@/libs/google/getGoogleToken';
import { getGoogleCalendarIds } from '@/libs/google/getGoogleCalendarIds';
import { verifyGoogleConnection } from '@/libs/google/verifyGoogleConnection';
import { verifyNotionConnection } from '@/libs/notion/verifyNotionConnection';
import { toggleSyncStatus } from '@/libs/utils/toggleSyncStatus';
import { getCurrentDate } from '@/libs/utils/getCurrentDate';
import { getUser } from '@/libs/supabase/getUser';
import { createNoticationChannels } from '@/libs/google/createNoticationChannels';

const NOTION_CONNECTION_STRING = 'https://api.notion.com/v1/oauth/authorize?client_id=c762fab7-bc3f-4726-bf5f-08908b6ccd09&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections';
const GOOGLE_CONNECTION_STRING = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fconnections&response_type=code&client_id=474592924938-p58vbsd9l7hllhk84bee27e0oq5a6l98.apps.googleusercontent.com&access_type=offline&prompt=consent&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow';

const Connections = ({ searchParams }) => {
    const [loading, setLoading] = useState(false);
    const [notionConnection, setNotionConnection] = useState(false);
    const [googleConnection, setGoogleConnection] = useState(false);
    const [customerId, setCustomerId] = useState();
    const [stripeConnection, setStriepeConnection] = useState(true);
    const [syncStatus, setSyncStatus] = useState(false);
    const [selectedDatabseIds, setSelectedDatabseIds] = useState([]);

    const { user_id, email, full_name } = useSelector(selectUser);
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    // server request after notion consent
    useEffect(() => {
        const runEffect = async () => {
            try {
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
                    const user = await getUser(user_id);
                    if (user) {
                        const { notion_secret_key, selected_databases_ids, active } = user;
                        const { is_valid } = await verifyNotionConnection(notion_secret_key)
                        setNotionConnection(is_valid);
                        setSelectedDatabseIds(selected_databases_ids);
                        setSyncStatus(active);
                    }

                }
                //check if user has authorized google connection
                const checkGoogleConnection = async () => {
                    const data = await getUser(user_id);
                    if (data?.google_access_token) {
                        const { is_valid } = await verifyGoogleConnection(data.google_access_token);
                        setGoogleConnection(is_valid)
                    }

                }

                //subsequent request after redirect from consecnt screens
                if (searchParams.code) {
                    if (searchParams.code.length > 36) {
                        await createGoogleConnection()
                    } else {
                        await createNotionConnection();
                    }
                    router.push(pathname);
                }

                checkGoogleConnection();
                checkNotionConnection();

                console.log("running useEffect");
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };

        runEffect();
    }, [user_id, email])



    return (
        <Box
            sx={{
                paddingTop: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                backgroundColor: theme.palette.background.paper,
                overflow: 'hidden',
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
                <Grid item xs={12} >
                    <Grid container justifyContent="space-between" sx={{ padding: 2, fontSize: '21px' }}>
                        <Grid item alignItems={"start"}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: ['24px', '28px', '32px'] }}>
                                Your Connections
                            </Typography>
                            <Typography textAlign={"start"} variant="body1" sx={{ color: 'gray', fontSize: ['14px', '16px'] }}>
                                {syncStatus ? getCurrentDate() : 'Not synced yet'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{ fontSize: ['14px', '16px'] }}
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: syncStatus ? '#DC4D00' : '#00A78E',
                                    color: '#fff',
                                    mt: '1rem',
                                }}
                                onClick={() =>
                                    toggleSyncStatus(user_id, syncStatus, full_name, stripeConnection, router, notionConnection, googleConnection, email, setSyncStatus)
                                }
                            >
                                {syncStatus ? 'Stop Sync' : 'Start Sync'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>




                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: ['1fr', '1fr'],
                        gap: '1rem',
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {notionConnection ? (
                        <ConnectNotion
                            title="Notion"
                            description="Congratulations! Notion has been connected successfully."
                            button="Connect"
                            image="/images/notion-icon.svg"
                            setNotionConnection={setNotionConnection}
                        />
                    ) : (
                        <ConnectionCard
                            title="Notion"
                            description="Connect your Notion pages"
                            button="Connect"
                            image="/images/notion-icon.svg"
                            connectionLink={NOTION_CONNECTION_STRING}
                        />
                    )}
                    {googleConnection ? (
                        <ConnectCalendar
                            title="Google Calendar"
                            description="Your Google Calendar is connected!"
                            button="Connect"
                            image="/images/calendar-icon.svg"
                            setGoogleConnection={setGoogleConnection}
                        />
                    ) : (
                        <ConnectionCard
                            title="Google Calendar"
                            description="Connect your Google Calendar"
                            button="Connect"
                            image="/images/calendar-icon.svg"
                            connectionLink={GOOGLE_CONNECTION_STRING}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Connections;
