const express = require("express");
const {
  createBussinessHistory,
  getAllbussinessHistories,
} = require("../controllers/bussinessHistoryCountroller");

const router = express.Router();

router.route("/new").post(createBussinessHistory);
router.route("/all").get(getAllbussinessHistories);

module.exports = router;