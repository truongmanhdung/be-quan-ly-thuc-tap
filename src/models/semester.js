const { isLowercase } = require("class-validator");
const mongoose = require("mongoose");
const semesterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Semester", semesterSchema);
