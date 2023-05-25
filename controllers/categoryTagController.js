const Categorytag = require("../models/categoryTagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createCategoryTag = catchAsyncErrors(async(req,res,next)=>{
    try{
     const categorytag = await Categorytag.create(req.body);
     res.status(201).json({
         success: true,
         categorytag,
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

 exports.getAllCategoryTag = catchAsyncErrors (async(req,res)=>{
    try {
      const categorytags = await Categorytag.find()
      res.status(200).json({
        success: true,
        categorytags
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
          folder: "CategoryTag/Icon",
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
        folder: "CategoryTag/Thumbnail",
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

  exports.Uploadbanner = catchAsyncErrors(async (req, res, next) => {
    try {
      const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
        folder: "CategoryTag/Banner",
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
        folder: "CategoryTag/Desktop",
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

  exports.UpdateCategoryTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let categorytag = await Categorytag.findById(req.params.id);
      if (!categorytag) {
        return res.status(500).json({
          success: false,
          message: "categorytag not found",
        });
      }
      categorytag = await Categorytag.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        categorytag:categorytag,
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

  exports.DeleteCategoryTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let categorytag = await Categorytag.findById(req.params.id);
      if (!categorytag) {
        return res.status(500).json({
          success: false,
          message: "categorytag not found",
        });
      }
      await categorytag.remove()
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