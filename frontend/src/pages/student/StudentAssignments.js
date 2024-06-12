import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import axios from 'axios';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/assignments');
                console.log('Assignments data:', response.data); // Debugging statement
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    const handleDownload = (filePath, fileName) => {
        const link = document.createElement('a');
        link.href = filePath;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setSnackbarMessage('Download started');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Assignments
            </Typography>

            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:'bold'}}>Assignment</TableCell>
                            <TableCell sx={{fontWeight:'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map((assignment, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {assignment.fileName}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDownload(assignment.filePath, assignment.fileName)}>
                                        <CloudDownload />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
};

export default StudentAssignments;
