import React ,{useEffect} from 'react'
import { Route,Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

import { useAuth } from './authContext'

const App = () => {
  
   const { currentUser, setCurrentUser } = useAuth();
   const navigate = useNavigate();
  
  useEffect(()=>{

    const userId = localStorage.getItem("userId");

    if(!currentUser && userId){
      setCurrentUser(userId);
    }
    
    if(!userId && !["/login","/signup"].includes(window.location.pathname)){
      navigate("/login");
    }
    if (userId && (window.location.pathname == "/login" || window.location.pathname == "/signup")) {
      navigate("/");
    }

  },[currentUser,navigate,setCurrentUser])


  
  return (

    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App