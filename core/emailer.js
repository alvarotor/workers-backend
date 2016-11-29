var config = require("../config/settings");
var util = require("../util/util");
var Localize = require("localize");
var myLocals = new Localize("localizations/emailer");

module.exports = {

    create: function (name, email, guid, locale, cb) {
        util.translate(myLocals, locale);
        var guidClean = guid.replace(/-/g, "");
        var subject = myLocals.translate("Welcome to WORKERS.");
        var body = "<b>" + myLocals.translate("Welcome to WORKERS.") + " ✔</b>: " +
            myLocals.translate("Thanks for creating an account with us! <br /> $[1], please, to activate your email click", name) +
            " <a href='" + config.frontEndUrl + "/activate/" + guidClean + "'>" +
            myLocals.translate("here") + "</a>.";
        module.exports.email(config.mail_from_name, config.mail_from_email, email, body, subject, cb);
    },

    forgottenpassword: function (to, guid, locale, cb) {
        util.translate(myLocals, locale);
        var guidClean = guid.replace(/-/g, "");
        var subject = myLocals.translate("WORKERS forgotten password");
        var body = "<b>" + myLocals.translate("forgotten password") + " ✔</b>: " +
            myLocals.translate("Click") +
            " <a href='" + config.frontEndUrl + "/forgottenpassword/" + guidClean + "'>" +
            myLocals.translate("here") + "</a>.";
        module.exports.email(config.mail_from_name, config.mail_from_email, to, body, subject, cb);
    },

    sendContactForm: function (form, cb) {
        form.message = form.name + "<br />" + form.message;
        var subject = myLocals.translate("WORKERS new Contact Us Form");
        module.exports.email(form.subject, form.email, configMail.admin, form.message, subject, cb);
    },

    newMessage: function (fromUrl, to, locale, cb) {
        util.translate(myLocals, locale);
        var subject = myLocals.translate("You got a new message");
        module.exports.email(config.mail_from_name, config.mail_from_email, to,
            "<b>" + myLocals.translate("New message") + "  ✔</b> <a href='" + config.frontEndUrl + "/messages/" +
            fromUrl + "'>" + myLocals.translate("Click here to see it") + "</a>.", subject, cb);
    },

    addCredit: function (email, credit, locale, cb) {
        util.translate(myLocals, locale);
        var subject = myLocals.translate("You have added new credit!");
        var body = myLocals.translate("Congrats, you have added $[1] euros to your credit. ", credit) +
            myLocals.translate("Now your final credit balance is: $[1] euros.", credit);
        module.exports.email(config.mail_from_name, config.mail_from_email, email, body, subject, cb);
    },

    activate: function (email, locale, cb) {
        util.translate(myLocals, locale);
        var subject = myLocals.translate("Your account is activated!");
        var body = myLocals.translate("Congrats, your account is been activated.");
        module.exports.email(config.mail_from_name, config.mail_from_email, email, body, subject, cb);
    },

    email: function (from_name, from_email, to_email, body, subject, cb) {
        var helper = require("sendgrid").mail;
        var from_email = new helper.Email(from_email, from_name);
        var to_email = new helper.Email(to_email);
        var content = new helper.Content("text/html", body);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require("sendgrid")(config.mail_provider_key);
        var request = sg.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: mail.toJSON(),
        });

        sg.API(request, function (err, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            return cb(err, response.statusCode, response.body, response.headers);
        });
    }
}
