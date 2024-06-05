// StudentAssignments.js

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('/assignments'); // Fetch assignments from the backend
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Assignments
            </Typography>
            <List>
                {assignments.map((assignment, index) => (
                    <ListItem key={index} button>
                        <ListItemText primary={assignment.fileName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default StudentAssignments;
