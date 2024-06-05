const Assignment = require('../models/assignmentSchema');

const uploadAssignment = async (req, res) => {
    try {
        const { studentID, subjectID } = req.body;
        const assignmentFile = req.file; 
        const assignment = new Assignment({
            studentID,
            subjectID,
            fileName: assignmentFile.originalname, 
            filePath: './uploads/' + assignmentFile.originalname,
        });
        await assignment.save();

        res.status(200).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ error: 'Failed to upload assignment' });
    }
};

const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

module.exports = { uploadAssignment, getAssignments };
