var express = require("express");
var router = express.Router();
const eidService = require("../services/eidService");

router.get("/", async function (req, res, next) {
  const cardData = await eidService.getCardData();
  console.log("CARD DATA: " + cardData);
  res.send(cardData);
});

module.exports = router;
