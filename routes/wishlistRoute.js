const express = require("express");
const {
    createWishlist,getAllWishlist,UpdateWishlist,DeleteWishlist,getWishlistbyid
} = require("../controllers/wishlistControler");

const router = express.Router();
router.route("/new").post(createWishlist);
router.route("/all").get(getAllWishlist);
router.route("/:id").get(getWishlistbyid);
router.route("/:id").put(UpdateWishlist);
 router.route("/:id").delete(DeleteWishlist);


module.exports = router;
