const mongoose = require('mongoose');
const managerSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    campus:{
        type: String,
        require
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Manager", managerSchema);