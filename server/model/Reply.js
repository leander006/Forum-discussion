const mongoose = require('mongoose');


const ReplySchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reply:{
        type:String,
        trim:true
    }, 
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
  
},
{timestamps:true}
)

module.exports = mongoose.model("Reply",ReplySchema)