const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
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

  category: {
    type: String,
  },
  catSlugUrl: {
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

module.exports = mongoose.model("Banner", bannerSchema);
