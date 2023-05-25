const express = require("express");

const {
  createCloths,
  getAllCloths,
  Uploadicon,
  Uploadthumbnail,
  Uploadbanner,
  Uploaddesktopicon,
  UpdateCloth,
  DeleteCloths,
  SlugUrlExist,
  Uploadiclothimages,
  myClothsAll
} = require("../controllers/clothsController");

const router = express.Router();

router.route("/new").post(createCloths);
router.route("/all").get(getAllCloths);

router.route("/slugurl/:slugurl").get(SlugUrlExist);
router.route("/updateall").get(myClothsAll);

router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/newimages").post(Uploadiclothimages);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/:id").put(UpdateCloth);
router.route("/:id").delete(DeleteCloths);

module.exports = router;
