const mongoose = require("mongoose");

const Scheme = mongoose.Schema

const UsersScheme = new Scheme({
    username:String,
    password:String
})
module.exports = mongoose.model("User",UsersScheme )