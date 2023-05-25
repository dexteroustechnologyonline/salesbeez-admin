

const mongoose = require("mongoose");

const pinAmountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Pin Amount"],
      unique: [true, "name already exist"],
      trim:true 
    },
    slugUrl:{
       type:String,
       required:[true, "Please provide slugurl"],
       unique: [true, "slugUrl already exist"],
       trim:true,
    },
    city: {
      type: String,
      required: [true, "Please select city"],
    },
    pincode: {
      type: Number,
      unique: true,
      required: [true, "Please enter pincode"],
    },
    area: {
      type: String,
      required: [true, "Please enter area"],
    },
    deliveryCharge1: {
      type: Number,
      required: [true, "Please enter delivery charge1"],
    },
    deliveryCharge2: {
      type: Number,
      required: [true, "Please enter delivery charge2"],
    },
    amountRange1: {
      type: Number,
      required: [true, "Please enter amount range1"],
    },
    amountRange2: {
      type: Number,
      required: [true, "Please enter amount range2"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
      }
});


module.exports = mongoose.model("Pinamount", pinAmountSchema);
