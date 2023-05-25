const Achievers = require("../models/achieversModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createachivera = catchAsyncErrors(async (req, res, next) => {
  try {
    const Achiever = await Achievers.create(req.body);
    res.status(201).json({
      success: true,
      Achiever,
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
exports.getAllAchievers = catchAsyncErrors(async (req, res) => {
  try {
    const achievers = await Achievers.find();
    res.status(200).json({
      success: true,
      achievers: achievers,
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
        folder: "Achiver/DesktopImages",
        width: 253,
        height: 385,
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
        folder: "Banner/MobileIcon",
        width: 253,
        height: 385,
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

exports.DeleteAchievers = catchAsyncErrors(async (req, res, next) => {
  try {
    let banner = await Achievers.findById(req.params.id);
    if (!banner) {
      return res.status(500).json({
        success: false,
        message: "banner not found",
      });
    }
    await banner.remove();
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
