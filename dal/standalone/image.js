var JsonDB = require("node-json-db");
var db = new JsonDB("imagesdb", true, false);
var _path = "/images/";

module.exports = {

    create: function (id, data, cb) {
        try {
            db.push(_path + id, data, true);
            return cb(null, data);
        }
        catch (err) {
            return cb(err, null);
        }
    },

    read: function (id, cb) {
        try {
            var data = db.getData(_path + id);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    }
}
