const mongoose = require("mongoose")

const connectDB = async() => {
    const uri = "mongodb://localhost:27017/MembersDB";
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
    await mongoose.connect(uri, options);
    console.log("connected to Subs DB");
}
module.exports= connectDB