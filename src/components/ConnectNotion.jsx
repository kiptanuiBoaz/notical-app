import React, { useState } from 'react';
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
import { disconnectNotion } from '@/app/connections/libs/disconnectNotion';

export const ConnectNotion = ({ title, description, image, setNotionConnection }) => {
    const [showConnections, setShowConnections] = useState(false);

    //from redux state
    const { user_id, email } = useSelector(selectUser);


    const dbConnections = [
        'Lorem ipsum dolor sit amet, consectetur',
        'Pellentesque habitant morbi tristique',
        'Sed do eiusmod tempor incididunt ut labore et',
        'Ut enim ad minim veniam, quis nostrud ',
        'Duis aute irure dolor in reprehenderit '
    ];

    const theme = useTheme();
    return (
        <Card sx={{ border: '1px solid gray', borderRadius: '10px', p: 2, backgroundColor: theme.palette.background.paper }}>
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
                <Switch size="lg" />
                <Typography variant="body2" sx={{ color: 'gray', fontSize: "15px" }}>
                    Don&lsquo;t show Events for Completed Notion Tasks
                </Typography>

            </CardActions>
            <hr />


            <CardContent>
                <Typography
                    onClick={() => setShowConnections(!showConnections)}
                    variant="body2"
                    sx={{ color: theme.palette.primary.main, fontSize: "20px", display: "flex", justifyContent: "space-between", cursor: "pointer", }}
                >
                    Your Notion Databases to Sync       {showConnections ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </Typography>
                {showConnections && dbConnections.map((text) => <CardActions sx={{ display: "flex", justifyContent: "space-between" }} key={text}>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: "18px" }}>
                        <MdOutlineCheckBoxOutlineBlank /> <FaRegSquareCheck />  {text}
                    </Typography>
                    <BsArrowRepeat />
                </CardActions>)}
            </CardContent>

            <hr />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" sx={{ color: "#fff", backgroundColor: "#14AE97", display: "flex", alignItems: "center" }}>
                        <FaCheck />
                        Connected
                    </Button>

                </Box>
                <Button
                    onClick={() => {
                        disconnectNotion(user_id, email);
                        setNotionConnection(false);
                    }}
                    variant="contained"
                    sx={{ color: "#fff", backgroundColor: "red" }}
                >
                    disconnect
                </Button>
            </CardActions>
        </Card>
    )
}
