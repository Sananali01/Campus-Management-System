import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AssignmentUpload = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleFileChange = (event) => {
        setAssignmentFile(event.target.files[0]);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFileUpload = async () => {
        if (!assignmentFile) return;
    
        const formData = new FormData();
        formData.append('assignment', assignmentFile);
        formData.append('studentID', params.id);
        formData.append('subjectID', params.subjectID);
    
        try {
            const response = await axios.post('http://localhost:5000/upload-assignment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setAssignmentFile(null);
            setSnackbarMessage('Assignment uploaded successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error uploading file:', error);
            setSnackbarMessage('Failed to upload assignment');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <Typography variant="h4" component="h2">Upload Assignment</Typography>
            <input
                accept="*"
                style={{ display: 'none' }}
                id="assignment-upload"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="assignment-upload">
                <Button variant="contained" component="span">Choose File</Button>
            </label>
            {assignmentFile && <Typography variant="body1">{assignmentFile.name}</Typography>}
            <br /><br />
            <Button variant="contained" onClick={handleFileUpload}>Upload</Button>
            <br /><br />
            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AssignmentUpload;
