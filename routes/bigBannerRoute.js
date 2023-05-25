const express = require("express");
const {createBigBanner, getAllBigBanners, Uploadbanner} = require("../controllers/BigBannerController");

const router = express.Router();

router.route("/new").post(createBigBanner);
router.route("/all").get(getAllBigBanners);

router.route("/banner").post(Uploadbanner);

module.exports = router;