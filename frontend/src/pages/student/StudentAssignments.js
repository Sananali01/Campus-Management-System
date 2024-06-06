import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Table, TableBody, TableHead, Button, TableRow, TableCell } from '@mui/material';
import { fetchAssignments } from '../../redux/assignmentRelated/assignmentsActions';

const StudentAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchAssignments(currentUser._id)); // Fetch assignments for the current user
        }
    }, [dispatch, currentUser]);

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Your Assignments
            </Typography>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell>Assignment</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map((assignment) => (
                            <TableRow key={assignment._id}>
                                <TableCell>{assignment.subjectName}</TableCell> {/* Use subjectName property */}
                                <TableCell>{assignment.fileName}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`http://localhost:5000/uploads/${assignment.fileName}`}
                                        target="_blank"
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
};

export default StudentAssignments;
