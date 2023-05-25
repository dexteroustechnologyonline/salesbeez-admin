
const Pinamount = require("../models/pinAmountModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createPinAmount = catchAsyncErrors(async(req,res,next)=>{
   try{
    const pinamount = await Pinamount.create(req.body);
    res.status(201).json({
        success: true,
        pinamount,
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

exports.getAllPinAmount = catchAsyncErrors (async(req,res)=>{
  try {
    const pinamounts = await Pinamount.find()
    res.status(200).json({
      success: true,
      pinamounts,
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

exports.UpdatePinAmount = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinamount = await Pinamount.findById(req.params.id);
    if (!pinamount) {
      return res.status(500).json({
        success: false,
        message: "Pinamount not found",
      });
    }
    pinamount = await Pinamount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      pinamount:pinamount,
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

exports.DeletePinAmount = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinamount = await Pinamount.findById(req.params.id);
    if (!pinamount) {
      return res.status(500).json({
        success: false,
        message: "pinamount not found",
      });
    }
    await pinamount.remove()
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