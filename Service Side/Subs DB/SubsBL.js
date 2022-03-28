const Sub = require("./subsModel");

const axios = require("axios");

const SetSubs = () => {
    return new Promise(async(resolve,reject) => {
        const {data} = await axios.get("http://localhost:8001/members")
        if((await Sub.find()).length === 0){
            data.map((subb) => {
                let newSubArr = new Sub(subb);
                newSubArr.save((err) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve("Added Subs")
                    }
                })
            })
        }
        
    })
}
SetSubs();
const getAllSubs = () => {
    return new Promise((resolve,reject) => {
        Sub.find({},(err,Subs) => {
            if(err){
                reject(err)
            }else{
                resolve(Subs)
            }
        })
    })
}
const getSubById = (id) => {
    return new Promise((resolve,reject) => {
       Sub.findById(id,(err,sub) => {
           if(err){
               reject(err)
           }else{
               resolve(sub)
           }
       }) 
    })
}
//Post
const AddSub = (newSub) => {
    return new Promise((resolve,reject) => {
        const newSub1 = new Sub(newSub)
        
        newSub1.save((err) => {
            if(err) {
                reject(err)
            }else{
                resolve("Added Sub Successfully!")
            }
        })
    })
}
//Put
const UpdateSub = (id,UpdatedSub) =>{ 
    return new Promise((resolve,reject) => {
        Sub.findByIdAndUpdate(id,UpdatedSub,(err) => {
            if(err){
                reject(err)
            }else{
                resolve("Update Sub!")
            }
        })
    })
}
//Delete
const DeleteSub =(id) => {
    return new Promise((resolve,reject) => {
        Sub.findByIdAndRemove(id,(err) => {
            if(err){
                reject(err)
            }else{
                resolve("Deleted Sub!")
            }
        })
    })
}

module.exports={getAllSubs,getSubById,AddSub,UpdateSub,DeleteSub}