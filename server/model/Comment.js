const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        trim:true
    }, 
    reply:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply"
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Comment",CommentSchema)