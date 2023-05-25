const Ourteam = require("../models/OurTeamModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createOurTeam = catchAsyncErrors(async(req,res,next)=>{
    try {
        const ourteam = await Ourteam.create(req.body);
        res.status(201).json({
            success  : true,
            ourteam,
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

exports.getAllOurTeam = catchAsyncErrors (async(req,res) =>{
    try {
        const ourteams = await Ourteam.find();
        res.status(200).json({
            success: true,
            ourteams:ourteams
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
        folder: "OurTeams/Icon",
        width: 200,
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

exports.UpdateOurTeam = catchAsyncErrors(async (req, res, next) => {
  try {
    let ourteam = await Ourteam.findById(req.params.id);
    if (!ourteam) {
      return res.status(500).json({
        success: false,
        message: "ourteam not found",
      });
    }
    ourteam = await Ourteam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      ourteam:ourteam,
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

exports.DeleteOurTeam = catchAsyncErrors(async (req, res, next) => {
  try {
    let ourteam = await Ourteam.findById(req.params.id);
    if (!ourteam) {
      return res.status(500).json({
        success: false,
        message: "ourteam not found",
      });
    }
    await ourteam.remove()
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
