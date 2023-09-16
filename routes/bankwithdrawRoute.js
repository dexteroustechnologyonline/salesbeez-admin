const express = require("express");
const {
    createBankWithdraw,
    getbankWithdrawTrabyadentId,
    getAllbankWithdraw,
    UpdateAgentBankWithdrawal,
    createBulkBankWithdrawandCommission
} = require("../controllers/bankwithdreawControl");

const router = express.Router();

router.route("/new").post(createBankWithdraw);
router.route("/bulkbankwithdraw").post(createBulkBankWithdrawandCommission);
router.route("/all").get(getAllbankWithdraw);

router.route("/bank/:id").put(UpdateAgentBankWithdrawal);
router.route("/:id").get(getbankWithdrawTrabyadentId);

module.exports = router;