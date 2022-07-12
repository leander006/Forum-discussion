const asyncHandler = require('express-async-handler');

const Comment = require('../model/Comment');
const Question = require('../model/Question');
const Reply = require('../model/Reply');

//Create reply //

const createReply = asyncHandler(async(req,res) =>{
      const question = await Question.findById(req.params.id)
      const {content} = req.body;
      if(!content)
      {
          return res.status(401).json("Please enter all  field");
      }   
      try {
          const newreply = new Reply({
              username:req.user._id,
              reply:content,
              question:req.params.id,
          })
  
          const comment = await newreply.save();
          await question.updateOne({$push:{reply:comment._id}})
          res.status(200).json("Replied successfully ");
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
  })

// Create reply's comment //
const createComment = asyncHandler(async(req,res) =>{
      const reply = await Reply.findById(req.params.id)
      const {content} = req.body;

      if(!content)
      {
          return res.status(401).json("Please enter all  field");
      }   
      try {

          const newComment = new Comment({
              username:req.user._id,
              comment:content,
              reply:req.params.id,
          })
 
          const newcomment = await newComment.save();


          await reply.updateOne({$push:{comments:newcomment._id}})
          res.status(200).json("Comment added successfully ");
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
  })


// get all reply of particular user //
const getReply = asyncHandler(async(req,res) =>{
      
      try {
            const comment = await Reply.find({}).populate("username").populate("reply").populate("comments").sort({createdAt:-1});
            return res.status(200).json(comment)
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
      

})

//Particular reply //
const getParticularReply = asyncHandler(async(req,res) =>{
      try {
            const reply = await Reply.findById(req.params.id).populate("username").populate("reply").sort({createdAt:-1});
            return res.status(200).json(reply)
          
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
      

})

// Delete reply //

const deleteReply =asyncHandler(async(req,res) =>{
      console.log(req.params.id);
      const reply = await Reply.findById(req.params.id) 
      if(reply === null){
            return res.status(404).send({error:"Already deleted"})
      }
      console.log(reply);
      const question = await Question.findById(reply.question)

      try {
            await Reply.findByIdAndDelete(req.params.id)
            await question.updateOne({$pull:{reply:reply.id}})
            res.status(200).json("reply deleted successfully")
      } catch (error) {
           return res.status(500).send({error:error.message}) 
      }
})


// Delete reply's comment //

const deleteComments =asyncHandler(async(req,res) =>{

      const comment = await Comment.findById(req.params.id) 
      

      if(comment === null){
            return res.status(404).send({error:"Already deleted"})
      }
      const reply = await Reply.findById(comment.reply)
      try {
            await Comment.findByIdAndDelete(req.params.id)
            await reply.updateOne({$pull:{comments:comment.id}})
            res.status(200).json("Comment deleted successfully")
      } catch (error) {
           return res.status(500).send({error:error.message}) 
      }
})


  module.exports = {
	createReply,
      getReply,
      getParticularReply,
      deleteReply,
      createComment ,
      deleteComments 
};
