const BussinessHistory = require("../models/bussinessHistoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.createBussinessHistory = catchAsyncErrors(async (req, res, next) => {
    try {
        const bussinessHistory = await BussinessHistory.create(req.body);

        res.status(201).json({
            success: true,
            bussinessHistory,
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
exports.getAllbussinessHistories = catchAsyncErrors(async (req, res) => {
    try {
        const bussinessHistories = await BussinessHistory.find();
        res.status(200).json({
            success: true,
            bussinessHistories: bussinessHistories,
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