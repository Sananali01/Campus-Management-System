import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AssignmentUpload = () => {
    const navigate = useNavigate();
    const { subjectID } = useParams(); // Get subjectID from URL parameters
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isUploaded, setIsUploaded] = useState(false); // State to track if assignment is uploaded

    const currentUser = useSelector((state) => state.user.currentUser);

    const handleFileChange = (event) => {
        setAssignmentFile(event.target.files[0]);
        console.log('Selected file:', event.target.files[0]); // Debugging statement
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFileUpload = async () => {
        console.log('File to upload:', assignmentFile); // Debugging statement
        console.log('Current user:', currentUser); // Debugging statement
        console.log('Subject ID:', subjectID); // Debugging statement
    
        if (!assignmentFile || !currentUser || !subjectID) {
            setSnackbarMessage('Please select a file and ensure you are logged in.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }
    
        const formData = new FormData();
        formData.append('assignment', assignmentFile);
        formData.append('studentID', currentUser._id);
        formData.append('subjectID', subjectID);
    
        console.log('Uploading file with the following details:', {
            studentID: currentUser._id,
            subjectID,
            fileName: assignmentFile.name
        });
    
        try {
            const response = await axios.post('http://localhost:5000/api/upload-assignment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setAssignmentFile(null);
            setSnackbarMessage('Assignment uploaded successfully');
            setSnackbarSeverity('success');
            setIsUploaded(true); // Set isUploaded to true after successful upload
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
                open={snackbarOpen || isUploaded} // Show popup if snackbarOpen is true or if assignment is uploaded
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AssignmentUpload;
