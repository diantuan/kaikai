import axios from "axios";
import { useState } from "react";
import { apiURL, apiURL2 } from "../../constants/constants";
import './addfriend.css'


const AddFriend = () => {

  const[friendEmail, setFriendEmail] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async(e)=>{

    e.preventDefault();
    setIsPending(true)
    const token = JSON.parse(localStorage.getItem('token'))

    if(!friendEmail){
     return   
    }

    try{

      
      const response = await axios.post(`${apiURL2}/api/v1/addfriend`, {friendEmail}, {headers:{"Authorization": `Bearer ${token}`}})
      console.log(response.data)
      setIsPending(false);
      setError(null);
    }
    catch(error){
      console.log(error.response)
      setIsPending(false)
      setError(error.response.data.error)
    }
    
  }

return ( 
    <form className="addfriend-form" onSubmit={e=>e.preventDefault()}>

      <input
      onChange ={e=>setFriendEmail(e.target.value)}
      type="email" placeholder="add email" required></input>

      <i className="fa-solid fa-plus"
      onClick={handleSubmit}></i>
      
      {isPending && <div>finding...</div>}
      {error && <div>{error}</div>}

    </form>
  );
}
 
export default AddFriend;