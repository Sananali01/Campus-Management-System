import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,  IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/assignments');
                console.log('Assignments data:', response.data);
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    const handleDownload = async (assignmentId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/download-assignment/${assignmentId}`, {
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName || 'assignment');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading assignment:', error);
        }
    };
    
    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Assignments
            </Typography>

            <Table  sx={{ marginTop: 5 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:'bold',fontSize:'larger'}}>Assignment</TableCell>
                        <TableCell sx={{fontWeight:'bold',fontSize:'larger'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment, index) => (
                        <TableRow key={index}>
                            <TableCell>{assignment.fileName}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDownload(assignment._id, assignment.fileName)}>
                                    <FontAwesomeIcon icon={faDownload} color="blue"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default StudentAssignments;
