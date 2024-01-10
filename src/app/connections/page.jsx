"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { ConnectionCard } from '@/components/ConnectionCard';
import { Footer } from '@/components/Footer';
import { useTheme } from '@emotion/react';
import { ConnectCalendar } from '@/components/ConnectCalendar';
import { ConnectNotion } from '@/components/ConnectNotion';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_AUTH, UPDATE_CONNECTION_STATUS, selectUser } from '@/redux/features/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { getNotionAccessToken } from '@/libs/notion/getNotionAccessToken';
import { updateTableWithCalendarIds, updateTableWithGoogleTokens, updateUserTableWithAccessToken } from '@/libs/supabase/updateTable';
import { getGoogleAccessToken } from '@/libs/google/getGoogleToken';
import { getGoogleCalendarIds } from '@/libs/google/getGoogleCalendarIds';
import { verifyGoogleConnection } from '@/libs/google/verifyGoogleConnection';
import { verifyNotionConnection } from '@/libs/notion/verifyNotionConnection';
import { toggleSyncStatus } from '@/libs/utils/toggleSyncStatus';
import { getCurrentDate } from '@/libs/utils/getCurrentDate';
import { createNoticationChannels } from '@/libs/google/createNoticationChannels';
import { getUserProfile } from '@/libs/supabase/getUserProfile';
import { formatDate } from '@/utility/formatDate';


const Connections = ({ searchParams }) => {
    const [syncStatus, setSyncStatus] = useState(false);
    const [lastSync, setLastSync] = useState();

    const { user_id, email, full_name, stripe: { stripeSubscriptionStatus }, connectionStatus: { google: googleConnection, notion: notionConnection } } = useSelector(selectUser);
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    // server request after notion consent
    useEffect(() => {
        const runEffect = async () => {
            try {
                const createNotionConnection = async () => {
                    const notionAccessToken = await getNotionAccessToken(user_id, searchParams.code);
                    updateUserTableWithAccessToken(user_id, notionAccessToken, email);
                    dispatch(UPDATE_CONNECTION_STATUS({
                        connectionStatus: {
                            notion: true,
                        }
                    }))
                }

                const createGoogleConnection = async () => {
                    const { access_token, refresh_token } = await getGoogleAccessToken(searchParams.code);
                    if (access_token) updateTableWithGoogleTokens(access_token, refresh_token, email, user_id);

                    const calendarIds = await getGoogleCalendarIds(refresh_token);
                    if (calendarIds) await updateTableWithCalendarIds(calendarIds, email, user_id);

                    //creae notification channels
                    await createNoticationChannels(access_token);
                    dispatch(UPDATE_CONNECTION_STATUS({
                        connectionStatus: {
                            google: true,
                        }
                    }))
                }

                //check if user has authorized notion connection
                const checkNotionConnection = async () => {
                    const user = await getUserProfile(user_id);
                    if (user) {
                        const { notion_secret_key, selected_databases_ids, active } = user;
                        const { is_valid } = await verifyNotionConnection(notion_secret_key)
                        dispatch(UPDATE_CONNECTION_STATUS({
                            connectionStatus: {
                                notion: is_valid,
                            }
                        }))
                    }

                }

                //check if user has authorized google connection
                const checkGoogleConnection = async () => {
                    const data = await getUserProfile(user_id);
                    if (data?.google_access_token) {
                        const { is_valid } = await verifyGoogleConnection(data.google_access_token);
                        dispatch(UPDATE_CONNECTION_STATUS({
                            connectionStatus: {
                                google: is_valid,
                            }
                        }))
                    }
                }

                //subsequent request after redirect from consent screens
                if (searchParams.code) {
                    if (searchParams.code.length > 36) {
                        await createGoogleConnection()
                    } else {
                        await createNotionConnection();
                    }

                    router.push(pathname);
                }

                if (googleConnection === null || undefined) checkGoogleConnection();
                if (notionConnection === null || undefined) checkNotionConnection();

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
                backgroundColor: theme.palette.background.default,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: ['95%', '70%', '50%'],
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '2rem',

                }}
            >
                <Grid item xs={12} >
                    <Grid container justifyContent="space-between" sx={{ padding: 2, fontSize: '21px' }}>
                        <Grid item alignItems={"start"}>
                            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', fontSize: ['24px', '28px', '32px'] }}>
                                Your Connections
                            </Typography>
                            <Typography textAlign={"start"} variant="body1" sx={{ color: theme.palette.secondary.main, fontSize: ['14px', '16px'] }}>
                                {syncStatus ? `Last Sync: ${formatDate(lastSync)}` : 'Not synced yet'}
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
                                    toggleSyncStatus(user_id, syncStatus, full_name, stripeSubscriptionStatus, router, notionConnection, googleConnection, email, setSyncStatus, setLastSync)
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
                    {notionConnection
                        ? <ConnectNotion />
                        : <ConnectionCard
                            title="Notion"
                            image="/images/notion-icon.svg"
                            connectionLink={process.env.NEXT_PUBLIC_NOTION_CONNECTION_STRING}
                        />
                    }

                    {googleConnection
                        ? <ConnectCalendar />
                        : <ConnectionCard
                            title="Google Calendar"
                            image="/images/calendar-icon.svg"
                            connectionLink={process.env.NEXT_PUBLIC_GOOGLE_CONNECTION_STRING}
                        />
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Connections;
