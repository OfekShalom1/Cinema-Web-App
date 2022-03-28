const express= require("express");
const SubsBL = require("./SubsBL");

const router = express.Router();

router.route("/").get(async(req,res) => {
    try {
        const subs = await SubsBL.getAllSubs();
        return res.json(subs)
    } catch (error) {
        return res.json(error)
    }
})

router.route("/:_id").get(async(req,res) => {
    try {
        const id = req.params._id
        const sub= await SubsBL.getSubById(id)
        return res.json(sub)
    } catch (error) {
        return res.json(error)
    }
})
//Post = Create
router.route("/").post(async(req,res) => {
    try {
        const newSub = req.body
        const result = await SubsBL.UpdateSub(newSub)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Put = Update
router.route("/:_id").put(async(req,res) => {
    try {
        const id = req.params._id
        const sub = req.body
        const result = await SubsBL.UpdateSub(id,sub)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//DELETE
router.route("/:_id").delete(async(req,res) => {
    try {
        const id = req.params._id
        const result = await SubsBL.DeleteSub(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
module.exports = router