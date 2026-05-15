const getAllUsers = (req,res)=>{
    res.send("All UUsers fetched");
}

const signup = (req,res)=>{
    res.send("signing up");
}

const login = (req,res)=>{
    res.send("loggig in");
}


const getUserProfile = (req,res)=>{
    res.send("User Profile");
}

const updateUserProfile = (req,res)=>{
    res.send("Profile Updated");
}


const deleteUserProfile = (req,res)=>{
    res.send("Profile Deleted");
}


export {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};