import React, { Children, createContext ,useState ,useEffect } from 'react'


export const authContext = createContext();

const AuthProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState(null);
    useEffect(()=>{
        const userId = localStorage.getItem("userId");
        if(userId){
            setCurrentUser(userId);
        }
    },[]);

  return (
    <authContext.Provider value = {{currentUser,setCurrentUser}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider;