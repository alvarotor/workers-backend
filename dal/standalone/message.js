var JsonDB = require("node-json-db");
var db = new JsonDB("messagesdb", true, false);
var _path = "/messages";

module.exports = {

    create: function (data, cb) {
        try {
            db.push(_path + "[]", data, true);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    },

    read: function (cb) {
        try {
            var data = db.getData(_path);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    }
}
