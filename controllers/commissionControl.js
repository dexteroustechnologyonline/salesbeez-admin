const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Commission = require("../models/commissionModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createCommission = catchAsyncErrors(async (req, res, next) => {
  try {
    const commission = await Commission.create(req.body);
    res.status(201).json({
      success: true,
      commission,
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

exports.getcommissionTrabyadentId = catchAsyncErrors(async (req, res, next) => {
  try {
    let commission = await Commission.find({ agentId: req.params.mobile });

    if (!commission) {
      return res.status(500).json({
        success: false,
        message: "commission not found",
      });
    }
    return res.status(200).json({
      success: true,
      commission,
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

exports.myCommisionAll = catchAsyncErrors(async (req, res) => {
  try {
    const commissions = await Commission.find();
    for (let index = 0; index < commissions.length; index++) {
      const commissionid = commissions[index]._id;
      let commission = await Commission.findById(commissionid);

      if (!commission) {
        return res.status(500).json({
          success: false,
          message: "commission not found",
        });
      }
      commission.commissionPercentage = 2.5;

      commission = await Commission.findByIdAndUpdate(
        commissionid,
        commission,
        {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      commissions: commissions,
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

exports.getAllCommissions = catchAsyncErrors(async (req, res) => {
  try {
    const commissions = await Commission.find();
    res.status(200).json({
        success: true,
        commissions:commissions
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
