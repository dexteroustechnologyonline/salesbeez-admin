const mongoose = require("mongoose");


const smallBannerSchema = new mongoose.Schema(
 {

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

module.exports = mongoose.model("Smallbanner", smallBannerSchema);