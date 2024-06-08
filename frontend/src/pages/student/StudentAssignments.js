import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DownloadIcon from '@mui/icons-material/Download';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchAssignments = async () => {
            if (!currentUser) return;

            try {
                const response = await axios.get(`http://localhost:5000/api/assignments/${currentUser._id}`);
                console.log('Assignments data:', response.data); // Debugging statement
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        console.log('Current user ID:', currentUser?._id); // Debugging statement
        fetchAssignments();
    }, [currentUser]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Assignments
            </Typography>
            <List>
                {assignments.map((assignment, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={assignment.fileName}
                            secondary={
                                <>
                                    <span>Subject ID: {assignment.subjectID}</span><br/>
                                    <span>Uploaded By: {assignment.studentID}</span>
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" href={`http://localhost:5000/${assignment.filePath}`} download>
                                <DownloadIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default StudentAssignments;
