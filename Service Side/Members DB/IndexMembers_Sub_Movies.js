const express = require("express")
const cors = require("cors");

const connectDB = require("./MembersDB")
const controllerMembers = require("./MembersCont")

const connectDBMovies = require("../Movies DB/MoviesDB")
const controllerMovies = require("../Movies DB/MoviesController")

const connectDBsubs = require("../Subs DB/SubsDB");
const controllerSubs = require("../Subs DB/SubsCont")



connectDBsubs();
connectDBMovies();
connectDB();


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/members",controllerMembers);
app.use("/movies",controllerMovies)
app.use("/subs",controllerSubs)

app.listen(8001,() => {
    console.log("app is listening");
})
