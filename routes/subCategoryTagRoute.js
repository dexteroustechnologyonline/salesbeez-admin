const express = require("express");
const {
  createSubCategoryTag,
  getAllSubCategoryTag,
  Uploadthumbnail,
  Uploadicon,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateSubCategoryTag,
  DeleteSubCategoryTag
} = require("../controllers/subCategoryTagController");

const router = express.Router();
router.route("/new").post(createSubCategoryTag);
router.route("/all").get(getAllSubCategoryTag);


router.route("/thumbnail").post(Uploadthumbnail);
router.route("/icon").post(Uploadicon);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/:id").put(UpdateSubCategoryTag);
router.route("/:id").delete(DeleteSubCategoryTag);

module.exports = router;
