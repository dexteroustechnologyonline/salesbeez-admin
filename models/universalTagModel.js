

const mongoose = require("mongoose");

const universalTagSchema = mongoose.Schema(
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


module.exports = mongoose.model("Universaltag", universalTagSchema);
