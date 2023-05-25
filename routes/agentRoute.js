const express = require("express");

const {
  registerAgent,
  loginAgent,
  UploadAdhar,
  UploadPan,
  UploadAvatar,
  coversion,
  emailExist,
  mobileExist,
  adharcardExist,
  pancardExist,
  refercodeExist,
  getAllAgent,
  UpdateAgent,
  agentLoginAdmin,
  agentdetailbyid,
  downline,
  findagentbyReferalCoderphonenum,
  loginAgentwithNumber,
  otpVerify,
  UpdateAgentbymobile
} = require("../controllers/agentController");

const router = express.Router();

router.route("/register").post(registerAgent);
router.route("/all").get(getAllAgent);
router.route("/login").post(loginAgent);
router.route("/loginmobile").post(loginAgentwithNumber);
router.route("/agentrefercode/:mobile").get(findagentbyReferalCoderphonenum);
router.route("/agentlogin").post(agentLoginAdmin);
router.route("/otplogin").post(otpVerify);

router.route("/convert/:refercode").get(coversion);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);
router.route("/adharcard/:adharcard").get(adharcardExist);
router.route("/pancard/:pancard").get(pancardExist);
router.route("/refercode/:refercode").get(refercodeExist);
router.route("/agentid/:mobile").get(agentdetailbyid);
router.route("/downline/:mobile").get(downline);

router.route("/adharcard").post(UploadAdhar);
router.route("/pancard").post(UploadPan);
router.route("/avatar").post(UploadAvatar);
router.route("/UpdateagentbyMobile/:mobile").put(UpdateAgentbymobile);
router.route("/:id").put(UpdateAgent);

module.exports = router;
