var JsonDB = require("node-json-db");
var db = new JsonDB("tags", true, false);
var _path = "/tags";

module.exports = {

    all: function (cb) {
        try {
            var data = db.getData(_path);
            return cb(null, data);
        } catch (err) {
            return cb(err, null);
        }
    }
}
