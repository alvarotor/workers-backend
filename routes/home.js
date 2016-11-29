var express = require("express");
var router = express.Router();
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/home");

router.get("/", function (req, res, next) {
  util.translate(myLocals, req.query.locale);
  res.json({ root: myLocals.translate("Welcome to WORKERS.") });
});

module.exports = router;
