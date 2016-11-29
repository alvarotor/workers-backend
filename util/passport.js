var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
var user = require("../core/user");
var config = require("../config/settings");

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user.read(jwt_payload.email, function (err, data) {
            if (err)
                return done(err, false);
            if (data)
                done(null, data);
            else
                done(null, false);
        });
    }));
};
