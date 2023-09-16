const express = require("express");

const {
  createPinactivation,
  UpdatePinActivation,
  getAllPinActivation,
  PinActivationAgentid,
} = require("../controllers/pinactivationCountroller");
const router = express.Router();
router.route("/new").post(createPinactivation);
router.route("/all").get(getAllPinActivation);
router.route("/agentid/:id").get(PinActivationAgentid);
router.route("/:id").put(UpdatePinActivation);

module.exports = router;
