//Assignment Schema

const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
