import React,{useState} from 'react'
import axios from 'axios'

export default function AddMovie({cancel}) {
 const [obj,setObj] = useState({name:"",genres:"",image:{medium:""},premiered:""})


 const onChangeObj = (e) => {
    const {name,value} = e.target
    const newObj = {...obj,[name]:value}
    setObj(newObj)
 }
 const AddMovie = async() => {
     const genres = obj.genres.split(",")

     const newMovie = {...obj}
     newMovie.genres = genres

    await axios.post("http://localhost:8001/movies",newMovie)
 }
 
    return (
    <div >
        <br />
       
        Name: <input type={"text"} name="name" onChange={onChangeObj} /> <br />
        Genres: <input type={"text"} name="genres" onChange={onChangeObj} /> <br />
        Image Url: <input type={"text"} name="medium" onChange={onChangeObj}/> <br />
        Premiered (For example:2013-06-24): <input type={"text"} name="premiered" onChange={onChangeObj}/> <br />
        <button onClick={AddMovie}>Save</button>
        <button onClick={cancel}>Cancel</button>

    </div>
  )
}
