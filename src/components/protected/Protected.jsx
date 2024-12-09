import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import KaikaiList from "../kaikai-list/KaikaiList";
import './protected.css'


const Protected = () => {
  const {isLoggedIn, logout} = useAuth();
  
  const navigate = useNavigate()

  if(isLoggedIn){
    

    const handleLogout = ()=>{
      logout()
      navigate('/')
    }

    return ( <div className="protected">
      <KaikaiList/>
      
      <button
      onClick = {handleLogout}
      type="button"
      className="logout-btn">
        Logout
      </button>
      
    </div> );
    }
    else{
      return <Navigate to="/login"></Navigate>
    }
  
  
}
 
export default Protected;