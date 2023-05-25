const Brand = require("../models/brandModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createBrand = catchAsyncErrors(async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      brand,
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

exports.getAllBrand = catchAsyncErrors(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      success: true,
      brands,
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
exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const icon = await cloudinary.v2.uploader.upload(req.body.icon, {
      folder: "Brand/Icon",
      width: 45,
      crop: "scale",
    });

    const icons = icon.secure_url;

    res.status(200).json({
      success: true,
      icons,
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
exports.Uploadthumbnail = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Brand/Thumbnail",
      width: 200,
      crop: "scale",
    });

    const thumbnails = thumbnail.secure_url;
    res.status(200).json({
      success: true,
      thumbnails,
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
exports.UploadBrandnewimages = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Brand/Thumbnail",
      width: 200,
      height: 200,
      crop: "scale",
    });

    const icon = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Brand/Icon",
      width: 100,
      height: 100,
      crop: "scale",
    });

    const icons = icon.secure_url;

    const banner = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Brand/Banner",
      width: 1500,
      height: 320,
      crop: "scale",
    });

    const banners = banner.secure_url;

    const desktop = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Brand/Desktop",
      width: 80,
      height: 80,
      crop: "scale",
    });

    const desktopIcon = desktop.secure_url;

    const thumbnails = thumbnail.secure_url;
    res.status(200).json({
      success: true,
      thumbnails,
      icons,
      banners,
      desktopIcon,
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
exports.Uploadbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Brand/Banner",
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
    const desktop = await cloudinary.v2.uploader.upload(req.body.desktopicon, {
      folder: "Brand/Desktop",
      width: 80,
      crop: "scale",
    });

    const desktopIcon = desktop.secure_url;

    res.status(200).json({
      success: true,
      desktopIcon,
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

exports.UpdateBrand = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "brand not found",
      });
    }
    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      brand: brand,
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

exports.DeleteBrand = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "brand not found",
      });
    }
    await brand.remove();
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

exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findOne({ slugUrl: req.params.slugurl });

    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "new brand SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " brand SlugUrl already exist",
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
