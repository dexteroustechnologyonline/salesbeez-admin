const mongoose = require("mongoose");

const subCategoryBannerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "name already exist"],
  },
  SlugUrl: {
    type: String,
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
  subCategory: {
    type: String,
    required: [true, "Please enter subCategory name"],
  },
  subCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Require"],
    ref: "Subcategory",
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

module.exports = mongoose.model("Subcategorybanner", subCategoryBannerSchema);
