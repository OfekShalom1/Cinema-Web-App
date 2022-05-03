import axios from 'axios'
import React,{useState} from 'react'

export default function AddMember({cancel}) {
  const [objToAdd,setObjToAdd] = useState({name:"",email:"" , city : ""})
    
  const onChangeObj = (e) => {
    const {name,value} = e.target
    const newObj = {...objToAdd,[name] : value}
    setObjToAdd(newObj)
  }
  const AddMemberToAPI = async() => {
      const newObj = {
          name:objToAdd.name?objToAdd.name:"",
          email:objToAdd.email?objToAdd.email:"",
          address:{city:objToAdd.city?objToAdd.city:""}
      }
      await axios.post("http://localhost:8001/members",newObj)
  }
  return (
    <div className='UsersComp'>
        Name : <input type={"text"} name="name" onChange={onChangeObj} /> <br />
        Email : <input type={"text"} name="email" onChange={onChangeObj} /> <br />
        City : <input type={"text"} name="city"  onChange={onChangeObj}/> <br />
        <button onClick={AddMemberToAPI}className="btn btn-warning">Save</button>
        {' '}
        <button onClick={cancel} className="btn btn-danger">Cancel</button>
    </div>
  )
}
