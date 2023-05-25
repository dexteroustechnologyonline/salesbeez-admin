const Productbanner = require("../models/productBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create Banner
exports.createProductbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const productbanner = await Productbanner.create(req.body);
    res.status(201).json({
      success: true,
      productbanner,
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

exports.getAllProductbanner = catchAsyncErrors(async (req, res) => {
  try {
    const productbanners = await Productbanner.find();
    res.status(200).json({
      success: true,
      productbanners: productbanners,
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

exports.UpdateProductbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let productbanner = await Productbanner.findById(req.params.id);
    if (!productbanner) {
      return res.status(500).json({
        success: false,
        message: "productbanner not found",
      });
    }
    productbanner = await Productbanner.findByIdAndUpdate(
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
      productbanner: productbanner,
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

exports.DeleteProductbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let productbanner = await Productbanner.findById(req.params.id);
    if (!productbanner) {
      return res.status(500).json({
        success: false,
        message: "productbanner not found",
      });
    }
    await productbanner.remove();
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