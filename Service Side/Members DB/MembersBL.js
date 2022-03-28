const Member = require("./MemberModel");

const axios = require("axios")
 
const SubsBL = require("../Subs DB/SubsBL")

const SetMembers = () => {
  return new Promise(async (resolve, reject) => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    if ((await Member.find()).length === 0) {
      data.map((mem) => {
         let newMem = new Member(mem);
         newMem.save((err) => {
           if (err) {
             reject(err);
           } else  {
             resolve("Added Members");
             
           }
         });
       })
    }
    
    ;
  });
};
SetMembers();
const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};
//Get By Id
const getMemberById = (id) => {
   return new Promise((resolve,reject) => {
      Member.findById(id,(err,mem) => {
         if(err){
            reject(err)
         }else{
            resolve(mem)
         }
      })
   })
}
//Post
const AddMember = (newM) => {
   return new Promise((resolve,reject) => {
      
      const newMember = new Member(newM);
      newMember.save(async(err) => {
         if(err){
            reject(err)
         }else{
            
            resolve("Added Member Successfully!")
            const newSub = {
               _id:newMember._id,
               movies:[]
            }
            SubsBL.AddSub(newSub)
         }
      })
   })
}
// Put
const UpdateMember = (id,MemberToUpdate) => {
   return new Promise((resolve,reject) => {
     
      Member.findByIdAndUpdate(id,MemberToUpdate,(err) => {
         if(err) {
            reject(err)
         }else{
            resolve("Updated Member Successfully!")
         }
      })
   })
}
//Delete
const DeleteMember = (id) => {
   return new Promise((resolve,reject) => {
      SubsBL.DeleteSub(id)
      Member.findByIdAndRemove(id,(err) => {
         if(err) {
            reject(err)
         }else{
            
            resolve("Delete Member Successfully!")
            
         }
      })
   })
}

module.exports = { SetMembers, getAllMembers,getMemberById,AddMember,UpdateMember,DeleteMember };
