const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Sub Category name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
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
    required:[true, "Please provide thumbnail"],
  },
  icon: {
    type: String,
    required:[true, "Please provide icon"],
  },
  desktopicon: {
    type: String,
    required:[true, "Please provide desktopicon"],
  },
  banner: 
    {
      type: String,
      required:[true, "Please provide banner"],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
