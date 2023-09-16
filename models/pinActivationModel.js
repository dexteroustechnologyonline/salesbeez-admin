const mongoose = require("mongoose");

const PinActivationSchema = mongoose.Schema(
  {
    agentId: {
      type: String,
      required: true,
    },
    agentName: {
      type: String,
      required: true,
    },
    officerNumber: {
      type: String,
      required: true,
    },
    officerName: {
      type: String,
      required: true,
    },
    customerMobile: {
      type: String,
    },
    customerName: {
      type: String,
    },
    packName: {
      type: String,
    },
    pinUsedDate: {
      type: Date,
      // default: Date.now(),
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PinActivation", PinActivationSchema);
