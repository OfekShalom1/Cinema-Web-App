import React,{useState} from 'react'
import axios from 'axios'
import {getall,getById,addUser,updateUser,deleteUser} from "../Utils/utils"
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
  const [newUser,setUsername] = useState()
  const [newPass,setPassword] = useState()

  const navigate = useNavigate();
    
    const CreateFunc = async(e) => {
        e.preventDefault();
        const {data} = await axios.get(`http://localhost:8000/usersDB/${newUser}`)
        
        if(data._id){
            const newObj = {username:newUser,password:newPass}
            await axios.put(`http://localhost:8000/usersDB/${newUser}`,newObj)
            navigate("/")
           
        }else{
            alert("Wrong Username Check Again")
        }
        
        
        
    }
  
  
    return (
    <div>
    <form onSubmit={CreateFunc} >
        <h2>Create an Account</h2>
        Username: <input type={"text"}  onChange={(e) => setUsername(e.target.value)}/> <br />
        Password: <input type={"password"} onChange={(e) => setPassword(e.target.value)} /> <br />
        <button type='submit'>Create</button>
    </form>
    </div>
  )
}
