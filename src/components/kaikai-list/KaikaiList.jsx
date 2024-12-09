import { useEffect, useState } from "react";
import axios from 'axios'
import AddFriend from "../addfriend/AddFriend";
import { apiURL, apiURL2 } from "../../constants/constants";
import MessageHistory from "../message-history/MessageHistory";
import Kaikais from "../kaikais/Kaikais";
import './KakaiList.css'
import io from "socket.io-client";
import AddChannel from "../channels/AddChannel";
import GetChannel from "../channels/GetChannel";
import logo from '../../assets/pppixelate.png'


const KaikaiList = () => {

  const [kaikaiList, setKaikaiList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [messageRefresh, setMessageRefresh] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null)

  useEffect(()=>{
    
    const socket = io(apiURL2)
    const token = JSON.parse(localStorage.getItem('token'))

    const getFriends = async()=>{

      try{
        setIsPending(true)
        const response = await axios.get(`${apiURL2}/api/v1/friendlist`, {headers: {"Authorization": `Bearer ${token}`}})
        
        let processedData = []

        for(let data of response.data){

          if (data.friendId.picture) {
            const newArray = new Uint8Array(data.friendId.picture.data)
            let stringBinary = ''

            for(let i =0; i < newArray.length; i++){
              stringBinary += String.fromCharCode(newArray[i])
            }
            
            const newBase = window.btoa(stringBinary)
            data.friendId.picture = `data:${data.friendId.picture_type};base64,${newBase}`;
          }

          processedData.push(data);
        }
  
        console.log(processedData)

        setKaikaiList(processedData)

        setIsPending(false)
        setError(null)
        
        
      }
      catch(error){
        setIsPending(false)
        if (error.response && error.response.data) {
          console.log(error.response.data)
          setError(error.response.data.error);
        } else {
          console.log(error)
          setError("An unexpected error occurred.");
        }

       }
    }
      getFriends().catch(err=>console.error("caught in getFriends", err));

      socket.on('refreshFriends', ()=>{
        getFriends()
      })

      return ()=>socket.close()
  },[])

  const selectFriend = id=>{
    setSelectedFriend(id)
    setSelectedChannel(null)
  }

  const selectChannel = id =>{
    setSelectedChannel(id)
    setSelectedFriend(null)
    console.log(id)
  }
  return ( <div style={{height:"100%"}}>
    
    {isPending && <div>Loading...</div>}
    {error && <div>{error}</div>}
    <div className="for-griding">
      <div className="kaikaiList grid1">
      <h2>
      <AddFriend />
        friends</h2>
        {kaikaiList && kaikaiList.map(friend=>(<div 
          key={friend.friendId._id}
          onClick={()=>{selectFriend(friend.friendId._id)}}
          className = {selectedFriend === friend.friendId._id ? "friendContainer active" : "friendContainer"}>
            <span>{friend.friendId.picture ? <img src={friend.friendId.picture} ></img> : <img src={logo}></img>}</span>
            <div>{friend.friendId.nickname? friend.friendId.nickname : "friend"}</div>  
            <div style={{fontSize: ".7em", color:"var(--blued"}}>{friend.friendId.email}</div>
        </div>))}
      </div>
      <div className="grid2">
        <MessageHistory selectedFriend={selectedFriend} messageRefresh={messageRefresh} selectedChannel={selectedChannel} kaikaiList={kaikaiList}/>
      </div>
      <div className="grid3">
        <h2><div></div>channels</h2>
        <GetChannel selectChannel={selectChannel} kaikaiList={kaikaiList} selectedChannel={selectedChannel}/>
      </div>
      <div className="grid4">
        <AddChannel kaikaiList = {kaikaiList} />
      </div>
      <div className="grid5">
        <Kaikais setMessageRefresh={setMessageRefresh} selectedFriend={selectedFriend}  selectedChannel={selectedChannel}/>
      </div>
    </div>
     
  </div> );
}
 
export default KaikaiList;
