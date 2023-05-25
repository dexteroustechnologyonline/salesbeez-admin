const mongoose = require("mongoose");
const { stringify } = require("querystring");

const ImageResourceSchema = mongoose.Schema({
  Familyname: {
    type: String,
    required: [true, "Please enter product name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  image:{
    type: String,
    required:[true, "Please provide image"],
  },
  imagetype:{
    type: String,
    default: "Icon"
  },
 
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("ImageResource", ImageResourceSchema);
