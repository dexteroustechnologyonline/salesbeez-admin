const express = require("express");
const {
  RegisterUser,
  mobileExist,
  emailExist,
  referalcodeExist,
  LoginAdmin,
  loginUser,
  EditClientbyClientId,
  clentbyphonenumber,
  updateclentbyid,
  UploadProfilepic,
  createNewUser,
  sentOpt,
  getAllUser,
  myUserAll,
  getuserbyRefralAgent,
} = require("../controllers/userController");
const http = require("http");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/all").get(getAllUser);
router.route("/updateall").get(myUserAll);
router.route("/register").post(RegisterUser);
router.route("/register/newuser").post(createNewUser);
router.route("/loginadmin").post(LoginAdmin);
router.route("/loginUser").post(loginUser);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);
router.route("/refercode/:referacode").get(referalcodeExist);
router.route("/getuserbyagent/:agentid").get(getuserbyRefralAgent);

router.route("/agentmobile/:mobilenumber").get(clentbyphonenumber);
//router.route("//:mobilenumber").get(clentbyphonenumber);
router.route("/byclientid/:clientid").put(updateclentbyid);
router.route("/:id").put(EditClientbyClientId);
router.route("/profilepic").post(UploadProfilepic);

module.exports = router;
