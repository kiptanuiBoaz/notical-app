"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Icon, useTheme, Switch } from '@mui/material';
import Image from 'next/image';
import { FaCheck } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONNECTION_STATUS, selectUser } from '@/redux/features/authSlice';
import { selectTheme } from '@/redux/features/themeSlice';
import { disconnectNotion } from '@/libs/notion/disconnectNotion';
import { updateSelectedDbIds } from '@/libs/supabase/updateSelectedDbIds.';
import { updateDeleteDone } from '@/libs/supabase/updatedeleteDone';
import { getUserProfile } from '@/libs/supabase/getUserProfile';


export const ConnectNotion = () => {
    const [showConnections, setShowConnections] = useState(null);
    const [selectedDatabaseIds, setSelectedDatabaseIds] = useState([""]);
    const [allDatabses, setAllDatabses] = useState(null);
    const [updatingDatabseIds, setUpdatingDatabseIds] = useState(false);
    const [deleteDone, setDeleteDone] = useState(false);

    //from redux state
    const { user_id, email } = useSelector(selectUser);
    const dispatch = useDispatch();
    const theme = useTheme();
    const selectedTheme = useSelector(selectTheme);

    useEffect(() => {
        const getDbConnections = async () => {
            const { databases_all, selected_databases_ids, delete_done } = await getUserProfile(user_id);
            setAllDatabses(databases_all);
            setSelectedDatabaseIds(selected_databases_ids ?? [""]);
            setDeleteDone(delete_done);

        }
        if (allDatabses === null) getDbConnections();
    }, [user_id, allDatabses]);

    //select and deselect notionDBs
    const toggleDbConnection = async (id) => {
        setUpdatingDatabseIds(id)
        let updatedSelectedDatabaseIds;
        if (selectedDatabaseIds.includes(id)) {
            // Remove ID from selectedDatabseIds
            updatedSelectedDatabaseIds = selectedDatabaseIds.filter((dbId) => dbId !== id);
        } else {
            // Add new ID to selectedDatabseIds
            updatedSelectedDatabaseIds = [...selectedDatabaseIds, id];
        }

        // Update state with the modified array of selected database IDs
        setSelectedDatabaseIds(updatedSelectedDatabaseIds);

        // Call the function to update the selected database IDs in the backend
        await updateSelectedDbIds(user_id, email, updatedSelectedDatabaseIds);
        setUpdatingDatabseIds(null);
    }

    //toggle delete_one
    const toggleDeleteDone = async (isChecked) => {
        //set local state
        setDeleteDone(isChecked);
        //uupdate in db
        await updateDeleteDone(user_id, email, isChecked);
        //update incase of error
        const { delete_done } = await getUserProfile(user_id);
        setDeleteDone(delete_done);
    };

    return (
        <Card sx={{
            border: '1px solid gray',
            borderRadius: '10px',
            p: 2,
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden',
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "start" }}>

                    <Image src="/images/notion-icon.svg" height={50} width={50} alt='title' style={{ marginRight: "10px" }} />


                    <Box sx={{ flex: '1 1 auto', paddingLeft: "10px" }} textAlign={"start"}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Notion
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', fontSize: "18px" }}>
                            {`Congratulations! Notion has been connected successfully`}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <hr />
            <CardActions sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Switch
                    sx={{ color: theme.palette.secondary.main }}
                    checked={deleteDone}
                    onChange={(e) => toggleDeleteDone(e.target.checked)}
                    aria-label="theme mode"
                    size="lg"
                />
                <Typography variant="body2" sx={{ color: 'gray', fontSize: "15px" }}>
                    Don&lsquo;t show Events for Completed Notion Tasks
                </Typography>

            </CardActions>
            <hr />

            <CardContent>
                <Typography
                    onClick={() => setShowConnections(!showConnections)}
                    variant="body2"
                    sx={{
                        "&:hover": { backgroundColor: theme.palette.background.default },
                        color: theme.palette.primary.main,
                        fontSize: ["17px", "18px", "20px"],
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        padding: '5px 7px',
                        borderRadius: '5px',
                    }}
                >
                    Your Notion Databases to Sync       {showConnections ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </Typography>
                {showConnections && allDatabses.map(({ id, title }) => <CardActions sx={{ display: "flex", justifyContent: "space-between" }} key={id}>
                    <Typography
                        variant="body2"
                        textAlign={"start"}
                        sx={{
                            color: !selectedDatabaseIds?.includes(id) ? 'gray' : theme.palette.primary.main,
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            cursor: "pointer",
                            "&:hover": { color: theme.palette.primary.main }
                        }}
                        onClick={() => toggleDbConnection(id)}

                    >
                        {selectedDatabaseIds.includes(id) ? <FaRegSquareCheck /> : <MdOutlineCheckBoxOutlineBlank />}
                        &nbsp;&nbsp;   {title}
                    </Typography>
                    {updatingDatabseIds === id
                        ? <Image src={`/gifs/${selectedTheme}-refresh.gif`} height={20} width={20} alt='loading gif' />
                        : <BsArrowRepeat />
                    }

                </CardActions>)
                }
            </CardContent >

            <hr style={{ height: "0.5px" }} />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                        style={{ textTransform: 'none', fontSize: "17px" }}
                        variant="contained"
                        sx={{ color: "#fff", backgroundColor: "#14AE97", display: "flex", alignItems: "center" }}
                        startIcon={<FaCheck size={"20px"} />}
                    >
                        Connected
                    </Button>

                </Box>
                <Button
                    onClick={async () => {
                        await disconnectNotion(user_id, email);
                        dispatch(UPDATE_CONNECTION_STATUS({
                            connectionStatus: {
                                notion: false,
                            }
                        }))
                    }}
                    variant="contained"
                    sx={{ color: "#fff", backgroundColor: "red" }}
                >
                    disconnect
                </Button>
            </CardActions>
        </Card >
    )
}
