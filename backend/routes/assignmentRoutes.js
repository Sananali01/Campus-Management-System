//Assignment routes

const express = require('express');
const { upload, uploadAssignment, getAssignmentsByStudent } = require('../controllers/assignment-controller');
const router = express.Router();
const Assignment = require('../models/assignmentSchema');
const fs = require('fs');


router.post('/upload-assignment', upload.single('assignment'), uploadAssignment);
router.get('/assignments', getAssignmentsByStudent);


// Endpoint to download an assignment file
router.get('/download-assignment/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename=${assignment.fileName}`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream the file to the client
        const fileStream = fs.createReadStream(assignment.filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error downloading assignment:', error);
        res.status(500).json({ error: 'Failed to download assignment' });
    }
});

module.exports = router;
