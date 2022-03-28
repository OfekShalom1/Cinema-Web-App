import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'

import { SubContext } from '../Main Website/SubsComp'

export default function AddMovieSub({member,moviesWathced,subscribeButton}) {
 const [movies,setMovies] = useState([])
 
 const [movie,setMovie] = useState("")
 const [time,setTime] = useState("")
 
 const subContextNewMovie = useContext(SubContext)

 useEffect(async() => {
    const {data} = await axios.get("http://localhost:8001/movies")
    setMovies(data)
 },[])
 
 const dataOfSub = (e) => {
     setTime(e.target.value)
 }
 const selectMovie =(e) => {
     setMovie(e.target.value)
 }
 const Subscribe = async() => {
    const {data:SubMovies} = await axios.get(`http://localhost:8001/subs/${member._id}`)
    
    
    const obj ={...SubMovies}
    obj.movies.push({movie:movie,date:time})
    
    await axios.put(`http://localhost:8001/subs/${member._id}`,obj)

    subscribeButton()
 }
    return (
    <div className='AddSubComp'>
        <strong>Add a new movie </strong>
        <br />
        <select onChange={selectMovie}>
        {movies.filter((mov) => !moviesWathced.movies.map((m) => m.movie).includes(mov.name)).map((movies,index) => <option key={index} value={movies._id}>{movies.name}</option>)}
        </select>
        <input type={"date"} onChange={dataOfSub}/>
        <br />
        <button onClick={Subscribe}>Subscribe</button>

    </div>
  )
}
 
