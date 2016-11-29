var NodeCache = require("node-cache");
var myCache = new NodeCache({ stdTTL: 300, checkperiod: 310 }); //300 = 5 min
var myCacheName = "tags";
var tagDAL = require("../dal/standalone/tag");
var model = require("../models/tag");

module.exports = {

    all: function (locale, cb) {
        myCache.get(myCacheName + "allTags" + locale, function (err, value) {
            if (err)
                return cb(err, null);
            else {
                if (value != undefined)
                    return cb(null, value);
                _all(locale, function (err, readAll) {
                    if (err)
                        return cb(err, null);
                    myCache.set(myCacheName + "allTags" + locale, readAll, function (err, success) {
                        if (err)
                            return cb(err, null);
                        if (success)
                            return cb(null, readAll);
                        return cb("cache internal failure", null);
                    });
                });
            }
        });
    },
}

function _all(locale, cb) {
    try {
        tagDAL.all(function (err, data) {
            if (err && err.hasOwnProperty("id"))
                return cb(err, null);
            var tags = [];
            data.forEach(function (item) {
                var tag = model.create();
                tag.id(item.id);
                tag.text(item[locale].text);
                tag.description(item[locale].description);
                tags.push(tag.toJSON());
            }, this);
            return cb(null, tags);
        });
    } catch (err) {
        return cb(err, null);
    };
}
