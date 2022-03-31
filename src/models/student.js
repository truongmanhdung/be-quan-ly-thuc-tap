const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    listStudent: [
     {                  
         id : {
            type: number
         },
        studentCode: {
            type: 'string',
        },
        name : {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        phoneNumber : {
            type: number
        },
        address : {
            type: 'string',
        },
        CV: {
            type: 'string',
        },
        internshipIndustry:{
            type: 'string',
        },
       
     }
    ],
    totalList: {
        type: number,
    }
})

module.exports = mongoose.model("Student", studentSchema);