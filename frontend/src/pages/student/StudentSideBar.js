import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();

    const listItemTextStyle = {
        color: 'black'
    };

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" sx={listItemButtonStyles(location.pathname === "/" || location.pathname === "/Student/dashboard")}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" || location.pathname === "/Student/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects" sx={listItemButtonStyles(location.pathname.startsWith("/Student/subjects"))}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/assignments" sx={listItemButtonStyles(location.pathname.startsWith("/Student/assignments"))}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/assignments") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Assignments" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance" sx={listItemButtonStyles(location.pathname.startsWith("/Student/attendance"))}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" style={listItemTextStyle} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain" sx={listItemButtonStyles(location.pathname.startsWith("/Student/complain"))}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" style={listItemTextStyle} />
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
                <ListItemButton component={Link} to="/Student/profile" sx={listItemButtonStyles(location.pathname.startsWith("/Student/profile"))}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
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

export default StudentSideBar;
