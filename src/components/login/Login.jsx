import { Link } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { useState } from "react";
import './login.css'
import Logo from "../logo/logo";


const Login = () => {

  const [emailInit, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {login,isPending, error} = useAuth();
 

  const handleSubmit = e =>{
    e.preventDefault();

    if(!emailInit || !password){
      return
    }

    const email = emailInit.toLowerCase();
    login(email,password)
   
    
  }

  return ( <div>

    <h1>kaikai</h1>

    <div className="login-logo">
    <Logo></Logo>
    </div>

     <form onSubmit={handleSubmit} className="login-form">

<input 
  onChange ={ e => setEmail(e.target.value)}
  placeholder="email"
  type="text"
  required></input>

<input 
  onChange = {e=> setPassword(e.target.value)}
  type="password"
  placeholder="password"
  required></input>



  <button
    type="submit">
    Login
  </button>
</form>

<div className="login-pendingError">

{isPending && <div>Logging in...</div>}
{error && <div>{error}</div>}

</div>

<div className="login-sign-up">

<p>Don't have an account? </p>
<Link to = "/sign-up" >Sign-up</Link>
</div>
  </div> );
}
 
export default Login;