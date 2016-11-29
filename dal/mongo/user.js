var config = require("../../config/settings");
var monk = require("monk");
var db = monk(config.database_address);
var col = db.get("user");

db.then(() => {
    console.log("User: connected correctly to mongo server");
});

module.exports = {

    create: function (email, data, cb) {
        try {
            col.remove({ email: email }).then(() => {
                return col.insert(data);
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

    read: function (email, cb) {
        try {
            col.find({ email: email }).then((u) => {
                if (u.length > 0)
                    return cb(null, u[0])
                return cb(null, u);
            }).catch((err) => {
                return cb(err, null);
            });
            // .then(() => db.close());
        } catch (err) {
            return cb(err, null);
        }
    },

    all: function (cb) {
        try {
            col.find({}).then((u) => {
                return cb(null, u);
            }).catch((err) => {
                return cb(err, null);
            });
        } catch (err) {
            return cb(err, null);
        }
    },

    // delete: function (usernameurl, cb) {
    //     try {
    //         var data = db.delete(_path + "/" + usernameurl);
    //         return cb(null, true);
    //     } catch (err) {
    //         return cb(err, null);
    //     }
    // },
}
