const mongoose = require("mongoose")

const connectDB = async() => {
    const uri = "mongodb://localhost:27017/UsersDB";
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
    await mongoose.connect(uri, options);
    console.log("connected to Permissions JSON DB");
}
module.exports= connectDB