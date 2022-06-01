const mongoose = require("mongoose");
const majorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  majorCode:{
    type:String,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Major", majorSchema);
