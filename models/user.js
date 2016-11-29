var model = require("nodejs-model");
var bCrypt = require("bcrypt-nodejs");

module.exports = new model("User")
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
    .attr("password", {
        validations: {
            presence: {
                message: "Password is required!"
            },
            length: {
                minimum: 5,
                messages: {
                    tooShort: "Password is too short!"
                }
            }
        },
        // tags: ["private"] //this tags the accessibility as _private_ 
    })
    .attr("url", {
        validations: {
            presence: {
                message: "Name Url is required!"
            }
        }
    })
    .attr("admin")
    .attr("email")
    .attr("description")
    .attr("regLat", {
        validations: {
            presence: {
                message: "Latitude is required!"
            }
        }
    })
    .attr("regLng", {
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
    .attr("tags", {
        validations: {
            presence: {
                message: "Tags are required!"
            }
        }
    })
    .attr("address", {
        validations: {
            presence: {
                message: "Address is required!"
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
    .attr("available")
    .attr("rating")
    .attr("hourRate")
    .attr("dayRate")
    .attr("credit")
    .attr("guid")
    .attr("activated")
    .attr("timeStamp");

module.exports.generateHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports.validPassword = function (userpass, passwordhash) {
    return bCrypt.compareSync(userpass, passwordhash);
};

// var model = require("nodejs-model");

// //create a new model definition _User_ and define _name_/_password_ attributes 
// var User = model("User").attr("name", {
//   validations: {
//     presence: {
//       message: "Name is required!"
//     }
//   }
// }).attr("password", {
//   validations: {
//     length: {
//       minimum: 5,
//       maximum: 20,
//       messages: {
//         tooShort: "password is too short!",
//         tooLong: "password is too long!"
//       }
//     }
//   },
//   //this tags the accessibility as _private_ 
//   tags: ["private"]
// });

// var u1 = User.create();
// //getters are generated automatically 
// u1.name("foo");
// u1.password("password");

// console.log(u1.name());
// //prints _foo_ 

// //Invoke validations and wait for the validations to fulfill 
// u1.validate(function() {
//   if u1.isValid {
//      //validated, perform business logic 
//   } else {
//      //validation failed, dump validation errors to the console 
//      console.log(p1.errors)
//   }
// });

// //get object as a plain object, ready for JSON 
// console.log(u1.toJSON());
// //produces: { name: "foo" } 

// //now also with attributes that were tagged with "private" 
// console.log(u1.toJSON("private"));
// //produces: { name: "foo" } { password: "password" } 