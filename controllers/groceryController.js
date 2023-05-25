const Grocery = require("../models/groceryModel");
const ImageResource = require("../models/imageResource");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { Console } = require("console");

exports.createGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    const grocery = await Grocery.create(req.body);
    res.status(201).json({
      success: true,
      grocery,
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

exports.getAllGrocery = catchAsyncErrors(async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json({
      success: true,
      groceries: groceries,
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
exports.getAllGroceryOffers = catchAsyncErrors(async (req, res) => {
  try {
    const offers = await Grocery.find({ offers: true });
    res.status(200).json({
      success: true,
      offers: offers,
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
exports.getAllGroceryDealoftheDay = catchAsyncErrors(async (req, res) => {
  try {
    const dealoftheday = await Grocery.find({ dealoftheday: true });
    res.status(200).json({
      success: true,
      dealofthedays: dealoftheday,
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
exports.myGroceryAll = catchAsyncErrors(async (req, res) => {
  try {
    const groceries = await Grocery.find();
    for (let index = 0; index < groceries.length; index++) {
      const groceryid = groceries[index]._id;
      let grocery = await Grocery.findById(groceryid);

      if (!grocery) {
        return res.status(500).json({
          success: false,
          message: "grocery not found",
        });
      }
      // grocery.dealoftheday=false;
      grocery.options.map((option) => {
        option.maximumQuantity = 10;
      });
      grocery = await Grocery.findByIdAndUpdate(groceryid, grocery, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      groceries: groceries,
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

exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findOne({ slugUrl: req.params.slugurl });

    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "new grocery SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " grocery SlugUrl already exist",
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

exports.Uploadicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const icon = await cloudinary.v2.uploader.upload(req.body.icon, {
      folder: "Grocery/Icon",
      width: 45,
      crop: "scale",
    });

    const icons = icon.secure_url;
    const formData = {
      Familyname: req.body.Familyname ? req.body.Familyname : "Default",
      image: icons,
      imagetype: "icons",
    };
    const imageResource = await ImageResource.create(formData);

    res.status(200).json({
      success: true,
      icons,
      imageResource,
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
      folder: "Grocery/Thumbnail",
      width: 200,
      crop: "scale",
    });

    const thumbnails = thumbnail.secure_url;

    const formData = {
      Familyname: req.body.Familyname ? req.body.Familyname : "Default",
      image: thumbnails,
      imagetype: "thumbnail",
    };
    const imageResource = await ImageResource.create(formData);
    res.status(200).json({
      success: true,
      thumbnails,
      imageResource,
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

exports.Uploadbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Grocery/Banner",
      width: 600,
      crop: "scale",
    });
    const banners = banner.secure_url;

    const formData = {
      Familyname: req.body.Familyname ? req.body.Familyname : "Default",
      image: banners,
      imagetype: "product slider",
    };
    const imageResource = await ImageResource.create(formData);
    res.status(200).json({
      success: true,
      banners,
      imageResource,
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

exports.Uploadbannernew = catchAsyncErrors(async (req, res, next) => {
  try {
    const banner = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Grocery/Banner",
      width: 600,
      crop: "scale",
    });
    const banners = banner.secure_url;

    const thumbnail = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Grocery/Thumbnail",
      width: 200,
      crop: "scale",
    });
    const thumbnails = thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Grocery/Icon",
      width: 45,
      crop: "scale",
    });
    const icons = icon.secure_url;

    const desktop = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "Grocery/Desktop",
      width: 80,
      crop: "scale",
    });
    const desktopIcon = desktop.secure_url;

    res.status(200).json({
      success: true,
      banners,
      thumbnails,
      icons,
      desktopIcon,
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
exports.Uploaddesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktop = await cloudinary.v2.uploader.upload(req.body.desktopicon, {
      folder: "Grocery/Desktop",
      width: 80,
      crop: "scale",
    });

    const desktopIcon = desktop.secure_url;

    const formData = {
      Familyname: req.body.Familyname ? req.body.Familyname : "Default",
      image: desktopIcon,
      imagetype: "desktopIcon ",
    };
    const imageResource = await ImageResource.create(formData);

    res.status(200).json({
      success: true,
      desktopIcon,
      imageResource,
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

exports.UpdateGroceryPackSize = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    grocery = await grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.UpdateGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.DeleteGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    await grocery.remove();
    res.status(200).json({
      success: true,
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

exports.getbulkicons = catchAsyncErrors(async (req, res) => {
  try {
    const imageResource = await ImageResource.find();
    res.status(200).json({
      success: true,
      imageResource: imageResource,
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
