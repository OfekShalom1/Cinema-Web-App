const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const membersSchema = new Schema({
  name:String,
  email:String,
  address:{city:String}
});

module.exports = mongoose.model("Member", membersSchema);