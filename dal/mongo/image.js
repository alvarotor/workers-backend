var config = require("../../config/settings");
var monk = require("monk");
var db = monk(config.database_address);
var col = db.get("images");

db.then(() => {
    console.log("Images: connected correctly to mongo server");
});

module.exports = {

    create: function (id, data, cb) {
        try {
            col.remove({ email: id }).then(() => {
                return col.insert({ email: id, data: data });
            }).then((doc) => {
                return cb(null, doc);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        }
        catch (err) {
            return cb(err, null);
        }
    },

    read: function (id, cb) {
        try {
            col.find({ email: id }).then((img) => {
                if (img.length === 0)
                    return cb(null, null);
                return cb(null, img[0].data);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        } catch (err) {
            return cb(err, null);
        }
    }
}
