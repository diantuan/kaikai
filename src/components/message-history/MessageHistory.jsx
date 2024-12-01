import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL, apiURL2 } from "../../constants/constants";
import io  from "socket.io-client";

const MessageHistory = ({selectedFriend, messageRefresh}) => {

  const [messages, setMessages] = useState(null)

  useEffect(()=>{

    const socket = io('https://kaikai-api-27e7ca2ff396.herokuapp.com')

    const token = JSON.parse(localStorage.getItem('token'))

    const retrieveMessages = async()=>{

      if(!selectedFriend){
        return
      }
      try{
        const response = await axios.get(`${apiURL2}/api/v1/messages/${selectedFriend}`, {headers: {"Authorization":`Bearer ${token}`}})
        setMessages(response.data)
        console.log(response.data)
      }
      catch(error){
        console.log(error)
      }

    }

    
    retrieveMessages();

    socket.on('refresh', ()=>{
      console.log('heard refresh')
      retrieveMessages()
    })

    return ()=>socket.close();
  }

  ,[selectedFriend, messageRefresh])



  return ( <div>
    Messages:
    {messages && messages.map(message=>(
      <div key={message._id}> 
        <span></span>
        <div>{message.body}</div>


      </div>  
    ))}
  </div> );
}
 
export default MessageHistory;