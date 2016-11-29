var express = require("express");
var router = express.Router();
var web = require("../core/web");
var tag = require("../core/tag");
var emailer = require("../core/emailer");
var Localize = require("localize");
var myLocals = new Localize("localizations/web");

router.get("/about", function (req, res, next) {
    web.about(function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ about: data });
    });
});

router.get("/termsconditions", function (req, res, next) {
    web.termsConditions(req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ termsconditions: data });
    });
});

router.get("/privacypolicydataprotection", function (req, res, next) {
    web.privacyPolicyDataProtection(req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ privacypolicydataprotection: data });
    });
});

router.post("/sendcontactform", function (req, res, next) {
    if (!req.body.name || !req.body.message || !req.body.email || !req.body.subject)
        return res.status(400).json({ app_err: myLocals.translate("Please pass name, message and email.") });
    emailer.sendContactForm(req.body, function (err, status, body, headers) {
        if (err)
            return res.status(500).json({ err });
        res.json({ status, body, headers });
    });
});

router.get("/tag", function (req, res, next) {
    tag.all(req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        if (data.length === 0)
            return res.status(404).json({ "tags": data });
        res.json({ tags: data });
    });
});

module.exports = router;
