const mongoose = require("mongoose");

const categoryBannerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "name already exist"],
  },
  category: {
    type: String,
    required: [true, "Please enter Category Name name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },

  desktopBanner: {
    type: String,
  },

  mobileBanner: {
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

module.exports = mongoose.model("Categorybanner", categoryBannerSchema);
