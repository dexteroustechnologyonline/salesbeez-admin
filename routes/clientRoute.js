const express = require("express");
const {loginClient, isClient,registerClient,getAllClient } = require("../controllers/clientController");

const router = express.Router();


// router.route("/register").post(registerClient);
// router.route("/all").get(getAllClient);
router.route("/new").post(registerClient);
router.route("/all").get(getAllClient);
router.route("/login").put(loginClient);
router.route("/isClient/:mobile").post(isClient);

module.exports = router;