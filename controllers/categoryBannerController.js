const Categorybanner = require("../models/CategoryBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


// create Banner
exports.createCategoryBanner =catchAsyncErrors( async (req, res, next)=>{
  try {
    const categorybanner = await Categorybanner.create(req.body);
    res.status(201).json({
      success: true,
      categorybanner,
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

exports.getAllCategoryBanner = catchAsyncErrors(async (req, res) => {
  try {
    const categorybanners = await Categorybanner.find();
    res.status(200).json({
      success: true,
      categorybanners: categorybanners,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.Uploaddesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopbanner = await cloudinary.v2.uploader.upload(
      req.body.desktopBanner,
      {
        folder: "CategoryBanner/DesktopIcon",
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
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.Uploadmobileicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobilebanner = await cloudinary.v2.uploader.upload(
      req.body.mobileBanner,
      {
        folder: "CategoryBanner/MobileIcon",
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

exports.UpdateCategoryBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorybanner = await Categorybanner.findById(req.params.id);
    if (!categorybanner) {
      return res.status(500).json({
        success: false,
        message: "categorybanner not found",
      });
    }
    categorybanner = await Categorybanner.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      categorybanner: categorybanner,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.DeleteCategoryBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorybanner = await Categorybanner.findById(req.params.id);
    if (!categorybanner) {
      return res.status(500).json({
        success: false,
        message: "categorybanner not found",
      });
    }
    await categorybanner.remove();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});