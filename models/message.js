var model = require("nodejs-model");
var bCrypt = require("bcrypt-nodejs");

module.exports = new model("Message")
    .attr("from", {
        validations: {
            presence: {
                message: "From is required!"
            }
        }
    })
    .attr("to", {
        validations: {
            presence: {
                message: "To is required!"
            }
        }
    })
    .attr("text", {
        validations: {
            presence: {
                message: "Text is required!"
            },
            length: {
                minimum: 3,
                maximum: 500,
                messages: {
                    tooShort: "Text is too short!",
                    tooLong: "Text is too long!"
                }
            }
        }
    })
    .attr("datestamp", {
        validations: {
            presence: {
                message: "DateStamp is required!"
            }
        }
    });
