import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Icon, useTheme, Switch } from '@mui/material';
import Image from 'next/image';
import { FaCheck } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { selectTheme } from '@/redux/features/themeSlice';
import { disconnectNotion } from '@/libs/notion/disconnectNotion';
import { getUser } from '@/libs/supabase/getUser';
import { updateSelectedDbIds } from '@/libs/supabase/updateSelectedDbIds.';


export const ConnectNotion = ({ title, description, image, setNotionConnection }) => {
    const [showConnections, setShowConnections] = useState(null);
    const [selectedDatabseIds, setSelectedDatabseIds] = useState([]);
    const [allDatabses, setAllDatabses] = useState([]);
    const [updatingDatabseIds, setUpdatingDatabseIds] = useState(false);
    const [deleteDone, setDeleteDone] = useState(false);

    //from redux state
    const { user_id, email } = useSelector(selectUser);
    useEffect(() => {
        const getDbConnections = async () => {
            const { databases_all, selected_databases_ids, delete_done } = await getUser(user_id);
            setAllDatabses(databases_all);
            setSelectedDatabseIds(selected_databases_ids);
            setDeleteDone(delete_done);
        }
        getDbConnections();
    }, [user_id]);

    //select and deselect notionDBs
    const toggleDbConnection = async (id) => {
        setUpdatingDatabseIds(id)
        let updatedSelectedDatabaseIds;
        if (selectedDatabseIds.includes(id)) {
            // Remove ID from selectedDatabseIds
            updatedSelectedDatabaseIds = selectedDatabseIds.filter((dbId) => dbId !== id);
        } else {
            // Add new ID to selectedDatabseIds
            updatedSelectedDatabaseIds = [...selectedDatabseIds, id];
        }

        // Update state with the modified array of selected database IDs
        setSelectedDatabseIds(updatedSelectedDatabaseIds);

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
        const { delete_done } = await getUser(user_id);
        setDeleteDone(delete_done);
    };


    const theme = useTheme();
    const selectedTheme = useSelector(selectTheme);
    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.default }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Box sx={{ m: 2, height: "30px" }}> */}
                    <Image src={image} height={50} width={50} alt='title' style={{ marginRight: "10px" }} />
                    {/* </Box> */}

                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', fontSize: "18px" }}>
                            {description}
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
                        "&hover": { bgcolor: theme.palette.background.paper },
                        color: theme.palette.primary.main,
                        fontSize: "20px", display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                    }}
                >
                    Your Notion Databases to Sync       {showConnections ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </Typography>
                {showConnections && allDatabses.map(({ id, title }) => <CardActions sx={{ display: "flex", justifyContent: "space-between" }} key={id}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: selectedDatabseIds.includes(id) ? theme.palette.primary.main : 'gray',
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { color: theme.palette.primary.main }
                        }}
                        onClick={() => toggleDbConnection(id)}

                    >
                        {selectedDatabseIds.includes(id) ? <FaRegSquareCheck /> : <MdOutlineCheckBoxOutlineBlank />}
                        &nbsp;&nbsp;
                        {title}
                    </Typography>
                    {updatingDatabseIds === id
                        ? <Image src={`/gifs/${selectedTheme}-refresh.gif`} height={20} width={20} alt='loading gif' />
                        : <BsArrowRepeat />
                    }



                </CardActions>)
                }
            </CardContent >

            <hr />
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
                        setNotionConnection(false);
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
