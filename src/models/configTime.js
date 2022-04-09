const mongoose = require("mongoose");
const configTimeSchema = mongoose.Schema(
  {
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
