import React, { useState ,useEffect} from "react";
import UsersDataComp from "./UsersMangeComps/UsersDataComp";
import axios from "axios";
import AddUser from "./UsersMangeComps/AddUser";


export default function UsersManagement() {
  const [allUsersBut, setAllUsersBut] = useState(true);
  const [addUserBut, setAddUserBut] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersDB, setUsersDB] = useState([]);
  const [permissions, setPermissions] = useState([]);
  
  useEffect(async() => {
    const {data:response1} = await axios.get("http://localhost:8000/users");
    const {data:response2} = await axios.get("http://localhost:8000/usersDB");
    const {data:response3} = await axios.get("http://localhost:8000/permissions");
    setUsersDB(response2);
    setPermissions(response3);
    setUsers(response1);
  },[])
  
  const clickAll = async () => {
    
    setAddUserBut(false);

    setAllUsersBut(true);
 };
  const clickAdd = () => {
    setAllUsersBut(false);
    setAddUserBut(true);
  };

  const setAgainForUpdated = async() => {
    const {data:response1} = await axios.get("http://localhost:8000/users");
    const {data:response2} = await axios.get("http://localhost:8000/usersDB");
    const {data:response3} = await axios.get("http://localhost:8000/permissions");
    setUsersDB(response2);
    setPermissions(response3);
    setUsers(response1);
    setAddUserBut(false);

    setAllUsersBut(true);
  }

  return (
    <div className="UsersMangementDiv">
      <h2>Users</h2>
      <button onClick={clickAll} className="btn btn-info">All Users</button>
      {' '}
      <button onClick={clickAdd} className="btn btn-info">Add User</button>
      
      {allUsersBut &&
        users.map((i, index) => {
         
          return (
            <UsersDataComp
              key={i.id}
              cancel={setAgainForUpdated}
              data1={i}
              data2={usersDB[index]}
              data3={permissions[index]}
            />
          );
        })}
        {addUserBut && <AddUser cancel={setAgainForUpdated} />}
    </div>
  );
}
