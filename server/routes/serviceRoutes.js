const express = require("express");
const { getAd,createAd, createSummary, getSummary } = require("../controllers/serviceController");

const router = express.Router();

router.route("/Ad").get(getAd).post(createAd);
router.route("/Summary").get(getSummary).post(createSummary);

module.exports = router;
