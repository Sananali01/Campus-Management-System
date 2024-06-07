const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('../models/assignmentSchema');
const { v4: uuidv4 } = require('uuid'); // Import UUID

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
        const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

const upload = multer({ storage: storage });

const uploadAssignment = async (req, res) => {
    console.log('Request received:', req.body); // Debugging statement
    console.log('File received:', req.file); // Debugging statement

    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { studentID, subjectID } = req.body;
    console.log('Received assignment upload request with the following details:', {
        studentID,
        subjectID,
        fileName: req.file.filename // Use the new unique filename
    });

    try {
        const assignment = new Assignment({
            studentID,
            subjectID,
            fileName: req.file.originalname,
            filePath: req.file.path,
        });
        await assignment.save();
        res.status(200).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ error: 'Failed to upload assignment', details: error.message });
    }
};

const getAssignmentsByStudent = async (req, res) => {
    const { studentID } = req.params;
    try {
        const assignments = await Assignment.find({ studentID });
        console.log('Assignments fetched:', assignments); // Debugging statement
        if (!assignments) {
            console.error('No assignments found');
            return res.status(404).json({ error: 'No assignments found' });
        }
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};



module.exports = { upload, uploadAssignment, getAssignmentsByStudent };
