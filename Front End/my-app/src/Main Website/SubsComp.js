import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddMember from '../Subs Data/AddMember'
import Subinfo from '../Subs Data/Subinfo'

export const SubContext = React.createContext(null)

export default function SubsComp({showmovies}) {
  const [subs,setSubs] = useState([])
  const [members,setMembers] = useState([])
  
  const[allMembersButt,setAllMembersButt] = useState(true)
  const[addMemberButt,setAddMemberButt] = useState(false)
  
  useEffect(async() => {
    const {data:subs1} = await axios.get("http://localhost:8001/subs")
    setSubs(subs1)
    const {data:members1} = await axios.get("http://localhost:8001/members")
    setMembers(members1)
  },[])
  
  const onClickMembers = async() => {
    const {data:members1} = await axios.get("http://localhost:8001/members")
    setMembers(members1)
    const {data:subs1} = await axios.get("http://localhost:8001/subs")
    setSubs(subs1)
    
    setAddMemberButt(false)
    setAllMembersButt(true)

  }
  const onClickAddMember = () => {
    
    setAddMemberButt(true)
    setAllMembersButt(false)
  }
  return (
    <div className='UsersMangementDiv'>
      <h3>Subscriptions</h3>
      <button onClick={onClickMembers}>All Members</button>
      <button onClick={onClickAddMember}>Add Member</button>
      <SubContext.Provider value={{onClickMembers}}> 
      {allMembersButt && members.map((mem,index) => {
        return <Subinfo key={mem._id} member={mem} showmovies={showmovies} cancel={onClickMembers } />
      })}
      </SubContext.Provider>

      {addMemberButt && <AddMember cancel={onClickMembers }/>}
    </div>
  )
}
