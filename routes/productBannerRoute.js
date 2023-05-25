const express = require("express");
const {
  createProductbanner,
  getAllProductbanner,
  Uploaddesktopicon,
  Uploadmobileicon,
  UpdateProductbanner,
  DeleteProductbanner,
} = require("../controllers/productBannerController");

const router = express.Router();

router.route("/new").post(createProductbanner);
router.route("/all").get(getAllProductbanner);

router.route("/desktop").post(Uploaddesktopicon);
router.route("/mobile").post(Uploadmobileicon);

router.route("/updateproductbanner/:id").put(UpdateProductbanner);
router.route("/deleteproductbanner/:id").delete(DeleteProductbanner);

module.exports = router;
