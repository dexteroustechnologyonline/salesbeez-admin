const express = require("express");
const {
  createuniversalTag,
  getAllUniversalTag,
  Uploadthumbnail,
  Uploadicon,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateUniversalTag,
  DeleteUniversalTag,
  UploadMultipleImage,
} = require("../controllers/universalTagController");

const router = express.Router();
router.route("/new").post(createuniversalTag);
router.route("/all").get(getAllUniversalTag);


router.route("/thumbnail").post(Uploadthumbnail);
router.route("/icon").post(Uploadicon);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/newimages").post(UploadMultipleImage);

router.route("/:id").put(UpdateUniversalTag);
router.route("/:id").delete(DeleteUniversalTag);

module.exports = router;
