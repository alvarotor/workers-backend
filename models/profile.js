var model = require("nodejs-model");

module.exports = new model("Profile")
    .attr("username", {
        validations: {
            presence: {
                message: "Username is required!"
            }
        }
    })
    .attr("name", {
        validations: {
            presence: {
                message: "Name is required!"
            }
        }
    })
    .attr("url", {
        validations: {
            presence: {
                message: "Name Url is required!"
            }
        }
    })
    .attr("description")
    .attr("rating")
    .attr("address", {
        validations: {
            presence: {
                message: "Address is required!"
            }
        }
    })
    .attr("email")
    .attr("hourRate")
    .attr("dayRate")
    .attr("regLng", {
        validations: {
            presence: {
                message: "Latitude is required!"
            }
        }
    })
    .attr("regLat", {
        validations: {
            presence: {
                message: "Longitude is required!"
            }
        }
    })
    .attr("curLat", {
        validations: {
            presence: {
                message: "Current Latitude is required!"
            }
        }
    })
    .attr("curLng", {
        validations: {
            presence: {
                message: "Current Longitude is required!"
            }
        }
    })
    .attr("mobile", {
        validations: {
            presence: {
                message: "Mobile is required!"
            }
        }
    })
    .attr("credit")
    .attr("available")
    .attr("tags", {
        validations: {
            presence: {
                message: "Tags required!"
            }
        }
    })
    .attr("activated");
