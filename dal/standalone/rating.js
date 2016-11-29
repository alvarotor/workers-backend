var JsonDB = require("node-json-db");
var db = new JsonDB("ratingdb", true, false);
var _path = "/ratings";

module.exports = {

    create: function (data, cb) {
        try {
            db.push(_path + "[]", data, true);
            var read = db.getData(_path);
            var x = 0;
            read.forEach(function (element) {
                if (element.from === data.from)
                    x++;
            }, this);
            var found = x === 1;
            x = 0;
            read.forEach(function (element) {
                if (element.from === data.from && !found) {
                    db.delete(_path + "[" + x + "]");
                    found = true;
                }
                else
                    x++;
            }, this);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    },

    read: function (id, cb) {
        try {
            var data = db.getData(_path);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    }
}
