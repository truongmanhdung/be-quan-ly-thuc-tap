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
  status: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Business", businessSchema);
