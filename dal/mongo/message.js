var config = require("../../config/settings");
var monk = require("monk");
var db = monk(config.database_address);
var col = db.get("messages");

db.then(() => {
    console.log("Messages: connected correctly to mongo server");
});

module.exports = {

    create: function (data, cb) {
        try {
            col.insert({ from: data.from, to: data.to, text: data.text, datestamp: data.datestamp }).then((doc) => {
                return cb(null, data);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        } catch (error) {
            return cb(error, null);
        }
    },

    read: function (cb) {
        try {
            col.find({}).then((messages) => {
                if (messages.length === 0)
                    return cb(null, null);
                return cb(null, messages);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        } catch (err) {
            return cb(err);
        }
    }
}
