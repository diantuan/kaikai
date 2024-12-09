import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL, apiURL2 } from "../../constants/constants";
import io  from "socket.io-client";
import './messagehistory.css'
import { useAuth } from "../auth/Auth";
import Logo from "../logo/logo";
import logo from '../../assets/pppixelate.png'

const MessageHistory = ({selectedFriend, selectedChannel, kaikaiList}) => {

  const [messages, setMessages] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const {uid} = useAuth()
  const [friendPic, setFriendPic] = useState(null)
  const [name, setName] = useState(null)

  useEffect(()=>{

    const socket = io('https://kaikai-api-27e7ca2ff396.herokuapp.com')

    const token = JSON.parse(localStorage.getItem('token'))

    const retrieveMessages = async()=>{

      setPending(true)
      
      if(selectedFriend){
        const found = kaikaiList.find(friend=>friend.friendId._id === selectedFriend)
        setFriendPic(found.friendId.picture)
        setName(found.friendId.nickname || found.friendId.email)
        
      }
      else{

        setFriendPic(null)
        setName("channel")
      }
      

      if(!selectedFriend && !selectedChannel){
        setPending(false)
        return setError("select a friend or channel to show kaikai history")
      }
      try{
        const response = await axios.get(`${apiURL2}/api/v1/messages/${selectedFriend ? "user" : "channel"}/${selectedFriend ? selectedFriend : selectedChannel}`, {headers: {"Authorization":`Bearer ${token}`}})
        setMessages(response.data)
        setPending(false)
        setError(null)
        console.log(response.data)
      }
      catch(error){
        setPending(false)
        if(!error.response.data){
          return setError("an unexpected error occurred")
        }
        setError(error.response.data.error)
        console.log(error)
      }

    }

    
    retrieveMessages();

    socket.on('refresh', (message)=>{
      console.log(message)
      console.log(uid)
      setMessages(prev=>[...prev, message])
    })

    return ()=>socket.close();
  }

  ,[selectedFriend, selectedChannel])



  return ( <div className="messages">
    <div className="kaikais-header">
      <div>
        {friendPic && <img src={friendPic}></img>}
        {!friendPic && <img src={logo}></img>}
        {name && <span style={{fontSize:'.7em', color: "var(--blued)"}}>{name}</span>}
      </div>
      
      <h2 className="kaikais-title">kaikais</h2>
      <Logo/>
    </div>
    <div className="kaikais-body">
      {pending && <div>getting kaikais...</div>}
      {error && <div>{error}</div>}
      {messages && messages.map(message=>(
        <div key={message._id}  className={message.sender._id === uid ? "right-align" : "left-align"}> 
          {selectedChannel && <div style={{fontSize: ".7em", color:"var(--blued)"}}>{message.sender.nickname || message.sender.email}</div>}
          <span className="message-body">{message.body}</span>
    
        </div>
    ))}
    </div>
  </div> );
}
 
export default MessageHistory;