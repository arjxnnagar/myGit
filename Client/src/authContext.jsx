import React, { Children, createContext ,useState} from 'react'


const authContext = createContext();

export const useAuth = ()=>{
    return useContext(authContext);
}


const AuthProvider = ({Children}) => {

    const [currentUser,setCurrentUser] = useState(null);
    useEffect(()=>{
        const userId = localStorage.getItem("userId");
        if(userId){
            setCurrentUser(userId);
        }
    },[]);

  return (
    <authContext.Provider value = {currentUser,setCurrentUser}>
        {Children}
    </authContext.Provider>
  )
}

export default AuthProvider;