import { useState } from "react";
import axios from "axios";
import { apiURL, apiURL2 } from "../../constants/constants";
import { useNavigate, Link } from "react-router-dom";
import './sign-up.css'


const SignUp = () => {

  const [emailInit, setEmail] = useState(null);
  const [nickname, setNickname] = useState(null)
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setPending(true)

    if(!emailInit || !password || !password_confirmation){
      return
    }
    
    const email = emailInit.toLowerCase()
    const obj = {email, nickname, password, password_confirmation}
    
    try{
      const response = await axios.post(`${apiURL2}/api/v1/auth`, obj);
      setPending(false)
      setError("Successfully created a kaikai account!")
      console.log(response)
      setTimeout(()=>{
        setError(null)
        navigate('/login')
      }, 3000)
      
    }
    catch(error){
      if(error.response.data.message){
        setPending(false)
        console.log(error.response)
        return setError(error.response.data.message.split(':')[2])
      }
      
      setPending(false)
      setError("Enter valid input")
      console.log(error.response)
    }
  }


  return ( <div>
    <h3 className="create-account">Create a kaikai account</h3>
    <form onSubmit={handleSubmit} className="sign-up-form">

      <input 
        onChange ={ e => setEmail(e.target.value)}
        placeholder="email"
        type="text"
        required></input>

      <input 
        onChange ={ e => setNickname(e.target.value)}
        placeholder="nickname"
        type="text"
        required></input>

      <input 
        onChange = {e=> setPassword(e.target.value)}
        type="password"
        placeholder="password"
        required></input>

      <input 
        onChange = {e=> setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="password confirmation"
        required></input>

        <button
          type="submit">
          Sign-up
        </button>
    </form>

    <div className="sign-up-pendingError">
    {pending && <div>registering acount...</div>}
    {error && <div>{error}</div>}
    </div>

    <div className="login-sign-up">
      <Link to = "/login" >Back to Login</Link>
      </div>

    

    </div> );
}
 
export default SignUp;