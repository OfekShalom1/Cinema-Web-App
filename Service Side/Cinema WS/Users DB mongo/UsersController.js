const express = require("express");

const UserBL= require("./UsersBL")

const router = express.Router();

router.route("/").get(async(req,res) => {
    try {
        const users = await UserBL.getAllUsers()
        return res.json(users)
    } catch (error) {
        return res.json(error)
    }
})
//Get by id
router.route("/:_id").get(async(req,res) => {
    try {
        const id = req.params._id
        const result = await UserBL.GetUserById(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Post
router.route("/").post(async(req,res) => {
    try {
        const user = req.body
        const result = await UserBL.AddUser(user)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//PUT
router.route("/:_id").put(async(req,res) => {
    try {
        const user = req.body
        const id = req.params._id
        const result = await UserBL.UpdateUser(id,user)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//delete
router.route("/:_id").delete(async(req,res) => {
    try {
        const id = req.params._id
        const result = await UserBL.DeleteUser(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})

module.exports= router