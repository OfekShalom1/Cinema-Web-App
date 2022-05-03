import axios from 'axios'
import React, { useState,useEffect,useContext } from 'react'
import MoviesComp from './MoviesComp'
import SubsComp from './SubsComp'
import UsersManagement from './UsersManagement'
import { useNavigate } from 'react-router-dom'

export const AppContext = React.createContext(null);

export default function Main({users}) {
  const [moviesButton,setMoviesButton] = useState(false)
  const [usersButton,setUsersButton] = useState(false)
  const [subsButton,setSubsButton] = useState(false)
  
  const [perms,setPerms] = useState({id:"",permissions:[]})
  
const [movieName,setMovieName] = useState("")

const navigate = useNavigate()
 
useEffect(async() => {
   const {data} = await axios.get(`http://localhost:8000/permissions/${sessionStorage.getItem("username")}`)
  setPerms(data)

  
},[])

  const ShowMoviesComp = () =>{
   
    
    setMoviesButton(true) 
    setUsersButton(false)
    setSubsButton(false)
  }
  const ShowSubsComp = () =>{
    setMovieName("")
    
    setMoviesButton(false) 
    setUsersButton(false)
    setSubsButton(true)
  }
  const ShowUsersComp = () =>{
    setMovieName("")
    
    setMoviesButton(false) 
    setUsersButton(true)
    setSubsButton(false)
  }
  const logOutFunc = () => {
    sessionStorage.removeItem("username")
    navigate("/")
  }
    return (
    <div className='MainStyle'>
      <h1>Movies - Subsscriptions Web Site</h1> 
      <h1>Ofek Shalom - Project</h1>
      <br />
      
     { perms.permissions.includes("View Movies") && <button onClick={ShowMoviesComp} className="btn btn-primary">Movies</button>}
     {' '}
      {perms.permissions.includes("View Subscriptions")  && <button onClick={ShowSubsComp} className="btn btn-danger">Subsscriptions</button>}
      {' '}
      {sessionStorage.getItem("username") === users.map((i) => i._id)[0]     &&  <button onClick={ShowUsersComp} className="btn btn-info">Users Management</button>}
      {' '}
      <button onClick={logOutFunc} className="btn btn-light">Logout</button>
      
      
      <AppContext.Provider value={{movieName,setMovieName,ShowSubsComp}}>
      {moviesButton && <MoviesComp />}
      {usersButton && <UsersManagement />}
      {subsButton && <SubsComp showmovies={ShowMoviesComp}/>}
      </AppContext.Provider>
    
    </div>

 
  )
}
