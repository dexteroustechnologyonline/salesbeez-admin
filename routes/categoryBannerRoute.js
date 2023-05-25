const express = require("express");
const {
  createCategoryBanner,
  getAllCategoryBanner,
  Uploaddesktopicon,
  Uploadmobileicon,
  UpdateCategoryBanner,
  DeleteCategoryBanner,
} = require("../controllers/categoryBannerController");

const router = express.Router();

router.route("/new").post(createCategoryBanner);
router.route("/all").get(getAllCategoryBanner);

router.route("/desktop").post(Uploaddesktopicon);
router.route("/mobile").post(Uploadmobileicon);

router.route("/updatecategorybanner/:id").put(UpdateCategoryBanner);
router.route("/deletecategorybanner/:id").delete(DeleteCategoryBanner);

module.exports = router;
