var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../core/user");
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/payment");

router.post("/addcredit", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    util.translate(myLocals, req.query.locale);
    if (!req.body.value)
        return res.status(400).json({ app_err: myLocals.translate("Please provide value.") });
    user.addCredit(user.getEmailFromTokenUser(req.headers), req.body.value, req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ transaction: data.credit });
    });
});

module.exports = router;
