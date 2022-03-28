
const jsonfile = require ("jsonfile")

const GetAllPermissions = async() => {
    try {
        const data = await jsonfile.readFile("../Permissions JSON/Permissions.json")
        return data
    } catch (error) {
        return error
    }
}
const getPermissionId = async(id) => {
    try {
        const data =await jsonfile.readFile("../Permissions JSON/Permissions.json")
        const userPerm = data.map(i=> i.id).indexOf(id)
        return data[userPerm]
    } catch (error) {
        return error
    }
}
const AddUserAndPermissons = async(obj) =>{
    try {
        const data = await jsonfile.readFile("../Permissions JSON/Permissions.json")
        data.push(obj)
        await jsonfile.writeFile("../Permissions JSON/Permissions.json",data)
        return "Added User To Permissions Json"
    } catch (error) {
        return error
    }
}

const UpdatePermissions = async(id,arrPerm) => {
try {
    const data = await jsonfile.readFile("../Permissions JSON/Permissions.json")
    const index = data.map(i=>i.id).indexOf(id)
    data[index].permissions = arrPerm
    await jsonfile.writeFile("../Permissions JSON/Permissions.json",data)
    return "Updated Permissions"
} catch (error) {
    return error
}
}

const DeleteUserAndPerms = async(id)=> {
try {
    const data = await jsonfile.readFile("../Permissions JSON/Permissions.json")
    const index = data.map(i=>i._id).indexOf(id)
    data.splice(index,1)
    await jsonfile.writeFile("../Permissions JSON/Permissions.json",data)
    return "Deleted User's All Permissions"
} catch (error) {
    return error
}
}

module.exports={GetAllPermissions, getPermissionId,AddUserAndPermissons,UpdatePermissions,DeleteUserAndPerms}