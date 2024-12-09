import axios from "axios";
import { useState } from "react";
import {apiURL2} from '../../constants/constants'
import './channel.css'


const AddChannel = ({kaikaiList}) => {

  const [channelName, setChannelName] = useState(null);
  const [members, setMembers] = useState([])
  const [memberId, setMemberAdding] = useState(null)
  const [memberToAdd, setMemberToAdd] = useState([])
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  
  

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setPending(true)
    
    if(!members || !channelName){
      return setError('member or channel name is needed')
    }

    const token = JSON.parse(localStorage.getItem('token'))

    const obj = {
      channelName, members
    }
    try{
      const response = await axios.post(`${apiURL2}/api/v1/create-channel`, obj, {headers: {"Authorization": `Bearer ${token}`}})
      setPending(false)
      setError(null)
      setMemberToAdd([])
      console.log(response.data)
      
    
    }
    catch(error){
      setPending(false)
      setMemberToAdd([])
      setError(error.response.data.error)
      console.log(error)
    }
  }

  const handleMemberArray = e =>{
    e.preventDefault()
    if(memberId === "null"){
      return setError("need to select from current friends")
    }
    
    const foundMember = kaikaiList.find(friend=>friend.friendId._id === memberId)

    if(memberToAdd.includes(foundMember.friendId.email)){
      return setError("cannot select duplicate")
    }

    setMemberToAdd(prev=>[...prev, foundMember.friendId.email])
    
    const newObj = {
      memberId
    }
    setMembers(prev=>[...prev, newObj])
    setError(null)
  }

  return ( <div className="add-channel-form">
    <form onSubmit = {handleSubmit}>
      <input
      onChange = {e=>setChannelName(e.target.value)}
      type = "text"
      required></input>
      <button
      type="submit">
        Add Channel
      </button>
    </form>
    <form onSubmit = {handleMemberArray}>
      <select onChange={e=>setMemberAdding(e.target.value)}>
        <option default value="null">Select from friends</option>
        {kaikaiList && kaikaiList.map(friend=>(
          <option key={friend.friendId._id} value={friend.friendId._id}>{friend.friendId.email}</option>
        ))}
      </select>
      <button 
      type="submit">
        Add Member
      </button>
    </form>
    {memberToAdd && memberToAdd.map(mem=>(<span key={mem}>{mem} - </span>))}
    {pending && <div>creating channel...</div>}
    {error && <div>{error}</div>}
    
  </div> );
}
 
export default AddChannel;