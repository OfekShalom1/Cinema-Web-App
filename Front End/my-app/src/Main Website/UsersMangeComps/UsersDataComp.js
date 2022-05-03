import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersDataComp({
  data1: { Fname, Lname, createdDate },
  data2,
  data3,
  cancel
}) {
  const [editUser, setEditUser] = useState(false);
  const [obj,setObj] = useState({Fname:"",Lname:"",username:""})
  const [perms,setPerms] = useState({
    ViewSubs:false,
    CreateSubs:false,
    DeleteSubs:false,
    UpdateSubs:false,
    ViewMovies:false,
    CreateMovies:false,
    DeleteMovies:false,
    UpdateMovie:false
  })
  const [dataA,setDataA] = useState({})
  const [dataB,setDataB] = useState({})
  const [dataC,setDataC] = useState({permissions:[]})
  
  useEffect(async() => {
    const {data:DataA} = await axios.get(`http://localhost:8000/users/${data2._id}`)
    const {data:DataB} = await axios.get(`http://localhost:8000/usersDB/${data2._id}`)
    const {data:DataC} = await axios.get(`http://localhost:8000/permissions/${data2._id}`)
    setDataA(DataA)
    setDataB(DataB)
    setDataC(DataC)
  },[])
  
  const clickEdit = () => {
    setEditUser(true);
  };
  const clickCancel = async() => {
    const {data:DataA} = await axios.get(`http://localhost:8000/users/${data2._id}`)
    const {data:DataB} = await axios.get(`http://localhost:8000/usersDB/${data2._id}`)
    const {data:DataC} = await axios.get(`http://localhost:8000/permissions/${data2._id}`)
    setDataA(DataA)
    setDataB(DataB)
    setDataC(DataC)
    setEditUser(false);
  };
  const onChangeInput = (e) => {
    const {name,value}= e.target
    const newObj = {...obj,[name]:value}
    setObj(newObj)
  }
  const onChangePerms = (e) => {
    const{name,checked} = e.target
    const newObj = {...perms,[name] : checked}
    setPerms(newObj)
  }
  const UpdateData = async(e) => {
    e.preventDefault();
    const objNames = {
      Fname:obj.Fname === ""?Fname:obj.Fname,
      Lname:obj.Lname === ""?Lname:obj.Lname,
      createdDate:createdDate,id:data2._id}
   await axios.put(`http://localhost:8000/users/${data2._id}`,objNames)
   
   const objUsername = {
     username:obj.username === ""? data2.username:obj.username,
     _id:data2._id,
     password:data2.password
   }
   await axios.put(`http://localhost:8000/usersDB/${data2._id}`,objUsername)

   const Permissions = [
     perms.ViewSubs?"View Subscriptions": perms.CreateSubs ||perms.DeleteSubs||perms.UpdateSubs ?"View Subscriptions":!perms.ViewSubs? "":data3.permissions.includes("View Subscriptions")?"View Subscriptions":"",
     perms.CreateSubs?"Create Subscriptions":!perms.CreateSubs?"":data3.permissions.includes("Create Subscriptions")?"Create Subscriptions":"",
     perms.DeleteSubs?"Delete Subscriptions":!perms.DeleteSubs?"":data3.permissions.includes("Delete Subscriptions")?"Delete Subscriptions":"",
     perms.UpdateSubs?"Update Subscription":!perms.UpdateSubs?"":data3.permissions.includes("Update Subscription")?"Update Subscription":"",
     
     perms.ViewMovies?"View Movies":perms.CreateMovies||perms.DeleteMovies|| perms.UpdateMovie?"View Movies":!perms.ViewMovies?"":data3.permissions.includes("View Movies")?"View Movies":"",
     perms.CreateMovies?"Create Movies": !perms.CreateMovies?"":data3.permissions.includes("Create Movies")?"Create Movies":"",
     perms.DeleteMovies?"Delete Movies":!perms.DeleteMovies?"":data3.permissions.includes("Delete Movies")?"Delete Movies":"",
     perms.UpdateMovie?"Update Movie":!perms.UpdateMovie?"":data3.permissions.includes("Update Movie")?"Update Movie":"",
   ]
   await axios.put(`http://localhost:8000/permissions/${data2._id}`,Permissions)
  }
  const deleteUser = async() => {
   
   
    const {data:DataA} = await axios.get(`http://localhost:8000/users/${data2._id}`)
    const {data:DataB} = await axios.get(`http://localhost:8000/usersDB/${data2._id}`)
    const {data:DataC} = await axios.get(`http://localhost:8000/permissions/${data2._id}`)
    
    await axios.delete(`http://localhost:8000/usersDB/${data2._id}`)
    setDataA(DataA)
    setDataB(DataB)
    setDataC(DataC)
    
    cancel()
  }

  return (
    <div className="UsersComp">
      {!editUser && (
        <div>
          <strong> Name : {`${dataA.Fname} ${dataA.Lname}`} </strong>
          <br />
          <strong> Username : {`${dataB.username}`} </strong>
          <br />
          <strong> Create Date : {`${dataA.createdDate}`} </strong>
          <br />
          <strong> Permissions :{`${dataC.permissions.filter((s)=> s!=="").join(",")}`} </strong>
          <br />
          <br />
          <br />
          <button onClick={clickEdit} className="btn btn-warning">Edit</button>
          {' '}
          <button onClick={deleteUser} className="btn btn-danger">Delete</button>
        </div>
      )}

      {editUser && <div>
          <h1>Edit User : {`${dataA.Fname} ${dataA.Lname}`}</h1>
          <form onSubmit={UpdateData}>
          First Name: <input defaultValue={dataA.Fname} name="Fname" onChange={onChangeInput}/> <br />
          Last Name: <input defaultValue={dataA.Lname} name="Lname"onChange={onChangeInput}/> <br />
          Username:(id) <input defaultValue={dataB.username} name="username" onChange={onChangeInput}/> <br />
          Created data : {dataA.createdDate} <br/>
          Permissions: <br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("View Subscriptions")?true:false} name="ViewSubs" onChange={onChangePerms}/>  View Subscriptions<br /> 
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Create Subscriptions")?true:false} name="CreateSubs" onChange={onChangePerms}/>  Create Subscriptions<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Delete Subscriptions")?true:false} name="DeleteSubs" onChange={onChangePerms}/>  Delete Subscriptions<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Update Subscription")?true:false} name="UpdateSubs" onChange={onChangePerms}/>  Update Subscription<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("View Movies")?true:false} name="ViewMovies" onChange={onChangePerms}/>  View Movies<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Create Movies")?true:false} name="CreateMovies" onChange={onChangePerms}/>  Create Movies<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Delete Movies")?true:false} name="DeleteMovies" onChange={onChangePerms}/> Delete Movies<br />
          <input type={"checkbox"} defaultChecked={dataC.permissions.includes("Update Movie")?true:false} name="UpdateMovie" onChange={onChangePerms} />  Update Movie<br />
          <button type="submit">Update</button>
          <button onClick={clickCancel} >Cancel</button>
          </form>
          
          </div>}
    </div>
  );
}
