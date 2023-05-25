const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Category name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "supercategoryid Require"],
    ref: "Supercategory",
  },
  superCategory: {
    type: String,
    required: [true, "Please enter supercategory name"],
  },
  metaTitle: {
    type: String,
    default: "",
    trim: true,
  },
  metaKeyword: {
    type: String,
    default: "",
    trim: true,
  },
  metaDesc: {
    type: String,
    default: "",
    trim: true,
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide thumbnail"],
  },
  icon: {
    type: String,
  },
  desktopicon: {
    type: String,
  },
  banner: {
    type: String,
    required: [true, "Please provide banner"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
