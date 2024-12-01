import { useState } from "react";
import axios from "axios";
import { apiURL, apiURL2 } from "../../constants/constants";

const SignUp = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const obj = {email, password, password_confirmation}
    
    try{
      const response = await axios.post(`${apiURL2}/api/v1/auth`, obj);
      console.log(response)
    }
    catch(error){
      console.log(error.response)
    }
  }


  return ( <div>
    <form onSubmit={handleSubmit}>

      <input 
        onChange ={ e => setEmail(e.target.value)}
        placeholder="email"
        type="text"></input>

      <input 
        onChange = {e=> setPassword(e.target.value)}
        type="password"
        placeholder="password"></input>

      <input 
        onChange = {e=> setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="password confirmation"></input>

        <button
          type="submit">
          Sign-up
        </button>
    </form>
  </div> );
}
 
export default SignUp;