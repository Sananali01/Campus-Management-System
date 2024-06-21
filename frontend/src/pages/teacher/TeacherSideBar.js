import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // New icon for assignments
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;


    const location = useLocation();

    const listItemTextStyle = {
        color: 'black'
    };

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class" sx={{}}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`${sclassName.sclassName}`} style={listItemTextStyle}/>
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to={`/Teacher/class/assignment`}>
                    <ListItemIcon>
                        <AssignmentOutlinedIcon color={location.pathname.startsWith("/Teacher/class/student/assignment") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Upload Assignment" style={listItemTextStyle} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{
                my: 1, // Vertical margin
                borderTopWidth: '2px', // Increase border width to make it bold
                borderTopStyle: 'solid', // Ensure border is solid
                borderTopColor: '#2f3095',
            }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{
                    color: 'black',
                    fontWeight: 'bold'
                }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" style={listItemTextStyle} />
                </ListItemButton>
            </React.Fragment>
        </>
    );
}

export default TeacherSideBar;
