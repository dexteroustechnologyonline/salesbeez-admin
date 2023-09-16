const Store = require("../models/storeModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createStore = catchAsyncErrors(async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({
      success: true,
      store,
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

exports.getAllStore = catchAsyncErrors(async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json({
      success: true,
      stores: stores,
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

exports.UpdateStore = catchAsyncErrors(async (req, res, next) => {
  try {
    let store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(500).json({
        success: false,
        message: "store not found",
      });
    }
    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      store: store,
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
