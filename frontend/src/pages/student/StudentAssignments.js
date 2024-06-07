import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
        

        fetchAssignments();
    }, [currentUser]);

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
