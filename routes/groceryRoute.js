const express = require("express");

const {
  createGrocery,
  getAllGrocery,
  Uploadicon,
  Uploadthumbnail,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateGrocery,
  UpdateGroceryPackSize,
  DeleteGrocery,
  getbulkicons,
  Uploadbannernew,
  myGroceryAll,
  SlugUrlExist,
  getAllGroceryOffers,
  getAllGroceryDealoftheDay
} = require("../controllers/groceryController");

const router = express.Router();

router.route("/new").post(createGrocery);
router.route("/all").get(getAllGrocery);

router.route("/packsize/:id").put(UpdateGroceryPackSize);
router.route("/updateall").get(myGroceryAll);
router.route("/groceryoffers").get(getAllGroceryOffers);
router.route("/grocerydealoftheday").get(getAllGroceryDealoftheDay);
router.route("/slugurl/:slugurl").get(SlugUrlExist);


router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/bannernew").post(Uploadbannernew);
router.route("/grocerybulkimages/all").get(getbulkicons);
router.route("/:id").put(UpdateGrocery);
router.route("/:id").delete(DeleteGrocery);

module.exports = router;
