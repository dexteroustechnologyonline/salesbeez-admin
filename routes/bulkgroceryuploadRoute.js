const express = require("express");
const {Uploadicon} = require("../controllers/bulkgroceryuploadControlLer");

const router = express.Router();


router.route("/icon").post(Uploadicon);

module.exports = router;