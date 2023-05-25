const express = require("express");
const {
  createCategory,
  getAllCategory,
  Uploadthumbnail,
  Uploadicon,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateCategory,
  DeleteCategory,
  SlugUrlExist,
  Uploadnewimg,
  GetCategorybyid,
  myCategoryAll,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/new").post(createCategory);
router.route("/all").get(getAllCategory);
router.route("/updateall").get(myCategoryAll);


router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/thumbnail").post(Uploadthumbnail);
router.route("/icon").post(Uploadicon);
router.route("/banner").post(Uploadbanner);
router.route("/newimg").post(Uploadnewimg);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/one/:id").get(GetCategorybyid);
router.route("/:id").put(UpdateCategory);
router.route("/:id").delete(DeleteCategory);

module.exports = router;
