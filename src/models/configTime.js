const mongoose = require("mongoose");
const configTimeSchema = mongoose.Schema(
  {
    typeRegister: {
      type: Number,
      required: true
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("ConfigTime", configTimeSchema);
