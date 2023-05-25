const express = require("express");
const { createCategoryTag ,getAllCategoryTag,Uploadicon,Uploadthumbnail,Uploadbanner,Uploaddesktopicon, UpdateCategoryTag,DeleteCategoryTag} = require("../controllers/categoryTagController");


const router = express.Router();
router.route("/new").post(createCategoryTag);
router.route("/all").get(getAllCategoryTag);


router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);

router.route("/:id").put(UpdateCategoryTag);
router.route("/:id").delete(DeleteCategoryTag);


module.exports = router;