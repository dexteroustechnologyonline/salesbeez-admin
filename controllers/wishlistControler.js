const Wishlist = require("../models/wishListModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.createWishlist = catchAsyncErrors(async(req,res,next)=>{
    try {
        const wishlist = await Wishlist.create(req.body);
        res.status(201).json({
            success  : true,
            wishlist,
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

exports.getAllWishlist = catchAsyncErrors (async(req,res) =>{
    try {
        const wishlists = await Wishlist.find();
        res.status(200).json({
            success: true,
            wishlists:wishlists
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

exports.UpdateWishlist = catchAsyncErrors(async (req, res, next) => {
    try {
      let wishlist = await Wishlist.findById(req.params.id);
      if (!wishlist) {
        return res.status(500).json({
          success: false,
          message: "wishlist not found",
        });
      }
      wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        wishlist:wishlist,
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

  exports.DeleteWishlist = catchAsyncErrors(async (req, res, next) => {
    try {
      let wishlist = await Wishlist.findById(req.params.id);
      if (!wishlist) {
        return res.status(500).json({
          success: false,
          message: "wishlist not found",
        });
      }
      await wishlist.remove()
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

  exports.getWishlistbyid = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let wishlist = await Wishlist.find({ clientId: req.params.id,  });
  
      if (!wishlist) {
        return res.status(500).json({
          success: false,
          message: "wishlist not found",
        });
      } 
      return res.status(200).json({
        success: true,
        wishlist,
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