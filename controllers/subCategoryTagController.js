const Subcategorytag = require("../models/subCategoryTagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");



exports.createSubCategoryTag = catchAsyncErrors(async(req,res,next)=>{
    try{
     const subcategorytag = await Subcategorytag.create(req.body);
     res.status(201).json({
         success: true,
         subcategorytag,
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

 exports.getAllSubCategoryTag = catchAsyncErrors (async(req,res)=>{
    try {
      const subcategorytags = await Subcategorytag.find()
      res.status(200).json({
        success: true,
        subcategorytags,
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
          folder: "SubCategory/Icon",
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
        folder: "SubCategory/Thumbnail",
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
        folder: "SubCategory/Banner",
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
        folder: "SubCategory/Desktop",
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

  exports.UpdateSubCategoryTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let subcategorytag = await Subcategorytag.findById(req.params.id);
      if (!subcategorytag) {
        return res.status(500).json({
          success: false,
          message: "subcategorytag not found",
        });
      }
      subcategorytag = await Subcategorytag.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        subcategorytag:subcategorytag,
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


  exports.DeleteSubCategoryTag = catchAsyncErrors(async (req, res, next) => {
    try {
      let subcategorytag = await Subcategorytag.findById(req.params.id);
      if (!subcategorytag) {
        return res.status(500).json({
          success: false,
          message: "subcategorytag not found",
        });
      }
      await subcategorytag.remove()
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