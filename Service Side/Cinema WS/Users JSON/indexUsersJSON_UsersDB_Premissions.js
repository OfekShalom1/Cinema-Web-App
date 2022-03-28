const express= require("express");
const cors = require("cors")

const connectDB = require("./UsersDB")
const connectUsersDB = require("../Users DB mongo/UsersDB")
const connectPermissions = require("../Permissions JSON/PermissionsDB")

const controller = require("./UsersCont")
const controllerUsersDB = require("../Users DB mongo/UsersController")
const controllerPermissions = require("../Permissions JSON/PermissionsCont")

connectDB()
connectUsersDB()
connectPermissions()

const app = express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/users",controller)
app.use("/usersDB",controllerUsersDB)
app.use("/permissions",controllerPermissions)

app.listen(8000,() => {
    console.log("App Users Is Listening");
})