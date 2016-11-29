var config = require("../config/settings");
var model = require("../models/rating");
var user = require("./user");
var dal = require("../dal/" + config.database_type + "/rating");
var NodeCache = require("node-cache");
var myCache = new NodeCache({ stdTTL: 300, checkperiod: 310 }); //300 = 5 min
var myCacheName = "rating";
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/rating");

module.exports = {

    create: function (from, data, cb) {
        var rating = model.create();
        rating.update(data);
        rating.from(from);
        rating.datestamp(new Date().getTime());
        rating.validate().then(function () {
            if (!rating.isValid)
                return cb(rating.errors, null);
            dal.create(rating.toJSON(), function (err, data) {
                if (err)
                    return cb(err, null);
                myCache.del(myCacheName + "readprofile" + data.id + data.from);
                myCache.del(myCacheName + "readprofile" + data.id);
                return cb(null, data);
            });
        }).catch(function (err) {
            return cb(err, null);
        });
    },

    readProfileAuth: function (from, id, locale, cb) {
        util.translate(myLocals, locale);
        if (from === null || from === undefined || id === null || id === undefined)
            return cb(myLocals.translate("Must provide a valid id and from."), null);
        user.getEmailByNameUrl(id, function (err, email) {
            if (err || !email)
                return cb(err, null);
            myCache.get(myCacheName + "readprofile" + email + from, function (err, value) {
                if (err)
                    return cb(err, null);
                if (value != undefined)
                    return cb(null, value);
                _readAll(email, function (err, ratings) {
                    if (err)
                        return cb(err, null);
                    var x = 0, sum = 0, myrating = 0;
                    ratings.forEach(function (element) {
                        if (element.from == from)
                            myrating = parseInt(element.number);
                        sum += parseInt(element.number);
                        x++;
                    }, this);
                    if (x === 0)
                        ratings.average = 0;
                    else
                        ratings.average = sum / x;
                    ratings.myrating = myrating;
                    myCache.set(myCacheName + "readprofile" + email + from, ratings, function (err, success) {
                        if (err)
                            return cb(err, null);
                        if (success)
                            return cb(null, ratings);
                        return cb("cache internal failure", null);
                    });
                });
            });
        });
    },

    readProfile: function (id, locale, cb) {
        util.translate(myLocals, locale);
        if (id === null || id === undefined)
            return cb(myLocals.translate("Must provide a valid id and from."), null);
        user.getEmailByNameUrl(id, function (err, email) {
            if (err || !email)
                return cb(err, null);
            myCache.get(myCacheName + "readprofile" + email, function (err, value) {
                if (err)
                    return cb(err, null);
                if (value != undefined)
                    return cb(null, value);
                _readAll(email, function (err, ratings) {
                    if (err)
                        return cb(err, null);
                    var x = 0, sum = 0;
                    ratings.forEach(function (element) {
                        sum += parseInt(element.number);
                        x++;
                    }, this);
                    ratings.average = sum / x;
                    myCache.set(myCacheName + "readprofile" + email, ratings, function (err, success) {
                        if (err)
                            return cb(err, null);
                        if (success)
                            return cb(null, ratings);
                        return cb("cache internal failure", null);
                    });
                });
            });
        });
    }
}

function _readAll(id, cb) {
    try {
        dal.read(id, function (err, data) {
            if (err && err.id != 5)
                return cb(err, null);
            var ratings = [];
            for (var item in data) {
                var m = model.create();
                m.update(data[item]);
                ratings.push(m.toJSON());
            }
            return cb(null, ratings);
        });
    } catch (err) {
        return cb(err, null);
    };
}
