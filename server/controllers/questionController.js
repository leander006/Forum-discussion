const asyncHandler = require('express-async-handler');


const Question = require('../model/Question');
const User = require('../model/User');


// create question //
const createQuestion = asyncHandler(async(req,res) =>{

      const {content} = req.body;
  
      if(!content)
      {
          return res.status(401).json("Please enter all  field");
      }   
      try {
          const newQuestion = new Question({
              owner:req.user._id,
              content:content,
          })
  
          const question = await newQuestion.save();
          res.status(200).json(question);
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
  })
 // particular question //
const particularQuestion = asyncHandler(async(req,res) =>{
    try {
        const question = await Question.findById(req.params.id).populate("owner").populate({path:"reply",populate:{path:"username"}}).populate({path:"reply",populate:{path:"comments"}})
        const count = question.count
        await question.update({ $inc: { count:1 }})
        res.status(200).json(question)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
})

//search question//

const searchQuestion = asyncHandler(async(req,res) =>{
    const {name} = req.query
    try {
          const keyword = req.query.name
          const question = await Question.find({content:{$regex:keyword ,$options:'$i'}}).populate("owner").populate({path:"reply",populate:{path:"username"}}).populate({path:"reply",populate:{path:"comments"}})
          return res.status(200).json(question);

     } catch (error) {
           return res.status(404).json({error:error.message})
     }
})

// Get all question //
const getQuestion = asyncHandler(async(req,res) =>{
      try {
            const question = await Question.find({}).populate("owner").populate({ 
                path: 'reply',
                populate: {
                  path: 'username',
                  model: 'Reply'
                } 
             }).populate({path:"reply",populate:{path:"username"}}).populate({path:"reply",populate:{path:"comments"}}).populate({path:"reply",populate:{path:"likes"}}).sort({createdAt:-1})
            res.status(200).json(question)
      } catch (error) {
            res.status(404).send({error:error.message})
      }

})

// Delete question //
const deleteQuestion = asyncHandler(async(req,res) =>{
    const question = await Question.findById(req.params.id)
    
    if(question === null){
        return res.status(500).send({error:"Already deleted question"})
    }
    try {    
        const owner = await User.findById(question.owner)
        if(req.user.username !== owner.username){
            return res.status(500).send({error:"Cannot delete others question"})
        }
        else if(req.user.username === owner.username){
            await Question.findByIdAndDelete(req.params.id)
            // await Comment.findByIdAndDelete(comment._id)
            return res.status(200).json("Deleted successfully");
        }
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
})



module.exports = {
	createQuestion,
    getQuestion,
    particularQuestion,
    deleteQuestion,
    searchQuestion
};