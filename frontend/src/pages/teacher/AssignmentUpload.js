// AssignmentUpload.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

const AssignmentUpload = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [assignmentFile, setAssignmentFile] = useState(null);

    const handleFileChange = (event) => {
        setAssignmentFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!assignmentFile) return;
        const formData = new FormData();
        formData.append('assignment', assignmentFile);
        formData.append('studentID', params.id);
        formData.append('subjectID', params.subjectID);

        try {
            const response = await axios.post('/api/upload-assignment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setAssignmentFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
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
        </Box>
    );
}

export default AssignmentUpload;
