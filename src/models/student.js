const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    mssv: {
        require: true,
        type: String,
    },
    name: {
        type: String,
        require: true
    },
    course: {
        type: String,
    },
    majors: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    status: {
        type: String
    },
    phoneNumber: {
        type: Number,
        require: true,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    CV: {
        type: String,
        default: null
    },
    internshipIndustry: {
        type: String,
        default: null
    },

}


)

module.exports = mongoose.model("Student", studentSchema);