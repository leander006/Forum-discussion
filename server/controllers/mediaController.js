
const asyncHandler = require('express-async-handler');
const Reply = require('../model/Reply');




//Like reply//


const like = asyncHandler(async(req,res) =>{
      try {
            const reply = await Reply.findById(req.params.id)
    
            if(!reply.likes.includes(req.user._id)){
                  const newreply=await reply.updateOne({$push:{likes:req.user._id}})
                  console.log(newreply);
                  return res.status(200).json("Liked reply")
                 
            }
            else{
                  return res.status(403).send({error:"Already liked"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})


// Unlike reply //

const unLike = asyncHandler(async(req,res) =>{
      try {
            const reply = await Reply.findById(req.params.id)   
            if(reply.likes.includes(req.user._id)){
                  await reply.updateOne({$pull:{likes:req.user._id}})
                  return res.status(200).json("Unliked reply")
            }
            else{
                  return res.status(403).send({error:"Already unliked"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})

module.exports = {
      like,
      unLike
};