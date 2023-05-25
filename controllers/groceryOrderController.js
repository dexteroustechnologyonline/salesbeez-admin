const Groceryorder = require("../models/groceryOrderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createGroceryOrder = catchAsyncErrors(async(req,res,next)=>{
    try {
        const groceryorder = await Groceryorder.create(req.body);
        res.status(201).json({
            success  : true,
            groceryorder,
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

exports.getAllGroceryOrder = catchAsyncErrors (async(req,res) =>{
  try {
      const groceryorders = await Groceryorder.find();
      res.status(200).json({
          success: true,
          groceryorders:groceryorders
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

exports.GetGroceyOrderbyClientid = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let groceryorder = await Groceryorder.find({ clientId: req.params.clientid,  });
  
      if (!groceryorder) {
        return res.status(500).json({
          success: false,
          message: "groceryorder not found",
        });
      } 
      return res.status(200).json({
        success: true,
        groceryorder,
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
  
exports.GetGroceyOrderbyAgentid = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let groceryorder = await Groceryorder.find({ agentId: req.params.id,  });
  
      if (!groceryorder) {
        return res.status(500).json({
          success: false,
          message: "groceryorder not found",
        });
      } 
      return res.status(200).json({
        success: true,
        groceryorder,
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

  exports.UpdateGroceryOrder = catchAsyncErrors(async (req, res, next) => {
    try {
      let groceryorder = await Groceryorder.findById(req.params.id);
      if (!groceryorder) {
        return res.status(500).json({
          success: false,
          message: "groceryorder not found",
        });
      }
      groceryorder = await Groceryorder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        groceryorder:groceryorder,
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