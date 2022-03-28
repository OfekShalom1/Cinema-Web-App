const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubsSchema = new Schema({
  _id:String,
  memberId:String,
  movies:Array,
  
});

module.exports = mongoose.model("Sub", SubsSchema);