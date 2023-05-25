const express = require("express");
const {
  createBanner,
  getAllBanner,
  Uploaddesktopicon,
  Uploadmobileicon,
  UpdateSliderBanner,
  DeleteSliderBanner,
} = require("../controllers/sliderBannerController");

const router = express.Router();

router.route("/new").post(createBanner);
router.route("/all").get(getAllBanner);


// router.route("/one/:id").get(Getbannerbyid);
// router.route("/websitebanner/:id").put(UpdatewebsiteBanner);
// router.route("/mobilebanner/:id").put(UpdatemobileBanner);

router.route("/desktop").post(Uploaddesktopicon);
router.route("/mobile").post(Uploadmobileicon);

router.route("/:id").put(UpdateSliderBanner);
router.route("/:id").delete(DeleteSliderBanner);

module.exports = router;
