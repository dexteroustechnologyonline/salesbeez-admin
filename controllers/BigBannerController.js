const Bigbanner = require("../models/bigBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createBigBanner = catchAsyncErrors(async(req,res,next)=>{
    try {
        const bigbanner = await Bigbanner.create(req.body);
        res.status(201).json({
            success  : true,
            bigbanner,
        })
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

exports.getAllBigBanners = catchAsyncErrors (async(req,res) =>{
    try {
        const bigbanners = await Bigbanner.find();
        res.status(200).json({
            success: true,
            bigbanners:bigbanners
        })
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


exports.Uploadbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "BigBanner/Banner",
      width: 1680,
      crop: "scale",
    });

    const banners = banner.secure_url;

    res.status(200).json({
      success: true,
      banners,
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