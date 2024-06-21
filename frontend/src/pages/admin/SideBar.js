import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();

    const listItemTextStyle = {
        color: 'black',
    };

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" sx={listItemButtonStyles(location.pathname === "/" || location.pathname === "/Admin/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" || location.pathname === "/Admin/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes" sx={listItemButtonStyles(location.pathname.startsWith('/Admin/classes'))}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/subjects"))}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/teachers"))}>
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/students"))}>
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/notices"))}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/complains"))}>
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" style={listItemTextStyle} />
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
                    fontWeight: 'bold',
                }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile" sx={listItemButtonStyles(location.pathname.startsWith("/Admin/profile"))}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" sx={listItemButtonStyles(location.pathname.startsWith("/logout"))}>
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" style={listItemTextStyle} />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

// Function to apply styles to ListItemButton based on active state
const listItemButtonStyles = (isActive) => ({
    ...(isActive && {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
    }),
});

export default SideBar;
