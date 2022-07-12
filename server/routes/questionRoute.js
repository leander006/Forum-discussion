const express = require('express');
const { createQuestion, getQuestion, particularQuestion, deleteQuestion, searchQuestion, trendQuestions, answer,unanswer} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/",protect,createQuestion)
router.get("/",getQuestion)
router.get("/answer/",answer)
router.get("/unanswer/",unanswer)
router.get("/search",protect,searchQuestion)
router.get("/particular/:id",particularQuestion)
router.delete("/delete/:id",protect,deleteQuestion)
router.get("/trending",trendQuestions)




module.exports = router;