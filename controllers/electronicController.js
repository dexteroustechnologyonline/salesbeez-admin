const Electronic = require("../models/electronicsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createElectronic = catchAsyncErrors(async(req,res,next)=>{
    try {
        const electronic = await Electronic.create(req.body);
        res.status(201).json({
            success  : true,
            electronic,
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

exports.getAllElectronic = catchAsyncErrors (async(req,res) =>{
    try {
        const electronics = await Electronic.find();
        res.status(200).json({
            success: true,
            electronics:electronics
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

exports.UploadNewimages = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Electronics/Banner",
      width: 600,
      crop: "scale",
    });
    const banners = banner.secure_url;

    const thumbnail = await cloudinary.v2.uploader.upload(req.body.banner, {
        folder: "Electronics/Thumbnail",
        width: 200,
        crop: "scale",
      });
    const thumbnails =  thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(
        req.body.banner,
        {
          folder: "Electronics/Icon",
          width: 45,
          crop: "scale",
        }
      );
    const icons = icon.secure_url;
   
    const desktop = await cloudinary.v2.uploader.upload(req.body.banner, {
        folder: "Electronics/Desktop",
        width: 80,
        crop: "scale",
      });
    const desktopIcon = desktop.secure_url;

    
    res.status(200).json({
      success: true,
      banners,
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

exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
    try {
      const icon = await cloudinary.v2.uploader.upload(
        req.body.icon,
        {
          folder: "Electronics/Icon",
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
        folder: "Electronics/Thumbnail",
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
        folder: "Electronics/Banner",
        width: 600,
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
        folder: "Electronics/Desktop",
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

  exports.UpdateElectronic = catchAsyncErrors(async (req, res, next) => {
    try {
      let electronic = await Electronic.findById(req.params.id);
      if (!electronic) {
        return res.status(500).json({
          success: false,
          message: "electronic not found",
        });
      }
      electronic = await Electronic.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        electronic:electronic,
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

  exports.DeleteElectronics = catchAsyncErrors(async (req, res, next) => {
    try {
      let electronic = await Electronic.findById(req.params.id);
      if (!electronic) {
        return res.status(500).json({
          success: false,
          message: "electronic not found",
        });
      }
      await electronic.remove()
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


  exports.myElectronicsAll = catchAsyncErrors (async(req,res) =>{
    try {
        const electronics = await Electronic.find();
        for (let index = 0; index < electronics.length; index++) {
          const electronicid = electronics[index]._id;
          let electronic = await Electronic.findById(electronicid);
    
          if (!electronic) {
            return res.status(500).json({
              success: false,
              message: "electronic not found",
            });
          }
        
          electronic.options.map((option)=>option.discounts = Math.round(((option.mrp - option.sellingPrice) * 100) / option.mrp));
          // electronic.options[0].prime=true;
          // electronic.options.map((option)=>option.prime=false);
    
          electronic = await Electronic.findByIdAndUpdate(electronicid, electronic, {
            new: true,
            useFindAndModify: false,
            runValidators: true,
          });
        }
       
        res.status(200).json({
            success: true,
            electronics:electronics
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
  