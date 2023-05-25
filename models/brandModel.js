const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter SuperCategoryName name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategory: {
    type: String,
    required: [true, "Please enter supercategory name"],
  },

  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "supercategoryid Require"],
    ref: "Supercategory",
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
  offers: {
    type: Boolean,
    default: false,
  },
  partners: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide thumbnail"],
  },
  icon: {
    type: String,
    required: [true, "Please provide icon"],
  },
  desktopicon: {
    type: String,
    required: [true, "Please provide desktopicon"],
  },
  banner: {
    type: String,
    required: [true, "Please provide banners"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Brand", brandSchema);
