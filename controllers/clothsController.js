const Cloths = require("../models/clothsModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createCloths = catchAsyncErrors(async(req,res,next)=>{
    try {
        const cloths = await Cloths.create(req.body);
        res.status(201).json({
            success  : true,
            cloths,
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

exports.getAllCloths = catchAsyncErrors (async(req,res) =>{
    try {
        const Clothes = await Cloths.find();
        res.status(200).json({
            success: true,
            Clothes:Clothes
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



exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const icon = await cloudinary.v2.uploader.upload(
      req.body.icon,
      {
        folder: "Cloths/Icon",
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
      folder: "Cloths/Thumbnail",
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
exports.Uploadiclothimages = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Cloths/Banner",
      width: 600,
      crop: "scale",
    });
    const banners = banner.secure_url;

    const thumbnail = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Cloths/Thumbnail",
      width: 200,
      crop: "scale",
    });
    const thumbnails =  thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(
      req.body.banner,
      {
        folder: "Cloths/Icon",
        width: 45,
        crop: "scale",
      }
    );
    const icons = icon.secure_url;
   
    const desktop = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Cloths/Desktop",
      width: 80,
      crop: "scale",
    });
    const desktopIcon = desktop.secure_url;
    
    res.status(200).json({
      success: true,
      thumbnails,
      icons,
      banners,
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
      folder: "Cloths/Banner",
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
      folder: "Cloths/Desktop",
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

exports.UpdateCloth = catchAsyncErrors(async (req, res, next) => {
  try {
    let cloths = await Cloths.findById(req.params.id);
    if (!cloths) {
      return res.status(500).json({
        success: false,
        message: "cloths not found",
      });
    }
    cloths = await Cloths.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      cloths:cloths,
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

exports.DeleteCloths = catchAsyncErrors(async (req, res, next) => {
  try {
    let cloths = await Cloths.findById(req.params.id);
    if (!cloths) {
      return res.status(500).json({
        success: false,
        message: "cloths not found",
      });
    }
    await cloths.remove()
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

exports.SlugUrlExist = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let cloths = await Cloths.findOne({ slugUrl: req.params.slugurl,  });

    if (!cloths) {
      return res.status(500).json({
        success: false,
        message: "new cloths SlugUrl",
      });
    } 

    return res.status(200).json({
      success: true,
      message: " cloths SlugUrl already exist",
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


exports.myClothsAll = catchAsyncErrors (async(req,res) =>{
  try {
      const cloths = await Cloths.find();
      for (let index = 0; index < cloths.length; index++) {
        const clothid = cloths[index]._id;
        let cloth = await Cloths.findById(clothid);
  
        if (!cloth) {
          return res.status(500).json({
            success: false,
            message: "cloth not found",
          });
        }
      
        cloth.options.map((option)=>option.discounts = Math.round(((option.mrp - option.sellingPrice) * 100) / option.mrp));
        // cloth.options.map((option)=>option.prime=false);
        //  cloth.options[0].prime=true;
  
        cloth = await Cloths.findByIdAndUpdate(clothid, cloth, {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        });
      }
     
      res.status(200).json({
          success: true,
          cloths:cloths
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