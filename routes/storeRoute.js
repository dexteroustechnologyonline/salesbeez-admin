const express = require("express");
const {
    createStore,
    getAllStore,
    UpdateStore,
} = require("../controllers/storeController");

const router = express.Router();

router.route("/new").post(createStore);
router.route("/all").get(getAllStore);
router.route("/:id").put(UpdateStore);

module.exports = router;
