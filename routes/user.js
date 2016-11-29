var express = require("express");
var router = express.Router();
var user = require("../core/user");
var passport = require("passport");
var util = require('../util/util');
var Localize = require("localize");
var myLocals = new Localize("localizations/user");

router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    user.all(function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ all: data });
    });
});

router.post("/saveprofile", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    util.translate(myLocals, req.query.locale);
    if (!req.body.description || !req.body.mobile || !req.body.address || !req.body.tags)
        return res.status(400).json({ app_err: myLocals.translate("Please provide description, tags, mobile and address.") });
    req.body.image = req.body.image.replace(/ /g, "+");
    user.saveProfile(user.getEmailFromTokenUser(req.headers), req.body, req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ profile_saved: data });
    });
});

router.get("/getmyprofile", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    user.getMyProfile(user.getEmailFromTokenUser(req.headers), req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ myuser: data });
    });
});

router.get("/getprofile/:url", function (req, res, next) {
    util.translate(myLocals, req.query.locale);
    if (!req.params.url)
        return res.status(400).json({ app_err: myLocals.translate("Please provide url.") });
    user.getProfile(req.params.url, req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ profile: data });
    });
});

router.post("/search", function (req, res, next) {
    util.translate(myLocals, req.query.locale);
    if (!req.body.regLat || !req.body.regLng || !req.body.tag || !req.body.radius)
        return res.status(400).json({ app_err: myLocals.translate("Please provide radius, tag, lat and lng.") });
    user.search(req.body, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ users: data });
    });
});

router.post("/activate", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    util.translate(myLocals, req.query.locale);
    if (!req.body.code)
        return res.status(400).json({ app_err: myLocals.translate("Please provide code.") });
    user.activate(user.getEmailFromTokenUser(req.headers), req.body.code, req.query.locale, function (err, data) {
        if (err)
            return res.status(500).json({ err });
        res.json({ activate: data });
    });
});

module.exports = router;
