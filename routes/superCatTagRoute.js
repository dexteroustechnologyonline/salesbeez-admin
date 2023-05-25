
const express = require("express");
const { createSuperCategoryTag ,getAllSuperCategoryTag,Uploadicon,Uploadthumbnail,Uploadbanner,Uploaddesktopicon,UpdateSuperCatTag, DeleteCategoryTag} = require("../controllers/superCatTagController");


const router = express.Router();
router.route("/new").post(createSuperCategoryTag);
router.route("/all").get(getAllSuperCategoryTag);

router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);

router.route("/:id").put(UpdateSuperCatTag);
router.route("/:id").delete(DeleteCategoryTag);


module.exports = router;