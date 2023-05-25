const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const BankWithdraw = require("../models/bankWithdralModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createBankWithdraw =catchAsyncErrors(async (req, res, next)=>{
    try {
      const bankWithdraw = await BankWithdraw.create(req.body);
      res.status(201).json({
        success:true, 
        bankWithdraw
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

  exports.getAllbankWithdraw = catchAsyncErrors (async(req,res) =>{
    try {
        const bankWithdraw = await BankWithdraw.find();
        res.status(200).json({
            success: true,
            bankWithdraw:bankWithdraw
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

  exports.getbankWithdrawTrabyadentId = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let bankWithdraw = await BankWithdraw.find({ agentId: req.params.id,  });
  
      if (!bankWithdraw) {
        return res.status(500).json({
          success: false,
          message: "bankWithdraw not found",
        });
      } 
      return res.status(200).json({
        success: true,
        bankWithdraw,
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

  exports.UpdateAgentBankWithdrawal = catchAsyncErrors(async (req, res, next) => {
    try {
      let bankWithdraw = await BankWithdraw.findById(req.params.id);
      if (!bankWithdraw) {
        return res.status(500).json({
          success: false,
          message: "bankWithdraw not found",
        });
      }
      bankWithdraw = await BankWithdraw.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        bankWithdraw:bankWithdraw,
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