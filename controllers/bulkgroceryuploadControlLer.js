const ImageResource = require("../models/imageResource");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const icon = await cloudinary.v2.uploader.upload(
      req.body.icon,
      {
        folder: "Grocery/Icon",
        width: 45,
        crop: "scale",
      }
    );

    const icons = icon.secure_url;
    const formData = {
      Familyname : req.body.Familyname ? req.body.Familyname :"Default",
      image: icons,
      imagetype: "icons"
      
    }
    const imageResource = await ImageResource.create(formData);
    
    res.status(200).json({
      success: true,
      icons
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});