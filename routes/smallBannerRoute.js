const express = require("express");
const {createSmallBanner, getAllSmallBanners, Uploadbanner} = require("../controllers/smallBannerController");

const router = express.Router();

router.route("/new").post(createSmallBanner);
router.route("/all").get(getAllSmallBanners);

router.route("/banner").post(Uploadbanner);

module.exports = router;