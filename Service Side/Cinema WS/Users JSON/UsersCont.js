const express = require("express")
const UsersBL= require("./UsersBL")

const router = express.Router();

router.route("/").get(async(req,res) => {
    try {
        
        const users= await UsersBL.GetAllUsers()
        return res.json(users)
    } catch (error) {
        return res.json(error)
    }
})

router.route("/:id").get(async(req,res) => {
    try {
        const id = req.params.id
        const user = await UsersBL.GetUserById(id)
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})
//Post
router.route("/").post(async(req,res) => {
    try {
        const user = req.body
        const result = await UsersBL.AddUser(user)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Put
router.route("/:id").put(async(req,res) => {
    try {
        const id = req.params.id
        const user = req.body
        const result = await UsersBL.UpdateUser(id,user)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
router.route("/:id").delete(async(req,res) => {
    try {
        const id = req.params.id
        const result = await UsersBL.DeleteUser(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
module.exports = router