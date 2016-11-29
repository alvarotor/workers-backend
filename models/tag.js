var model = require("nodejs-model");

module.exports = new model("Tag")
    .attr("id", {
        validations: {
            presence: {
                message: "ID is required!"
            }
        }
    })
    .attr("text", {
        validations: {
            presence: {
                message: "Name is required!"
            }
        }
    })
    .attr("description")
    .attr("tag");
