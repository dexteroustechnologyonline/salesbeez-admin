const express = require("express");
const {
  createBrand,
  getAllBrand,
  Uploadicon,
  Uploadthumbnail,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateBrand,
  DeleteBrand,
  UploadBrandnewimages,
  SlugUrlExist
} = require("../controllers/brandController");

const router = express.Router();
router.route("/new").post(createBrand);
router.route("/all").get(getAllBrand);



router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/newimages").post(UploadBrandnewimages);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/slugurl/:slugurl").get(SlugUrlExist);
router.route("/:id").put(UpdateBrand);
router.route("/:id").delete(DeleteBrand);

module.exports = router;
