const express = require("express");
const {
    createOurTeam,
    getAllOurTeam,
    UpdateOurTeam,
    DeleteOurTeam,
    Uploadicon
} = require("../controllers/ourTeamController");

const router = express.Router();

router.route("/new").post(createOurTeam);
router.route("/all").get(getAllOurTeam);


router.route("/icon").post(Uploadicon);
router.route("/:id").put(UpdateOurTeam);
router.route("/:id").delete(DeleteOurTeam);

module.exports = router;
