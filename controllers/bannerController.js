const Banner = require("../models/bannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createBanner =catchAsyncErrors( async (req, res, next)=>{
    try {
      const banner = await Banner.create(req.body);
      res.status(201).json({
        success:true, 
        banner
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
        const banners = await Banner.find();
        res.status(200).json({
            success: true,
            banners:banners
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
          folder: "Banner/DesktopIcon",
          width: 1250,
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
          folder: "Banner/MobileIcon",
          width: 400,
          height: 202,
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

  exports.UpdateBanner = catchAsyncErrors(async (req, res, next) => {
    try {
      let banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(500).json({
          success: false,
          message: "Banner not found",
        });
      }
      banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        banner:banner,
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


  exports.DeleteBanner = catchAsyncErrors(async (req, res, next) => {
    try {
      let banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(500).json({
          success: false,
          message: "banner not found",
        });
      }
      await banner.remove()
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