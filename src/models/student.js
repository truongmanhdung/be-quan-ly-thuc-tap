const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const studentSchema = mongoose.Schema(
  {
    mssv: {
      require: true,
      type: String,
      lowercase: true,
    },
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    majors: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    supplement: {
      type: String,
      default: null,
    },
    statusCheck: {
      type: Number,
      default: 10,
    },
    statusStudent: {
      type: String,
    },
    support: {
      type: Number,
      default: null,
    },
    phoneNumber: {
      type: Number,
      require: true,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    CV: {
      type: String,
      default: null,
    },
    campus_id: {
      type: ObjectId,
      ref: "Cumpus",
    },
    reviewer: {
      type: String,
      default: null,
    },
    form: {
      type: String,
      default: null,
    },
    report: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    numberOfTime: {
      type: Number,
      default: 0,
    },
    //cong ty
    nameCompany: {
      type: String,
      default: null,
    },
    addressCompany: {
      type: String,
      default: null,
    },
    taxCode: {
      type: Number,
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    phoneNumberCompany: {
      type: Number,
      default: null,
    },
    emailEnterprise: {
      type: String,
      default: null,
    },
    // bieu mau
    internshipTime: {
      type: Date,
      default: null,
    },
    attitudePoint: {
      type: Number,
      default: null,
    },
    resultScore: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
