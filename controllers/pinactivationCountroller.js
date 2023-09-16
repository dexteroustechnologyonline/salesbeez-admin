const PinActivation = require("../models/pinActivationModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createPinactivation = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinactivation = [];
    for (let index = 0; index < req.body.noOfPin; index++) {
      pinactivation = [...pinactivation, await PinActivation.create(req.body)];
    }

    res.status(201).json({
      success: true,
      pinactivation,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UpdatePinActivation = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinactivation = await PinActivation.findById(req.params.id);
    if (!pinactivation) {
      return res.status(500).json({
        success: false,
        message: "pinactivation not found",
      });
    }
    pinactivation = await PinActivation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      pinactivation: pinactivation,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.getAllPinActivation = catchAsyncErrors(async (req, res) => {
  try {
    const pinactivation = await PinActivation.find();
    res.status(200).json({
      success: true,
      pinactivation: pinactivation,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.PinActivationAgentid = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinactivation = await PinActivation.find({ agentId: req.params.id });

    if (!pinactivation) {
      return res.status(500).json({
        success: false,
        message: "pinactivation not found",
      });
    }
    return res.status(200).json({
      success: true,
      pinactivation,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
