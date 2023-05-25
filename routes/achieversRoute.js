const express = require("express");
const {
    createachivera,getAllAchievers,DeleteAchievers,Uploaddesktopicon,Uploadmobileicon
} = require("../controllers/achiversController");

const router = express.Router();
//hello This is the current Change

router.route("/new").post(createachivera);
router.route("/all").get(getAllAchievers);


 router.route("/desktop").post(Uploaddesktopicon);
 router.route("/mobile").post(Uploadmobileicon);
 router.route("/:id").delete(DeleteAchievers);

module.exports = router;