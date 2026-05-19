import React from "react";
import {useNavigate,useRoutes,useEffect} from "react-router-dom";

import { Profile } from "./components/user/profile";
import {Login } from "./components/auth/Login";
import {Signup} from "./components/auth/Signup"
import { Dashboard } from "./components/dashboard/Dashboard";

import {useAuth} from "./authContext"



const ProjectRoutes = ()=>{

    const {currentUser,serCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userID");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }
        
        if(!userIdFromStorage && !["/login","/signup"].includes(window.location.pathname)){
            navigate("/login");
        }

        if(userIdFromStorage && window.location.pathname == "login"){
            navigate("/");
        }


    },[currentUser,navigate,setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ]);
    
    return element;
}

export default ProjectRoutes;