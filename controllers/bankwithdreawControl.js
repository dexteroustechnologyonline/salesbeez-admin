const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const BankWithdraw = require("../models/bankWithdralModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const agentModel = require("../models/agentModel");
const Commission = require("../models/commissionModel");

exports.createBankWithdraw = catchAsyncErrors(async (req, res, next) => {
  try {
    const bankWithdraw = await BankWithdraw.create(req.body);
    res.status(201).json({
      success: true,
      bankWithdraw
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});


exports.createBulkBankWithdrawandCommission = catchAsyncErrors(async (req, res, next) => {
  try {

    let myagent = await agentModel.findOne({ mobile: String(req.body.mobile).trim() });

    let number = 0
    if (myagent) {

      const banckdetails = myagent.bankDetails;
      const personalId = myagent.personalId
      const formData = {
        agentId: myagent.mobile,
        withdrawAmount: Number(req.body.amount),
        bankDetails: {
          accountHolderName: banckdetails.accountHolderName,
          accountNumber: banckdetails.accountNumber,
          bankName: banckdetails.bankName,
          bankBranchName: banckdetails.bankBranchName,
          ifscNumber: banckdetails.ifscNumber,
          panCard: personalId.panCard,
        },
        trabsitionId: '',
        trabsitionDetails: '',
        status: "Completed",
        TrasitionDate: String(req.body.TrasitionDate)
      };
      const bankWithdraw = await BankWithdraw.create(formData);

      const transitionForm = {
        agentId: myagent.mobile,
        commission: req.body.amount * -1,
        type: 'Incentive Debited',
      };
      const commission = await Commission.create(transitionForm);

      number = number + 1

    }
    res.status(201).json({
      success: true,
      number,
    });

  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});

exports.getAllbankWithdraw = catchAsyncErrors(async (req, res) => {
  try {
    const bankWithdraw = await BankWithdraw.find();
    res.status(200).json({
      success: true,
      bankWithdraw: bankWithdraw
    })
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});

exports.getbankWithdrawTrabyadentId = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let bankWithdraw = await BankWithdraw.find({ agentId: req.params.id, });

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
        error: error
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error
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
      bankWithdraw: bankWithdraw,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});