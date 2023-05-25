const express = require("express");
const {
  createSubCatBanner,
  getAllSubCatBanner,
  Uploaddesktopicon,
  Uploadmobileicon,
} = require("../controllers/subCatBannerController");

const router = express.Router();

router.route("/new").post(createSubCatBanner);
router.route("/all").get(getAllSubCatBanner);

router.route("/desktop").post(Uploaddesktopicon);
router.route("/mobile").post(Uploadmobileicon);

module.exports = router;
