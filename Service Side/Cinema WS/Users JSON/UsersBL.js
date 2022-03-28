
const jsonfile = require("jsonfile")




const GetAllUsers = async() => {
     
     try {
        const data = await jsonfile.readFile("./Users.json")
         return data
     } catch (error) {
         return error
     }
}
const GetUserById = async(id1) => {
try {
    const data = await jsonfile.readFile("./Users.json")
    const index = data.map(i => i.id).indexOf(id1)
    return data[index]
} catch (error) {
    return error
}
}



const AddUser = async(obj) => {
    
    try {
        const users= await jsonfile.readFile("./Users.json" )
        users.push(obj)
       await jsonfile.writeFile("./Users.json",users)
        return "Added User"
    } catch (error) {
        return error
    }
    
}

const UpdateUser = async(id,obj) => {
    
    try {
        const users = await jsonfile.readFile("./Users.json")
        const index =  users.map(i => i.id).indexOf(id)
        
        const Fname = obj.Fname
        const Lname = obj.Lname
        users[index] = {...users[index] ,Fname:Fname,Lname: Lname}
        
        await jsonfile.writeFile("./Users.json",users)
        return "Updated user"
    
    } catch (error) {
      return error  
    }
}
const DeleteUser = async(id) => {
    try {
        const users = await jsonfile.readFile("./Users.json")
        const index = users.map(i => i.id).indexOf(id)
        users.splice(index,1)
        await jsonfile.writeFile("./Users.json",users)
        return "Deleted User"
    } catch (error) {
        
    }
}
module.exports={GetAllUsers,GetUserById,AddUser,UpdateUser,DeleteUser}