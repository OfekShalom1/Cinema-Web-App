import React,{useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'



export default function LoginPage() {
  const navigate = useNavigate()
  const[Username,setUsername] = useState("")
  const[Password,setPassword] = useState("")
    const userName = (e) =>{
        setUsername(e.target.value)
  }
  
  const Password1 = (e) => {
      setPassword(e.target.value)
  }
  
  const LoginFunc = async() => {
    const {data} = await axios.get("http://localhost:8000/usersDB")
    data.map((user) => {
      let id = {_id:Username}
      if(user.username === Username && user.password === Password){
        sessionStorage.setItem("username",Username)
        navigate("/MainPage")


      }
    })
    if (!data.map((i) => i.username).includes(Username) ||!data.map((i) => i.password).includes(Password)){
      alert("Username or Password are wrong!")
    }
  }
  
  return <div>
    <h1>Login Page</h1>
      UserName: <input type={"text"} onChange={userName} /> <br />
      Password: <input type={"password"} onChange={Password1} /> <br />
      
      
      <button onClick={LoginFunc}>Login</button> <br /> 

      New User? : <Link to="CreateUser" >Create Account</Link>
  </div>;
}
