const express = require("express");
const {
  createAdmin,
  loginAdminwithpassword,
  mobileExist,
  emailExist,
  UpdateAdmin,
} = require("../controllers/adminController");

const router = express.Router();
router.route("/register").post(createAdmin);
router.route("/login").post(loginAdminwithpassword);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);
router.route("/adminupdate/:id").put(UpdateAdmin);

module.exports = router;
