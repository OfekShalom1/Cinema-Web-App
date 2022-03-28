const express= require("express")
const PermissionsBL = require("./PermissonsBL")

const router = express.Router();

router.route("/").get(async(req,res) => {
    try {
        const permissions = await PermissionsBL.GetAllPermissions()
        return res.json(permissions)
    } catch (error) {
        return res.json(error)
    }
})
//Get perms by id
router.route("/:id").get(async(req,res) => {
    try {
       const id = req.params.id
       const result = await PermissionsBL.getPermissionId(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Post Permissions and user
router.route("/").post(async(req,res) => {
    try {
        const newPerms = req.body
        const result = await PermissionsBL.AddUserAndPermissons(newPerms)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
//Put - update permissions 
// get arr of permissions

router.route("/:id").put(async(req,res) => {
    try {
        const id = req.params.id
        const arrPerm = req.body
        const result = await PermissionsBL.UpdatePermissions(id,arrPerm)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})

//delete 
router.route("/:_id").delete(async(req,res) => {
    try {
        const id = req.params._id
        const result = await PermissionsBL.DeleteUserAndPerms(id)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
module.exports= router