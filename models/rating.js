var model = require("nodejs-model");
var bCrypt = require("bcrypt-nodejs");

module.exports = new model("Rating")
    .attr("id", {
        validations: {
            presence: {
                message: "Id is required!"
            }
        }
    })
    .attr("from", {
        validations: {
            presence: {
                message: "From is required!"
            }
        }
    })
    .attr("number", {
        validations: {
            presence: {
                message: "Number is required!"
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
