const express = require("express");
const { createAd, createSummary } = require("../controllers/serviceController");

const router = express.Router();

router.route("/createAd").post(createAd);
router.route("/createSummary").post(createSummary);

module.exports = router;
