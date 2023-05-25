const Subcategorybanner = require("../models/SubCategoryBannerModel");
const ImageResource = require("../models/imageResource");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { Console } = require("console");


exports.createSubCatBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const subcategorybanner = await Subcategorybanner.create(req.body);
    res.status(201).json({
      success: true,
      subcategorybanner,
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


exports.getAllSubCatBanner = catchAsyncErrors(async (req, res) => {
  try {
    const subcategorybanners = await Subcategorybanner.find();
    res.status(200).json({
      success: true,
      subcategorybanners: subcategorybanners,
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
        folder: "SubCategoryBanner/DesktopIcon",
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
        folder: "SubCategoryBanner/MobileIcon",
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