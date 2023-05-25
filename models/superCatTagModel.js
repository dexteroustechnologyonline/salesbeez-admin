

const mongoose = require("mongoose");

const superCategoryTagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter SuperCategoryName name"],
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
    thumbnail: {
      type: String,
      required:[true, "Please provide metadesciption"],
    },
    icon: {
      type: String,
      required:[true, "Please provide metadesciption"],
    },
    desktopicon: {
      type: String,
      required:[true, "Please provide metadesciption"],
    },
    banner: {
      type: String,
      required:[true, "Please provide metadesciption"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
      }
});


module.exports = mongoose.model("Supercategorytag", superCategoryTagSchema);
