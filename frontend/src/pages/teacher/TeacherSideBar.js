import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
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
                <ListItemButton component={Link} to="/" sx={listItemButtonStyles(location.pathname === "/" || location.pathname === "/Teacher/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" || location.pathname === "/Teacher/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class" sx={listItemButtonStyles(location.pathname === "/Teacher/class")}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname === "/Teacher/class" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`${sclassName.sclassName}`} style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/complain" sx={listItemButtonStyles(location.pathname === "/Teacher/complain")}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname === "/Teacher/complain" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class/assignment" sx={listItemButtonStyles(location.pathname === "/Teacher/class/assignment")}>
                    <ListItemIcon>
                        <AssignmentOutlinedIcon color={location.pathname === "/Teacher/class/assignment" ? 'primary' : 'inherit'} />
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
                <ListItemButton component={Link} to="/Teacher/profile" sx={listItemButtonStyles(location.pathname === "/Teacher/profile")}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname === "/Teacher/profile" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" sx={listItemButtonStyles(location.pathname === "/logout")}>
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname === "/logout" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" style={listItemTextStyle} />
                </ListItemButton>
            </React.Fragment>
        </>
    );
}

// Function to apply styles to ListItemButton based on active state
const listItemButtonStyles = (isActive) => ({
    ...(isActive && {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
    }),
});

export default TeacherSideBar;
