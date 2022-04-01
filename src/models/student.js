const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
     
                     
         id : {
            type: Number
         },
        studentCode: {
            type: String,
        },
        name : {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber : {
            type: Number
        },
        address : {
            type: String,
        },
        CV: {
            type: String,
        },
        internshipIndustry:{
            type: String,
        },
       
     }
    
   
)

module.exports = mongoose.model("Student", studentSchema);