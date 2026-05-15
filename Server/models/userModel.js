import mongoose,{Schema} from "mongoose";


const UserSchema = new Schema({

    username:{
        required : true,
        type:String,
        unique:true,
    },
    email:{
        required : true,
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    repositories:[
        {
            default:[],
            type: Schema.Types.ObjectId,
            ref:"Repository"
        },
    ],
    followedUsers:[
        {
            default:[],
            type: Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    starRepos:[
        {
            default:[],
            type: Schema.Types.ObjectId,
            ref:"Repository"
        },
    ],

});

const User = mongoose.model("User",UserSchema);
export default User;