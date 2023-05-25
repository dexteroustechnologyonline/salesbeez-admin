const express = require("express");
const {
  createCommission,
  getcommissionTrabyadentId,
  myCommisionAll,
  getAllCommissions,
} = require("../controllers/commissionControl");

const router = express.Router();

router.route("/allcommission").get(getAllCommissions);
router.route("/new").post(createCommission);
router.route("/updateall").get(myCommisionAll);
router.route("/:mobile").get(getcommissionTrabyadentId);


module.exports = router;
