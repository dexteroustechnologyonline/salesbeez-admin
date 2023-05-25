const Generalorder = require("../models/generalOrderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createGeneralOrder = catchAsyncErrors(async(req,res,next)=>{
    try {
        const generalorder = await Generalorder.create(req.body);
        res.status(201).json({
            success  : true,
            generalorder,
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

exports.getAllGeneralOrder = catchAsyncErrors (async(req,res) =>{
  try {
      const generalorders = await Generalorder.find();
      res.status(200).json({
          success: true,
          generalorders:generalorders
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
  exports.UpdateGeneralOrder = catchAsyncErrors(async (req, res, next) => {
    try {
      let generalorder = await Generalorder.findById(req.params.id);
      if (!generalorder) {
        return res.status(500).json({
          success: false,
          message: "generalorder not found",
        });
      }
      generalorder = await Generalorder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        generalorder:generalorder,
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

  // exports.GetClientByGeneralOrder = catchAsyncErrors(

  //   async (req, res, next) => {
  //     try {
  //       let generalorder = await Generalorder.find({ clientId: req.params.clientId,  });
  
  //     if (!generalorder) {
  //       return res.status(500).json({
  //         success: false,
  //         message: "new clientId",
  //       });
  //     } 
  
  //     return res.status(200).json({
  //       success: true,
  //       message: " clientId already exist",
  //     });
  //     } catch (error) {
  //       res.status(501).json({
  //           success: false,
  //           massage: error._message,
  //           error:error
  //         });
  //         res.status(400).json({
  //           success: false,
  //           massage: error._message,
  //           error:error
  //         });
  //         res.status(500).json({
  //           success: false,
  //           massage: error._message,
  //           error:error
  //         });
  //     }
  // });
  exports.GetClientByGeneralOrder = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let generalorder = await Generalorder.find({ clientId: req.params.id,  });
  
      if (!generalorder) {
        return res.status(500).json({
          success: false,
          message: "generalorder not found",
        });
      } 
      return res.status(200).json({
        success: true,
        generalorder,
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