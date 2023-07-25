const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  Uploadthumbnail,
  Uploadicon,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateSubCategory,
  DeleteSubCategory,
  getsubCategorybyId,
  UploadnewImag,
  SlugUrlExist
} = require("../controllers/subCategoryController");

const router = express.Router();
router.route("/new").post(createSubCategory);
router.route("/all").get(getAllSubCategory);


router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/newimage").post(UploadnewImag);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/:catid").get(getsubCategorybyId);
router.route("/:id").put(UpdateSubCategory);
router.route("/:id").delete(DeleteSubCategory);

module.exports = router;
