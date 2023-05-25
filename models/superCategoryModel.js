
const mongoose = require("mongoose");

const superCategorySchema = mongoose.Schema(
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
    metaTitle:{
      type:String,
      required:[true, "Please provide metatitle"],
      default:"",
      trim:true,
    },
    metaKeyword:{
      type:String,
      required:[true, "Please provide metakeyword"],
      default:"",
      trim:true,
    },
    metaDesc:{
      type:String,
      required:[true, "Please provide metadesciption"],
      default:"",
      trim:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
      }
});


module.exports = mongoose.model("Supercategory", superCategorySchema);
