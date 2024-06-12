//Assignment routes

const express = require('express');
const { upload, uploadAssignment, getAssignmentsByStudent } = require('../controllers/assignment-controller');
const router = express.Router();

router.post('/upload-assignment', upload.single('assignment'), uploadAssignment);
router.get('/assignments', getAssignmentsByStudent);

module.exports = router;
