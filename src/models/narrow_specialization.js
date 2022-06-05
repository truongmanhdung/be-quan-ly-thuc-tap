const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const NarrowSpecializationSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
  },
  id_majors: {
    type: ObjectId,
    ref: "Major",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "NarrowSpecialization",
  NarrowSpecializationSchema
);
