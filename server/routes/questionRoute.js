const express = require('express');
const { createQuestion, getQuestion, particularQuestion, deleteQuestion, searchQuestion} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const {like,unLike} = require("../controllers/mediaController")

router.post("/",protect,createQuestion)
router.get("/",protect,getQuestion)
router.get("/search",protect,searchQuestion)
router.get("/:id",protect,particularQuestion)
router.delete("/delete/:id",protect,deleteQuestion)





module.exports = router;