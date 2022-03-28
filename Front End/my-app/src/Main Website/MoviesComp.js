import React,{useState,useEffect ,useContext} from 'react'

import axios from 'axios'
import Movies from "./Movies Comps/Movies"
import AddMovie from './Movies Comps/AddMovie'

import { AppContext } from './MainPage'





export default function MoviesComp() {
  const [movies,setMovies] = useState([])
  
  const [showMovies,setShowMovies] = useState(true)
  const [showAddMovie,setAddMovie] = useState(false)
  const [permis,setPermis] = useState({id:"",permissions:[]})
  const [query,setQuery] = useState('')
  const [Find,setFind] = useState('')
  
  const movieContext = useContext(AppContext)
    
 
  useEffect(async() => {
    const {data} = await axios.get("http://localhost:8001/movies")
    setMovies(data)
    const {data:data1} = await axios.get(`http://localhost:8000/permissions/${sessionStorage.getItem("username")}`)
    setPermis(data1)
  },[]) 

  const FindButt = () => {
    movieContext.setMovieName("")
    setFind(query)
    
  }

  const getFiltered = (query,movies) => {
    if(movieContext.movieName!== "") {
      return movies.filter(movie => movie.name.toLowerCase() === (movieContext.movieName.toLowerCase()))
    }
    
   if (!query) {
      return movies
    }
    return movies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()))
  }

  const FilteredItems =  getFiltered(Find,movies)

  const showAllMovies = async() => {
    const {data} = await axios.get("http://localhost:8001/movies")
    setMovies(data)
    movieContext.setMovieName("")
    
    
    setAddMovie(false)
    setShowMovies(true)
  
  }
  const showAddMoviebutt = () => {
    movieContext.setMovieName("")
    setAddMovie(true)
    setShowMovies(false)
  }
  return (
    <div className='UsersMangementDiv'>
     {permis.permissions.includes("View Movies") &&<div> <button onClick={showAllMovies}>All Movies</button>
     {permis.permissions.includes("Create Movies") &&
        <button onClick={showAddMoviebutt} >Add Movie</button>}
     
     <span>Find Movie:</span> <input type={"text"} onChange={e=> setQuery(e.target.value)} />
     <button onClick={FindButt}>Find</button>
     
     </div>
     
     }
      
    {showAddMovie && <AddMovie cancel={showAllMovies}/>}
    
    {showMovies &&  permis.permissions.includes("View Movies") && FilteredItems.map((movie,index) => {
      return <Movies key={movie._id} data={movie} cancel={showAllMovies}/>
    })}
    

    
    
    </div>
    
  )
}

