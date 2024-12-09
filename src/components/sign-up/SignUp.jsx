import { useState } from "react";
import axios from "axios";
import { apiURL, apiURL2 } from "../../constants/constants.js";
import { useNavigate, Link } from "react-router-dom";
import './sign-up.css'
import Logo from "../logo/logo";


const SignUp = () => {

  const [emailInit, setEmail] = useState(null);
  const [nickname, setNickname] = useState(null)
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);
  const [picture, setPicture] = useState(null)
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
   
    const formData = new FormData()
    formData.append('email', email)
    formData.append('nickname', nickname)
    formData.append('password', password)
    formData.append('password_confirmation', password_confirmation)
    formData.append('picture', picture)
    
    try{
      const response = await axios.post(`${apiURL2}/api/v1/auth`, formData);
      setPending(false)
      setError("Successfully created a kaikai account!")
      console.log(response)
      setTimeout(()=>{
        setError(null)
        navigate('/login')
      }, 3000)
      
    }
    catch(error){
      if(!error.response.data){
        setPending(false)
        setError("Enter valid input")
        return console.log(error.response)
        
      }
      
      setPending(false)
      console.log(error.response)
      return setError(error.response.data.message.split(':')[2])
    }
  }

  const handlePicture = e=>{
    const file = e.target.files[0]
    const maxSize = .5*1024 * 1024

    if(file && file.size > maxSize){
      return setError("img size must be 0.5mb or less")
    }
    if(file && !file.type.startsWith('image/')){
      return setError('file must be an image')
    }

    setPicture(file)
    setError(null)
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

      <input
      type="file"
      onChange={handlePicture}>
      </input>

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

    <div className="sign-up-logo">
      <Logo/>
      </div>
    </div> );
}
 
export default SignUp;