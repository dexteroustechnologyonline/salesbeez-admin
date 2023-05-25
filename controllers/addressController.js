const Address = require("../models/addressModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createAddress = catchAsyncErrors(async(req,res,next)=>{
    try {
        const address = await Address.create(req.body);
        res.status(201).json({
            success  : true,
            address,
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
exports.createNewAddress = catchAsyncErrors(async(req,res,next)=>{
    try {
        const address = await Address.create(req.body);
        res.status(201).json({
            success  : true,
            address,
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

exports.GetAddressbyClientid = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let address = await Address.find({ clientId: req.params.id,  });
  
      if (!address) {
        return res.status(500).json({
          success: false,
          message: "address not found",
        });
      } 
      return res.status(200).json({
        success: true,
        address,
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

  exports.EditAddressbyAddressid = catchAsyncErrors(async (req, res, next) => {
    try {
      let address = await Address.findById(req.params.id);
      if (!address) {
        return res.status(500).json({
          success: false,
          message: "address not found",
        });
      }
      address = await Address.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        address:address,
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

  exports.DeleteAddress = catchAsyncErrors(async (req, res, next) => {
    try {
      let address = await Address.findById(req.params.id);
      if (!address) {
        return res.status(500).json({
          success: false,
          message: "address not found",
        });
      }
      await address.remove()
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