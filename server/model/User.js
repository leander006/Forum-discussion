const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)