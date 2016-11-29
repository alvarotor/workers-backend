var config = require("../config/settings");
var model = require("../models/message");
var user = require("./user");
var dal = require("../dal/" + config.database_type + "/message");
var toURLString = require("speakingurl");
var NodeCache = require("node-cache");
var myCache = new NodeCache({ stdTTL: 300, checkperiod: 310 }); //300 = 5 min
var myCacheName = "message";
var emailer = require("./emailer");
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/message");

module.exports = {

    create: function (from, data, locale, cb) {
        var fromUrl = data.fromUrl;
        var message = model.create();
        message.from(from);
        message.update(data);
        message.datestamp(new Date().getTime());
        message.validate().then(function () {
            if (!message.isValid)
                return cb(message.errors, null);
            dal.create(message.toJSON(), function (err, data) {
                if (err)
                    return cb(err, null);
                myCache.del(myCacheName + "allLasts" + data.from);
                myCache.del(myCacheName + "allWith" + data.from + data.to);
                myCache.del(myCacheName + "allWith" + data.to + data.from);
                emailer.newMessage(fromUrl, data.to, locale, function (err, statusCode, body, headers) {
                    if (err)
                        return cb(err, null);
                    return cb(null, data);
                });
            });
        }).catch(function (err) {
            return cb(err, null);
        });
    },

    readAllLasts: function (id, locale, cb) {
        util.translate(myLocals, locale);
        if (id === null || id === undefined)
            return cb(myLocals.translate("Must provide a valid id."), null);
        myCache.get(myCacheName + "allLasts" + id, function (err, value) {
            if (err)
                return cb(err, null);
            if (value != undefined)
                return cb(null, value);
            _read(function (err, messages) {
                if (err)
                    return cb(err, null);
                var mines = messages.filter(function (item) {
                    if (item.from === id || item.to === id)
                        return item;
                });
                var result = [];
                mines.map(function (item) {
                    var found = false;
                    var contact = item.to === id ? item.from : item.to;
                    user.getUsernameByEmail(contact, function (err, data) {
                        item.name = data;
                        item.url = toURLString(data);
                        if (result.length === 0)
                            result.push(item);
                        else {
                            for (var i = 0; i <= result.length - 1; i++)
                                if (result[i].from === contact || result[i].to === contact)
                                    if (result[i].datestamp < item.datestamp) {
                                        result.splice(i, 1);
                                        result.push(item);
                                        found = true;
                                        break;
                                    }
                            if (!found)
                                result.push(item);
                        }
                    });
                });
                myCache.set(myCacheName + "allLasts" + id, result, function (err, success) {
                    if (err)
                        return cb(err, null);
                    if (success)
                        return cb(null, result);
                    return cb("cache internal failure", null);
                });
            });
        });
    },

    readWith: function (id, to, locale, cb) {
        util.translate(myLocals, locale);
        if (id === null || id === undefined || to === null || to === undefined)
            return cb(myLocals.translate("Must provide a valid id and to."), null);
        user.getEmailByNameUrl(to, function (err, emailTo) {
            myCache.get(myCacheName + "allWith" + id + emailTo, function (err, value) {
                if (err)
                    return cb(err, null);
                if (value != undefined)
                    return cb(null, value);
                _read(function (err, messages) {
                    if (err)
                        return cb(err, null);
                    var result = messages.filter(function (item) {
                        if ((item.from === id && item.to === emailTo) || (item.from === emailTo || item.to === id))
                            return item;
                    });
                    myCache.set(myCacheName + "allWith" + id + emailTo, result, function (err, success) {
                        if (err)
                            return cb(err, null);
                        if (success)
                            return cb(null, result);
                        return cb("cache internal failure", null);
                    });
                });
            });
        });
    },
}

function _read(cb) {
    try {
        dal.read(function (err, data) {
            if (err && err.id != 5)
                return cb(err, null);
            var messages = [];
            for (var item in data) {
                var m = model.create();
                m.update(data[item]);
                messages.push(m.toJSON());
            }
            return cb(null, messages);
        });
    } catch (err) {
        return cb(err, null);
    };
}
