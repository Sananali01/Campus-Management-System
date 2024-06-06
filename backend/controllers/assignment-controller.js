const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('../models/assignmentSchema');

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadAssignment = async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { studentID, subjectID } = req.body;
    console.log('Received assignment upload request with the following details:', {
        studentID,
        subjectID,
        fileName: req.file.originalname
    });

    try {
        const assignment = new Assignment({
            studentID,
            subjectID,
            fileName: req.file.originalname,
            filePath: path.join(__dirname, '../uploads', req.file.originalname),
        });
        await assignment.save();
        res.status(200).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ error: 'Failed to upload assignment', details: error.message });
    }
};

const getAssignmentsByStudent = async (req, res) => {
    try {
        const assignments = await Assignment.find({ studentID: req.params.studentID }).populate('subjectID', 'subName');
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

module.exports = { upload, uploadAssignment, getAssignmentsByStudent };
