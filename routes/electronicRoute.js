const express = require("express");

const {createElectronic,
       getAllElectronic,
       Uploadicon,
       Uploadthumbnail,
       Uploadbanner,
       Uploaddesktopicon,
       UpdateElectronic,
       DeleteElectronics,
       UploadNewimages,
       myElectronicsAll
} = require("../controllers/electronicController");

const router = express.Router();

router.route("/new").post(createElectronic);
router.route("/all").get(getAllElectronic);

router.route("/updateall").get(myElectronicsAll);


router.route("/icon").post(Uploadicon);
router.route("/thumbnail").post(Uploadthumbnail);
router.route("/banner").post(Uploadbanner);
router.route("/desktopicon").post(Uploaddesktopicon);
router.route("/multipleimages").post(UploadNewimages);

router.route("/:id").put(UpdateElectronic);
router.route("/:id").delete(DeleteElectronics);

module.exports = router;

