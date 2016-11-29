var config = require("../../config/settings");
var monk = require("monk");
var db = monk(config.database_address);
var col = db.get("rating");

db.then(() => {
    console.log("Rating: connected correctly to mongo server");
});

module.exports = {

    create: function (data, cb) {
        try {
            col.remove({ from: data.from, id: data.id }).then(() => {
                return col.insert({ id: data.id, from: data.from, number: data.number, datestamp: data.datestamp });
            }).then((doc) => {
                return cb(null, doc);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        } catch (error) {
            return cb(error, null);
        }
    },

    read: function (id, cb) {
        try {
            col.find({}).then((ratings) => {
                if (ratings.length === 0)
                    return cb(null, null);
                return cb(null, ratings);
            }).catch((err) => {
                return cb(err, null);
            }).then(() => db.close());
        } catch (err) {
            return cb(err);
        }
    }
}
