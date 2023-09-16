const express = require("express");
const {
    createKit,
    getAllKit,
    UpdateKit,
    Uploadthumbnail
} = require("../controllers/kitController");

const router = express.Router();

router.route("/new").post(createKit);
router.route("/all").get(getAllKit);
router.route("/:id").put(UpdateKit);

router.route("/thumbnail").post(Uploadthumbnail);

module.exports = router;