const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MoviesSchema = new Schema({
    name:String,
    genres : Array,
    image:{medium:String},
    premiered:String
})  
module.exports = mongoose.model("Movie" ,MoviesSchema )