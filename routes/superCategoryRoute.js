const express = require("express");
const { createsuperCategory ,getAllSuperCategory, UpdateSuperCategory,DeleteSuperCategory} = require("../controllers/superCategoryController");


const router = express.Router();
router.route("/new").post(createsuperCategory);
router.route("/all").get(getAllSuperCategory);
router.route("/:id").put(UpdateSuperCategory);
router.route("/:id").delete(DeleteSuperCategory);


module.exports = router;