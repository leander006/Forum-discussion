const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    },
    reply:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reply" 
          }
    ],
    count:{
        type:Number,
        default:0
    },
  
},
{timestamps:true}
)

module.exports = mongoose.model("Question",QuestionSchema)