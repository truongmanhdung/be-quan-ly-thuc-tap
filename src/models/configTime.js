const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const configTimeSchema = mongoose.Schema(
  {
    typeNumber: {
      type: Number,
      required: true,
    },
    typeName: {
      type: String,
      default: ''
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    semester_id: {
      type: ObjectId,
      ref: "Semester",
    },
    campus_id: {
      type: ObjectId,
      ref: "Cumpus",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("ConfigTime", configTimeSchema);
