const mongoose = require("mongoose");

const achieversSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "name already exist"],
  },

  desktopBanner: {
    type: String,
  },

  mobileBanner: {
    type: String,
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Achievers", achieversSchema);
