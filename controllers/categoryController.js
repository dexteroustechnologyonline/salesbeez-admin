const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createCategory = catchAsyncErrors(async(req,res,next)=>{
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success  : true,
            category,
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

exports.getAllCategory = catchAsyncErrors (async(req,res) =>{
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories:categories
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

exports.myCategoryAll = catchAsyncErrors(async (req, res) => {
  try {
    const categories = await Category.find();
    for (let index = 0; index < categories.length; index++) {
      const categorid = categories[index]._id;
      let category = await Category.findById(categorid);

      if (!category) {
        return res.status(500).json({
          success: false,
          message: "category not found",
        });
      }
      category.priority = 1;
      category = await Category.findByIdAndUpdate(categorid, category, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
    res.status(400).json({
      success: false,
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
    const icon = await cloudinary.v2.uploader.upload(
      req.body.icon,
      {
        folder: "Category/Icon",
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
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Category/Thumbnail",
      width: 360,
      height:270,
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
exports.Uploadnewimg = catchAsyncErrors(async (req, res, next) => {
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Category/Thumbnail",
      width: 360,
      crop: "scale",
    });

    const thumbnails =  thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "Category/Icon",
        width: 360,
        crop: "scale",
      }
    );

    const icons = icon.secure_url;

    const desktop = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
      folder: "Category/Desktop",
      width: 360,
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
      folder: "Category/Banner",
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
      folder: "Category/Desktop",
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


exports.UpdateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "category not found",
      });
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category:category,
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

exports.DeleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "category not found",
      });
    }
    await category.remove()
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
      let category = await Category.findOne({ slugUrl: req.params.slugurl,  });

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "new category SlugUrl",
      });
    } 

    return res.status(200).json({
      success: true,
      message: " category SlugUrl already exist",
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

exports.GetCategorybyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "category not found",
      });
    }
    res.status(200).json({
      success: true,
      category,
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