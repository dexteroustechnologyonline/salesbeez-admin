const express = require("express");

const {createGroceryOrder, GetGroceyOrderbyClientid,getAllGroceryOrder,UpdateGroceryOrder,GetGroceyOrderbyAgentid} = require("../controllers/groceryOrderController");

const router = express.Router();

router.route("/new").post(createGroceryOrder);
router.route("/all").get(getAllGroceryOrder);

router.route("/client/:clientid").get(GetGroceyOrderbyClientid);
router.route("/agent/:id").get(GetGroceyOrderbyAgentid);
router.route("/:id").put(UpdateGroceryOrder);

module.exports = router;