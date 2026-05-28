import React ,{useContext}from 'react'
import {authContext} from "./authContext.jsx";

const useAuth = () => {
    return useContext(authContext);
}

export default useAuth;