import axios from "axios"

const getall = (url) => axios.get(url)
const getById = (url) => axios.get(url)
const addUser = (url,obj) => axios.post(url,obj)
const updateUser = (url,id,obj) => axios.put(`${url}/${id}`,obj)
const deleteUser = (url,id) => axios.delete(`${url}/${id}`)
 
export {getall,getById,addUser,updateUser,deleteUser}