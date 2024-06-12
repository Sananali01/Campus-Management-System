import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Box, Button, Typography, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, InsertDriveFile, CloudDownload, CheckCircle } from '@mui/icons-material'; // Import icons
import axios from 'axios';
import { useSelector } from 'react-redux';

const AssignmentUpload = () => {
    const navigate = useNavigate();
    // const { subjectID } = useParams(); // Get subjectID from URL parameters
    const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isUploaded, setIsUploaded] = useState(false); // State to track if assignment is uploaded

    const currentUser = useSelector((state) => state.user.currentUser);

    const handleFileChange = (event) => {
        setAssignmentFiles([...assignmentFiles, { file: event.target.files[0], uploaded: false }]);
        console.log('Selected file:', event.target.files[0]); // Debugging statement
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleFileUpload = async () => {
        const newFiles = [...assignmentFiles];

        if (newFiles.length === 0) {
            setSnackbarMessage('Please select a file.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const formDataArray = newFiles.map(({ file }) => {
            const formData = new FormData();
            formData.append('assignment', file);
            return formData;
        });

        try {
            const uploadPromises = formDataArray.map(formData =>
                axios.post('http://localhost:5000/api/upload-assignment', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            );
            await Promise.all(uploadPromises);
            console.log('Files uploaded successfully');
            setSnackbarMessage('Assignments uploaded successfully');
            setSnackbarSeverity('success');
            setIsUploaded(true);
            setAssignmentFiles(newFiles.map(({ file }) => ({ file, uploaded: true })));
        } catch (error) {
            console.error('Error uploading files:', error);
            setSnackbarMessage('Failed to upload assignments');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };


    const handleRemoveFile = (index) => {
        const newFiles = [...assignmentFiles];
        newFiles.splice(index, 1);
        setAssignmentFiles(newFiles);
    };

    const handleDownloadFile = (file) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
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
            <br /><br />
            <Button variant="contained" onClick={handleFileUpload}>Upload</Button>
            <br /><br />
            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>

            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignmentFiles.map(({ file, uploaded }, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                    ) : (
                                        <InsertDriveFile />
                                    )}
                                    {file.name}
                                    {uploaded && <CheckCircle style={{ marginLeft: '5px', color: 'green' }} />}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDownloadFile(file)}><CloudDownload /></Button>
                                    <Button onClick={() => handleRemoveFile(index)}><Delete /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
