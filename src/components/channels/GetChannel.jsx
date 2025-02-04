import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL2 } from "../../constants/constants";
import io from 'socket.io-client'
import './channel.css'

const GetChannel = ({selectChannel, selectedChannel, kaikaiList}) => {

  const [channels, setChannels] = useState([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null) 
  const [remainingMembers, setRemainingMembers]= useState(null)
  const [friendToAdd, setFriendToAdd] = useState(null)

  useEffect(()=>{

    setRemainingMembers(kaikaiList)

    const token = JSON.parse(localStorage.getItem('token'))
    
    const socks = io(`${apiURL2}`)

    const retrieveChannels = async()=>{
      setPending(true)

      try{
        
        const response = await axios.get(`${apiURL2}/api/v1/get-channel/`, {headers:{"Authorization": `Bearer ${token}`}})

        
        setChannels(response.data)
        setPending(false)
        setError(null)
        

      }
      catch(error){
        setPending(false)
        if(!error.response.data){
          return setError("an unexpected error occur")
        }
        setError(error.response.data.error)
        console.log(error)

      }
    }

    retrieveChannels();

    socks.on('refreshChannel', ()=>{
      retrieveChannels()
    })

      
    return ()=>socks.close()
  }
  ,[kaikaiList])

  const addFriendToChannel = async()=>{

    

    if(!selectChannel){
      return setError("select a channel")
    }

    if(friendToAdd == null){
      return setError("select a friend to add")
    }


    const token = JSON.parse(localStorage.getItem('token'))

    const body = {
      channelid: selectedChannel,
      memberId: friendToAdd
    }
    try{
      console.log(body)

      const response = await axios.post(`${apiURL2}/api/v1/add-channel`, body, {headers:{"Authorization": `Bearer ${token}`}})

      if(response.data.error){
        return setError(response.data.error)
      }

      setRemainingMembers(remainingMembers.filter(member=>member.friendId._id !== friendToAdd))

      console.log(response.data)

    }
    catch(error){
      if(!error.response.date){
        return setError("an unexpected error occurred")
      }
      setError(error.response.data.error)
      console.log(error)
    }
  }


  return ( <div>
    {pending && <div>Getting channels...</div>}
    {error && <div>{error}</div>}
    {channels && channels.map(channel=>(
      <div key = {channel._id} className={channel._id === selectedChannel ? "channelContainer active": "channelContainer"}>
        <div
        onClick = {()=>selectChannel(channel._id)}>{channel.channelName}</div>
        <div>{channel.members.map((member,ik)=>(
          <span key={ik + "b"} style={{fontSize:".7em", color:"var(--blued)", marginInline:"2px"}}>{member.memberId.email}</span>
        ))}</div>
        
          <select onChange={e=>setFriendToAdd(e.target.value)}>
            <option value ="null">select friend</option>
            {remainingMembers && remainingMembers.map((friend, i)=>(
              <option key={i}
              value={friend.friendId._id}>
                {friend.friendId.email}
              </option>
            ))}

          </select>
          <button type="button" onClick={addFriendToChannel}>add</button>
        
          
      </div>
    ))}
  </div> );
}
 
export default GetChannel;