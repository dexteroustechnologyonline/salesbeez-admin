const express = require("express");

const {createAddress,GetAddressbyClientid,EditAddressbyAddressid,DeleteAddress,createNewAddress} = require("../controllers/addressController");

const router = express.Router();

router.route("/new").post(createAddress);
router.route("/newaddress").post(createNewAddress);
router.route("/:id").get(GetAddressbyClientid);
router.route("/:id").put(EditAddressbyAddressid);
router.route("/:id").delete(DeleteAddress);



module.exports = router;