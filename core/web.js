var NodeCache = require("node-cache");
var myCache = new NodeCache({ stdTTL: 300, checkperiod: 310 }); //300 = 5 min
var myCacheName = "web";
var util = require('../util/util');
var Localize = require("localize");
var myLocals = new Localize("localizations");

module.exports = {

    about: function (cb) {
        myCache.get(myCacheName + "about", function (err, value) {
            if (err)
                return cb(err, null);
            if (value != undefined)
                return cb(null, value);
            _about(function (err, readValue) {
                if (err)
                    return cb(err, null);
                myCache.set(myCacheName + "about", readValue, function (err, success) {
                    if (err)
                        return cb(err, null);
                    if (success)
                        return cb(null, readValue);
                    return cb("cache internal failure", null);
                });
            });
        });
    },

    termsConditions: function (locale, cb) {
        util.translate(myLocals, locale);
        myCache.get(myCacheName + "termsConditions" + locale, function (err, value) {
            if (err)
                return cb(err, null);
            if (value != undefined)
                return cb(null, value);
            _termsConditions(function (err, readValue) {
                if (err)
                    return cb(err, null);
                myCache.set(myCacheName + "termsConditions" + locale, readValue, function (err, success) {
                    if (err)
                        return cb(err, null);
                    if (success)
                        return cb(null, readValue);
                    return cb("cache internal failure", null);
                });
            });
        });
    },

    privacyPolicyDataProtection: function (locale, cb) {
        util.translate(myLocals, locale);
        myCache.get(myCacheName + "privacyPolicyDataProtection" + locale, function (err, value) {
            if (err)
                return cb(err, null);
            if (value != undefined)
                return cb(null, value);
            _privacyPolicyDataProtection(function (err, readValue) {
                if (err)
                    return cb(err, null);
                myCache.set(myCacheName + "privacyPolicyDataProtection" + locale, readValue, function (err, success) {
                    if (err)
                        return cb(err, null);
                    if (success)
                        return cb(null, readValue);
                    return cb("cache internal failure", null);
                });
            });
        });
    },
}

function _about(cb) {
    try {
        return cb(null, myLocals.translate(myLocals.strings.aboutus));
    } catch (err) {
        return cb(err, null);
    };
}

function _termsConditions(cb) {
    try {
        return cb(null, myLocals.translate(myLocals.strings.termsconditions));
    } catch (err) {
        return cb(err, null);
    };
}

function _privacyPolicyDataProtection(cb) {
    try {
        return cb(null, myLocals.translate(myLocals.strings.privacypolicydataprotection));
    } catch (err) {
        return cb(err, null);
    };
}
