// var emailer = require("../core/emailer");
var express = require("express");
var router = express.Router();
var passport = require("passport");
var message = require("../core/message");
var user = require("../core/user");
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/message");

router.get("/readalllasts", passport.authenticate("jwt", { session: false }), function (req, res, next) {
  message.readAllLasts(user.getEmailFromTokenUser(req.headers), req.query.locale, function (err, data) {
    if (err)
      return res.status(500).json({ err });
    res.json({ messages: data });
  });
});

router.get("/read/:url", passport.authenticate("jwt", { session: false }), function (req, res, next) {
  util.translate(myLocals, req.query.locale);
  if (!req.params.url)
    return res.status(400).json({ app_err: myLocals.translate("Please provide url.") });
  message.readWith(user.getEmailFromTokenUser(req.headers), req.params.url, req.query.locale, function (err, data) {
    if (err)
      return res.status(500).json({ err });
    res.json({ messages: data });
  });
});

router.post("/add", passport.authenticate("jwt", { session: false }), function (req, res, next) {
  util.translate(myLocals, req.query.locale);
  if (!req.body.to || !req.body.text || !req.body.fromUrl)
    return res.status(400).json({
      app_err:
      myLocals.translate("Please provide front name to show on the email, url from name, to and text.")
    });
  message.create(user.getEmailFromTokenUser(req.headers), req.body, req.query.locale, function (err, data) {
    if (err)
      return res.status(500).json({ err });
    res.json({ message: data });
  });
});

// router.post("/email", function (req, res, next) {
//   if (!req.body.from || !req.body.to || !req.body.text)
//     return res.status(400).send("Please pass from, to and text.");
//   emailer.email(req.body.from, req.body.from, req.body.to, req.body.text, "Hello World from the SendGrid Node.js Library!",
//     function (err, status, body, headers) {
//     if (err)
//       return res.status(500).json({ err });
//     res.json({ status, body, headers });
//   });
// });

module.exports = router;
