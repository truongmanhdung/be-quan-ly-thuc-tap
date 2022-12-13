const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const businessSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
  },
  internshipPosition: {
    type: String,
    require: true,
  },
  majors: {
    type: ObjectId,
    ref: "Major",
  },
  amount: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  smester_id: {
    type: ObjectId,
    ref: "Semester",
  },
  campus_id: {
    type: ObjectId,
    ref: "Cumpus",
  },
  code_request: {
    type: String,
  },
  request: {
    type: String,
  },
  description: {
    type: String,
  },
  benefish:{
    type: String
  },
  status: {
    type: Number,
    default: 1,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Business", businessSchema);
