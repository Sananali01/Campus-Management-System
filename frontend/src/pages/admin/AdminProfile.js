import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    paper: {
        padding: theme.spacing(4),
        maxWidth: 400,
        textAlign: 'left',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    info: {
        marginBottom: theme.spacing(1),
    },
}));

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" className={classes.title}>Admin Profile</Typography>
                <Typography variant="body1" className={classes.info}><strong>Name:</strong> {currentUser.name}</Typography>
                <Typography variant="body1" className={classes.info}><strong>Email:</strong> {currentUser.email}</Typography>
                <Typography variant="body1" className={classes.info}><strong>Role:</strong> {currentUser.role}</Typography>
                <Typography variant="body1" className={classes.info}><strong>School:</strong> {currentUser.schoolName}</Typography>
            </Paper>
        </Box>
    );
}

export default AdminProfile;
