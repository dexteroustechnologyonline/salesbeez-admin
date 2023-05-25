
const express = require("express");
const { createPinAmount ,getAllPinAmount, UpdatePinAmount,DeletePinAmount} = require("../controllers/PinAmountController");


const router = express.Router();
router.route("/new").post(createPinAmount);
router.route("/all").get(getAllPinAmount);
router.route("/:id").put(UpdatePinAmount);
router.route("/:id").delete(DeletePinAmount);


module.exports = router;