const Universaltag = require("../models/universalTagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createuniversalTag = catchAsyncErrors(async(req,res,next)=>{
   try{
    const universaltag = await Universaltag.create(req.body);
    res.status(201).json({
        success: true,
        universaltag,
      });
   }
   catch(error)
   {
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

exports.getAllUniversalTag = catchAsyncErrors (async(req,res)=>{
  try {
    const universaltags = await Universaltag.find()
    res.status(200).json({
      success: true,
      universaltags:universaltags
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


exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const icon = await cloudinary.v2.uploader.upload(
      req.body.icon,
      {
        folder: "UniversalTag/Icon",
        width: 45,
        crop: "scale",
      }
    );

    const icons = icon.secure_url;
    
    res.status(200).json({
      success: true,
      icons,
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
exports.Uploadthumbnail = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "UniversalTag/Thumbnail",
      width: 200,
      crop: "scale",
    });

    const thumbnails =  thumbnail.secure_url;
    res.status(200).json({
      success: true,
      thumbnails,
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

exports.UploadMultipleImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "UniversalTag/Thumbnail",
      width: 200,
      crop: "scale",
    });
    const thumbnails =  thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "UniversalTag/Icon",
        width: 45,
        crop: "scale",
      }
    );
    const icons = icon.secure_url;
    const desktop = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "UniversalTag/Desktop",
      width: 80,
      crop: "scale",
    });
    const desktopIcon = desktop.secure_url;

    res.status(200).json({
      success: true,
      thumbnails,
      icons,
      desktopIcon
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

exports.Uploadbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "UniversalTag/Banner",
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
exports.Uploaddesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktop = await cloudinary.v2.uploader.upload(req.body.desktopicon, {
      folder: "UniversalTag/Desktop",
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



exports.UpdateUniversalTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let universaltag = await Universaltag.findById(req.params.id);
    if (!universaltag) {
      return res.status(500).json({
        success: false,
        message: "universaltag not found",
      });
    }
    universaltag = await Universaltag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      universaltag:universaltag,
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
exports.DeleteUniversalTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let universaltag = await Universaltag.findById(req.params.id);
    if (!universaltag) {
      return res.status(500).json({
        success: false,
        message: "universaltag not found",
      });
    }
    await universaltag.remove()
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