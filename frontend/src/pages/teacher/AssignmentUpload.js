import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, InsertDriveFile, CloudDownload, CheckCircle } from '@mui/icons-material'; // Import icons
import axios from 'axios';

const AssignmentUpload = () => {
    const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [isUploaded, setIsUploaded] = useState(false);

    const handleFileChange = (event) => {
        setAssignmentFiles([...assignmentFiles, { file: event.target.files[0], uploaded: false }]);
        console.log('Selected file:', event.target.files[0]);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (snackbarOpen || isUploaded) {
            const timer = setTimeout(() => {
                setSnackbarOpen(false);
                setIsUploaded(false);
            }, 2000); // Close Snackbar after 6 seconds
            return () => clearTimeout(timer);
        }
    }, [snackbarOpen, isUploaded]);

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
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Upload Assignment
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
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
                <Button variant="contained" onClick={handleFileUpload} sx={{ ml: 2 }}>Upload</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 'larger' }}>File</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: 'larger' }}>Actions</TableCell>
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
                                    {uploaded && <CheckCircle sx={{ ml: 1, color: 'green' }} />}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDownloadFile(file)}><CloudDownload /></Button>
                                    {!uploaded && <Button onClick={() => handleRemoveFile(index)}><Delete /></Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen || isUploaded}
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
