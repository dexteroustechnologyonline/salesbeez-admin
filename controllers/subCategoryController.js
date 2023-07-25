

const Subcategory = require("../models/subCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createSubCategory = catchAsyncErrors(async(req,res,next)=>{
  try {
      const subcategory = await Subcategory.create(req.body);
      res.status(201).json({
          success  : true,
          subcategory,
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
exports.getAllSubCategory = catchAsyncErrors (async(req,res) =>{
  try {
      const subcategories = await Subcategory.find();
      res.status(200).json({
          success: true,
          subcategories,
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
        folder: "SubCategory/Icon",
        width: 120,
        height:120,
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
    const thumbnail = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "SubCategory/Thumbnail",
        width: 405,
        height:270,
        crop: "scale",
      }
    );

    const thumbnails = thumbnail.secure_url;
    
    
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

exports.UploadnewImag = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "SubCategory/Thumbnail",
        width: 405,
        crop: "scale",
      }
    );

    const thumbnails = thumbnail.secure_url;
    const desktop = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "SubCategory/Desktop",
      width: 405,
      crop: "scale",
    });

    const desktopIcon = desktop.secure_url;

    const icon = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "SubCategory/Icon",
        width: 405,
        crop: "scale",
      }
    );

    const icons = icon.secure_url;
    
    res.status(200).json({
      success: true,
      thumbnails,
      desktopIcon,
      icons

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
      width: 1500,
      height:320,
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
      width: 252,
      height:168,
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

exports.UpdateSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      subcategory:subcategory,
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

exports.DeleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    await subcategory.remove()
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

exports.getsubCategorybyId = catchAsyncErrors(async (req, res) => {
  try {
    const subcategory = await Subcategory.find({
      categoryId: req.params.catid,
    });
    res.status(200).json({
      success: true,
      subcategory,
    });
  } catch (error) {
   
  }
});

exports.SlugUrlExist = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let subcategory = await Subcategory.findOne({ slugUrl: req.params.slugurl,  });

    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "new subcategory SlugUrl",
      });
    } 

    return res.status(200).json({
      success: true,
      message: " subcategory SlugUrl already exist",
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




