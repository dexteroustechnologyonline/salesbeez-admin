

const mongoose = require("mongoose");

const subCategoryTagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Universal Tag name"],
      unique: [true, "name already exist"],
      trim:true 
    },
    slugUrl:{
       type:String,
       required:[true, "Please provide slugurl"],
       unique: [true, "slugUrl already exist"],
       trim:true,
    },

    superCategory: {
      type: String,
      required: [true, "Please enter supercategory name"]
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
  subCategory: {
    type: String,
    required: [true, "Please enter subCategory name"]
 },
 subCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Require"],
    ref: "Subcategory",
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
    banner: {
      type: String,
      required:[true, "Please provide banner"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
      }
});


module.exports = mongoose.model("Subcategorytag", subCategoryTagSchema);
