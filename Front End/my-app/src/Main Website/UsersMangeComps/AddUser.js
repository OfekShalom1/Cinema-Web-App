
import axios from 'axios'
import React,{useState} from 'react'

export default function AddUser({cancel}) {
  const [obj,setObj] = useState({Fname:"",Lname:"",username:""})
  const [perms,setPerms] = useState({
      ViewSubs:false,
      CreateSubs:false,
      DeleteSubs:false,
      UpdateSubs:false,
      ViewMovies:false,
      CreateMovies:false,
      DeleteMovies:false,
      UpdateMovies:false
  })

  const onChangeNames =(e) => {
      const {name,value} = e.target
    const newobj = {...obj,[name]:value}
    setObj(newobj)
  }
  const onChangePerms = (e) => {
    const {name,checked} = e.target
    const newObj = {...perms,[name]:checked}
    setPerms(newObj)
  }
  const SaveData = async(e) => {
    e.preventDefault();
    const objUsername = {
        username:obj.username
    }
    await axios.post(`http://localhost:8000/usersDB/`,objUsername)

    const objNames = {
        Fname:obj.Fname,
        Lname:obj.Lname,
    }
    const {data} = await axios.get(`http://localhost:8000/usersDB/`)
    
    
    await axios.put(`http://localhost:8000/users/${data[data.length-1]._id}`,objNames)

    const Permissions = [
        perms.ViewSubs?"View Subscriptions":"",
        perms.CreateSubs?"Create Subscriptions":"",
        perms.DeleteSubs?"Delete Subscriptions":"",
        perms.UpdateSubs?"Update Subscriptions":"",
        
        perms.ViewMovies?"View Movies":"",
        perms.CreateMovies?"Create Movies":"",
        perms.DeleteMovies?"Delete Movies":"",
        perms.UpdateMovies?"Update Movies":""
    ]
    await axios.put(`http://localhost:8000/permissions/${data[data.length-1]._id}`,Permissions)
  }
    return (
    <div>
        <form onSubmit={SaveData}>

        
        First Name : <input type={"text"} name="Fname" onChange={onChangeNames}/> <br />
        Last Name : <input type={"text"} name="Lname" onChange={onChangeNames} /> <br />
        Username : <input type={"text"} name="username" onChange={onChangeNames}/> <br />
        Permissions: <br />
        <input type={"checkbox"} name="ViewSubs" onChange={onChangePerms} /> View Subscriptions <br />
        <input type={"checkbox"} name="CreateSubs" onChange={onChangePerms}/> Create Subscriptions <br />
        <input type={"checkbox"} name="DeleteSubs" onChange={onChangePerms}/> Delete Subscriptions <br />
        <input type={"checkbox"} name="UpdateSubs" onChange={onChangePerms}/> Update Subscriptions <br />
        <input type={"checkbox"} name="ViewMovies" onChange={onChangePerms}/> View Movies <br />
        <input type={"checkbox"} name="CreateMovies" onChange={onChangePerms}/> Create Movies <br />
        <input type={"checkbox"} name="DeleteMovies" onChange={onChangePerms}/> Delete Movies <br />
        <input type={"checkbox"} name="UpdateMovies" onChange={onChangePerms}/> Update Movies <br />
        <button type='submit'>Save</button>
        
        </form>
        <button onClick={cancel}>Cancel</button>
    </div>
  )
}
