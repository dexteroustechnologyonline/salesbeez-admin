const express = require("express");

const {createGeneralOrder, getAllGeneralOrder, UpdateGeneralOrder,GetClientByGeneralOrder} = require("../controllers/generalOrderController");

const router = express.Router();

router.route("/new").post(createGeneralOrder);
router.route("/all").get(getAllGeneralOrder);
router.route("/:id").put(UpdateGeneralOrder);
router.route("/:id").get(GetClientByGeneralOrder);

module.exports = router;