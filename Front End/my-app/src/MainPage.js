
import React,{useEffect,useState} from 'react'
import { Routes, Route, Link } from "react-router-dom"
import LoginPage from './LoginCreatePage/LoginPage'
import CreateUser from './LoginCreatePage/CreateUser'
import Main from './Main Website/MainPage'
import axios from 'axios'
export default function MainPage() {
    const [usersDB,setUsersDB] = useState([])
  useEffect(async() => {
    const {data} = await axios.get("http://localhost:8000/usersDB")
    setUsersDB(data)
  },[])

    return (
    <div>
        <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route path='/CreateUser' element={<CreateUser />} />
            <Route path='/MainPage' element={<Main users={usersDB}/>} />
        </Routes>

    </div>
  )
}
