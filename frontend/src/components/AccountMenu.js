import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import {  Logout } from '@mui/icons-material';
// import { Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {String(currentUser.name).charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={`/${currentRole}/profile`} sx={styles.menuItem}>
                    <Avatar />
                    <Typography variant="body1">Profile</Typography>
                </MenuItem>
                <Divider sx={{
                    my: 1, // Vertical margin
                    borderTopWidth: '2px', // Increase border width to make it bold
                    borderTopStyle: 'solid', // Ensure border is solid
                    borderTopColor: '#2f3095',
                }} />
                {/* <MenuItem
                    component={Link}
                    to={`/${currentRole}/settings`}
                    onClick={handleClose}
                    sx={styles.menuItem}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1">Setting</Typography>
                </MenuItem> */}

                <MenuItem component={Link} to="/logout" sx={styles.menuItem}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        backgroundColor: 'white', // Background color set to black
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
    menuItem: {
        color: 'black', // Text color set to white
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background color on hover
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit', // Icon color to inherit text color
        },
    },
};
