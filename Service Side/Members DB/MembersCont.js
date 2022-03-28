const express = require("express");
const memberBL = require("./MembersBL");

const router = express.Router();

router.route("/").get(async(req,res) =>{
    try {
        const members = await memberBL.getAllMembers();
        return res.json(members)
    } catch (error) {
        return res.json(error)
    }
})
// Get by id
router.route("/:_id").get(async(req,res) => {
    try {
        const id = req.params._id
        const member = await memberBL.getMemberById(id)
        return res.json(member)
    } catch (error) {
        return res.json(error)
    }
})
// Post
router.route("/").post(async(req,res) => {
    try {
        const member = req.body
        const result = await memberBL.AddMember(member)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Put
router.route("/:_id").put(async(req,res) =>{
    try {
        const id = req.params._id
        const mem = req.body
        const result = await memberBL.UpdateMember(id,mem)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Delete
router.route("/:_id").delete(async(req,res) => {
try {
    const id = req.params._id
    const result = await memberBL.DeleteMember(id)
    return res.json(result)
} catch (error) {
    return res.json(error)
}
})


module.exports = router;