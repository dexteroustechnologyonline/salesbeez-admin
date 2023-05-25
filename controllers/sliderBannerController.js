const Sliderbanner = require("../models/SliderBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");



// create Banner
exports.createBanner =catchAsyncErrors( async (req, res, next)=>{
  try {
    const sliderbanner = await Sliderbanner.create(req.body);
    res.status(201).json({
      success:true, 
      sliderbanner
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

exports.getAllBanner = catchAsyncErrors (async(req,res) =>{
  try {
      const sliderbanners = await Sliderbanner.find();
      res.status(200).json({
          success: true,
          sliderbanners:sliderbanners
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

exports.Uploaddesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopbanner = await cloudinary.v2.uploader.upload(
      req.body.desktopBanner,
      {
        folder: "SliderBanner/DesktopIcon",
        width: 1500,
        crop: "scale",
      }
    );

    const desktopbanners = desktopbanner.secure_url;
    
    res.status(200).json({
      success: true,
      desktopbanners,
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

exports.Uploadmobileicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobilebanner = await cloudinary.v2.uploader.upload(
      req.body.mobileBanner,
      {
        folder: "SliderBanner/MobileIcon",
        width: 500,
        crop: "scale",
      }
    );

    const mobilebanners = mobilebanner.secure_url;
    
    res.status(200).json({
      success: true,
      mobilebanners,
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

exports.UpdateSliderBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let sliderbanner = await Sliderbanner.findById(req.params.id);
    if (!sliderbanner) {
      return res.status(500).json({
        success: false,
        message: "sliderbanner not found",
      });
    }
    sliderbanner = await Sliderbanner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      sliderbanner:sliderbanner,
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

exports.DeleteSliderBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let sliderbanner = await Sliderbanner.findById(req.params.id);
    if (!sliderbanner) {
      return res.status(500).json({
        success: false,
        message: "sliderbanner not found",
      });
    }
    await sliderbanner.remove()
      res.status(200).json({
      success: true,
      
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