const mongoose = require("mongoose");

const categoryBannerSchema = new mongoose.Schema({
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categorybanner", categoryBannerSchema);
