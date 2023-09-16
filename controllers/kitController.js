const Kitmodel = require("../models/KitModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createKit = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body);
        const kits = await Kitmodel.create(req.body);
        res.status(201).json({
            success: true,
            kit: kits,
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


exports.getAllKit = catchAsyncErrors(async (req, res) => {
    try {
        const kits = await Kitmodel.find();
        res.status(200).json({
            success: true,
            kits: kits,
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


exports.UpdateKit = catchAsyncErrors(async (req, res, next) => {
    try {
        let kit = await Kitmodel.findById(req.params.id);
        if (!kit) {
            return res.status(500).json({
                success: false,
                message: "kit not found",
            });
        }
        kit = await Kit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            kit: kit,
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


exports.Uploadthumbnail = catchAsyncErrors(async (req, res, next) => {
    try {
        const thumbnail = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
            folder: "kit/Thumbnail",
            width: 600,
            height: 600,
            crop: "scale",
        });

        const thumbnails = thumbnail.secure_url;
        res.status(200).json({
            success: true,
            thumbnails,
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