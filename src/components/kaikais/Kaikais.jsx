import { useEffect, useRef, useState } from "react";
import { apiURL, apiURL2 } from "../../constants/constants";
import axios from "axios";
import './kaikais.css'

const Kaikais = ({selectedFriend,selectedChannel}) => {
  const [message, setMessage] = useState('');
  const [emojis, setEmojis] = useState(null)
  const inputRef = useRef(null)
  const emojiRef = useRef(null)

  useEffect(()=>{
    const getEmojis = async()=>{
      try{
        const response = await axios.get("https://emoji-api.com/emojis?access_key=632caa4a682669cefa41d0f7a66ca1ee4a0747b4")
        setEmojis(response.data)
        console.log(response)

      }
      catch(error){
        console.log(error)
      }
    }
    getEmojis();
  },[])
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!selectedFriend && !selectedChannel){
      return console.log('no one is selected')
    }
    
    
    const token = JSON.parse(localStorage.getItem('token'))
    const messagebody = {
      receiver: selectedFriend ? selectedFriend : selectedChannel,
      receiver_class: selectedFriend? null : "channel",
      body:message
    }
    try{
      const response = await axios.post(`${apiURL2}/api/v1/messages`, messagebody, {headers: {"Authorization": `Bearer ${token}`}})
      
      
    }
    catch(error){
      console.log(error)
    }
    
    inputRef.current.value="";
    setMessage('')
  }

  const handleEmoji = (char)=>{
    const mess = message + char
    setMessage(mess)
    emojiRef.current.classList.add('hidden')
    console.log(message)
  }

  const handleOpenEmoji = ()=>{
    emojiRef.current.classList.toggle('hidden')
  }

  return (
     <form onSubmit={handleSubmit} className="kaikai-form">

      <textarea 
        onChange ={ e => setMessage(e.target.value)}
        placeholder="kaikai"
        type="text"
        required
        ref={inputRef}
        value={message}></textarea>

      

      <div className="emojis hidden" ref={emojiRef}>
        {emojis && emojis.map(emo=>(
          <span key={emo.character}
          onClick={()=>handleEmoji(emo.character)}>{emo.character}</span>
        ))}
      </div>
      <i className="fa-solid fa-face-smile" onClick={handleOpenEmoji}></i>
      
      <button
        type="submit">
        Send
      </button>
    </form>
      
)
}
 
export default Kaikais;