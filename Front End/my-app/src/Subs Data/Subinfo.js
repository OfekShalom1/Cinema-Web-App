import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import AddMovieSub from './AddMovieSub'

import { AppContext } from '../Main Website/MainPage'

export default function Subinfo({member,showmovies,cancel}) {
 const [perms,setPerms] = useState({permissions:[]})
 const [subsMovies,setSubsMovie] = useState({movies:[]})
 
 const[objUpdated,setObjUpdated] = useState({name:"" ,email:"" ,city:""})

 const [editButt,setEditButt] = useState(false)
 
 const[subToMovie,setSubToMovie] = useState(false)
 
 const [movies1 , setMovies1] = useState([])
 const MovieFromSub = useContext(AppContext)
 
 useEffect(async() => {
     const {data:permis} = await axios.get(`http://localhost:8000/permissions/${sessionStorage.getItem("username")}`)
        setPerms(permis)
    
        const {data:MoviesSub} = await axios.get(`http://localhost:8001/subs/${member._id}`)
        setSubsMovie(MoviesSub)

        const {data:allmovies} = await axios.get(`http://localhost:8001/movies`)
        setMovies1(allmovies)
    },[])
    
    const goToEditSub = () => {
        setEditButt(true)
    }
    const CancelEdit = () => {
        cancel()
        setEditButt(false)
    }
    const UpdateMembers = async() => {
        const obj = {
            name:objUpdated.name === ""? member.name : objUpdated.name ,
            email:objUpdated.email === ""? member.email : objUpdated.email,
            address:{city:objUpdated.city === "" ?member.address.city:objUpdated.city}
        }
       

        await axios.put(`http://localhost:8001/members/${member._id}`,obj)
    }
    const onChangeToState = (e) => {
        const{name,value} = e.target
        const newObj = {...objUpdated,[name]:value}
        setObjUpdated(newObj)
    }
    const DeleteMember = async() => {
        await axios.delete(`http://localhost:8001/members/${member._id}`)
        cancel()
    }
    const subscribeButt = () => {
        setSubToMovie(!subToMovie)
    }
     const onClickMovie = (movieName) => {
        
        MovieFromSub.setMovieName(movieName)
        showmovies()

     }
     const subsccribeForAddMovie = async() => {
        const {data:MoviesSub} = await axios.get(`http://localhost:8001/subs/${member._id}`)
        setSubsMovie(MoviesSub)
     }
    return (
<div className='UsersComp'>
      {!editButt &&<div>  
        
          <h3>{member.name}</h3>
       
       <span>Email :</span> {member.email} <br />
       <span>City:</span> {member.address.city}

        <br />
    { perms.permissions.includes("Update Subscription") &&  <button onClick={goToEditSub}>Edit</button>}
      
      
      {perms.permissions.includes("Delete Subscriptions") && <button onClick={DeleteMember}>Delete</button>} 
      
      <div className='MoviesSubComp'> 
         <h4>Movies Watched</h4> 
         <button onClick={subscribeButt}>Subscribe to new movie</button>
         {subToMovie && <AddMovieSub member={member} subscribeButton={subsccribeForAddMovie} moviesWathced={subsMovies}/>}

      </div>
      <ul>
      {subsMovies.movies.map((mov) => mov).filter((e) => movies1.map((w) =>  w.name).includes(e.movie)?e:"" ).map((s,index) => <li key={index}> <button onClick={() => onClickMovie(s.movie)} >{s.movie}</button>, {s.date}</li>) } 
      </ul>
      </div>
     //<li key={index}> <button onClick={() => onClickMovie(s.movie)} >{s.movie}</button>, {s.date}</li>
     }
    
    {editButt && <div> 
        <h3>Members</h3>
      <strong>Edit Member : {member.name} </strong>  
        <br /> <br />

        Name : <input type={"text"} name="name" defaultValue={member.name} onChange={onChangeToState}/> <br />
        Email : <input type={"text"} name="email" defaultValue={member.email} onChange={onChangeToState} /> <br />
        City : <input type={"text"} name="city" defaultValue={member.address.city}  onChange={onChangeToState}/> <br />
       <br />
       <button onClick={UpdateMembers}>Update</button>
       <button onClick={CancelEdit}>Cancel</button>
       
        </div>}
    
    
    </div>
  )
}
