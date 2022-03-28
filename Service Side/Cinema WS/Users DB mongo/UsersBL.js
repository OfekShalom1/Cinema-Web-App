const User = require("./UserModel")
const jsonfile = require("jsonfile")


const getAllUsers =() => {
    return new Promise((resolve,reject) => {
        User.find({},(err,users) =>{
            if(err){
                reject(err)
            }else{
                resolve(users)
            }
        })
    })
}
const GetUserById =(id) => {
    return new Promise((resolve,reject) => {
        User.findById(id,(err,user) => {
            if(err){
                reject(err)
            }else{
                resolve(user)
            }
        })
    })
}
const AddUser = (newU) => {
    return new Promise(async(resolve,reject) => {
      const perms =   await jsonfile.readFile("../Permissions JSON/Permissions.json")
      const users =   await jsonfile.readFile("../Users JSON/Users.json")
      const newUser = new User(newU);
       newUser.save((err) => {
          if(err){
             reject(err)
          }else{
             resolve("Added User Successfully!")
            
             const id = newUser._id
            const obj = {id:id}
            perms.push(obj)
             jsonfile.writeFile("../Permissions JSON/Permissions.json", perms)

             const date = new Date()
             const year =date.getFullYear();
             const month = date.getMonth() + 1;  //must add 1 to get the correct month (some bug maybe).
             const day = date.getDate()
             
             const createdate = `${day}/${month}/${year}`
            
             const obj2 ={id:id,createdDate:createdate}
             users.push(obj2)
             jsonfile.writeFile("../Users JSON/Users.json", users)
          }
       })
    })
 }
 const UpdateUser = (id,UserToUpdate) => {
    return new Promise((resolve,reject) => {
       User.findByIdAndUpdate(id,UserToUpdate,(err) => {
          if(err) {
             reject(err)
          }else{
             resolve("Updated User Successfully!")
          }
       })
    })
 }
 
 const DeleteUser = (id) => {
    return new Promise(async(resolve,reject) => {
      const perms =   await jsonfile.readFile("../Permissions JSON/Permissions.json")
      const users =   await jsonfile.readFile("../Users JSON/Users.json")
      User.findByIdAndRemove(id,(err) => {
          if(err) {
             reject(err)
          }else{
             resolve("Delete User Successfully!")
            
             const index =  perms.map((i)=> i.id).indexOf(id)
             perms.splice(index,1)
             jsonfile.writeFile("../Permissions JSON/Permissions.json",perms)

             const indexUsers = users.map((i) => i.id).indexOf(id)
             users.splice(indexUsers,1)
             jsonfile.writeFile("../Users JSON/Users.json",users)
          }
       })
    })
 }
 module.exports ={getAllUsers,GetUserById,AddUser,UpdateUser,DeleteUser}