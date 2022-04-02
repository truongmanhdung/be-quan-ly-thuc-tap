const mongoose = require('mongoose');
const cumpusSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Cumpus",cumpusSchema);