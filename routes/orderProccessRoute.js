const express = require("express");

const {
    UpdateOrderProccessing,
} = require("../controllers/orderProccessController");

const router = express.Router();

router.route("/orderproccessing/:id").put(UpdateOrderProccessing);

module.exports = router;