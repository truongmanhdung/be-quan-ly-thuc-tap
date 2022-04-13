const mongoose = require("mongoose");
const configTimeSchema = mongoose.Schema(
  {
    typeNumber: {
      type: Number,
      required: true,
    },
    typeName: {
      type: String,
      required: true,
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
